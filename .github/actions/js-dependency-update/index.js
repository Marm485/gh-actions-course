const core = require('@actions/core');
const github = require('@actions/github')
const exec = require('@actions/exec')

async function run()
{
    /*
    1. Parse inputs:
        1.1 base-branch from which to check for updates
        1.2 target branch to use to create the PR
        1.3 Github Token for authentication purposes (to create PRs)
        1.4 Working directory for which to check for updates
    2. Execute npm update command within the working the directory
    3. Check wether there aremodified package*,json files
    4. If there are:
        4.1 Add and commit files to the target branch
        4.2 Create a PR to the base branch from the target branch
    5. Otherwise, conclude the custom action
    */

    var base_branch = core.getInput('base-branch');
    var target_branch = core.getInput('target-branch');
    var working_dir = core.getInput('working-directory')
    var gh_token = core.getInput('gh-token');
    var debug = core.getBooleanInput('debug');

    core.setSecret(gh_token);

    core.info('Base branch' + base_branch);
    core.info('Target branch' + target_branch);
    core.info('Working directory' + working_dir);

    await exec.exec('npm update', [], {
        cwd: working_dir
    });

    const updateOutput = await exec.getExecOutput('git status -s package*.json', [], {
        cwd: working_dir
    });

    if (updateOutput.stdout.length > 0)
    {
        core.info('There are updates available')
    } else
    {
        core.info('No updates at this point')
    }

    core.info('I am a custom JS action')
}

run();