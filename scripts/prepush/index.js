require('colors');
const { join } = require('path');
const execa = require('execa');

const CMD_BRANCH = 'git rev-parse --abbrev-ref HEAD';
const COMMAND_OPTION = { shell: true };

(async () => {
  try {
    const branch = await execa.command(CMD_BRANCH, COMMAND_OPTION).then(({ stdout = '' }) => stdout);

    if (branch === 'master') {
      console.log('master does not need check'.green);
      return process.exit(0);
    }

    const { scripts = {} } = require(join(process.cwd(), 'package.json'));

    if (!scripts.lint) {
      console.log('cannot find lint script'.red);
      return process.exit(1);
    }

    console.log(`  run prepush script`.green);
    await execa.command('yarn lint', COMMAND_OPTION);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
