require('colors');
const execa = require('execa');

const ALLOWED_PREFIX = ['issue-', 'pr-'];
const CMD_BRANCH = 'git rev-parse --abbrev-ref HEAD';
const COMMAND_OPTION = { shell: true };

function checkPrefix(branch) {
  let isBranchMatch = false;

  ALLOWED_PREFIX.forEach(prefix => {
    if (branch.startsWith(prefix)) {
      isBranchMatch = true;
    }
  });

  return isBranchMatch;
}

(async () => {
  const branch = await execa.command(CMD_BRANCH, COMMAND_OPTION).then(({ stdout = '' }) => stdout);

  if (branch === 'master') {
    console.log('this is master'.green);
    return process.exit(0);
  }

  if (branch === '') {
    console.log('cannot resolve branch name.'.red);
    return process.exit(1);
  }

  if (!checkPrefix(branch)) {
    console.log(`  branch '${branch}' cannot be pushed.`.red);
    console.log(`  'prefix' should be one of ${ALLOWED_PREFIX}`.red);
    return process.exit(1);
  }

  console.log(`  branch ${branch} is ok.`.green);
})();
