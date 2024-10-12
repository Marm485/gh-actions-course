const core = require('@actions/core');
const github = require('@actions/github')
const exec = require('@actions/exec')

async function run()
{

    var title = core.getInput("pr-title");

    if (title.startsWith("feat"))
    {
        core.info("PR is a feature")
    }
    else
    {
        await exec.exec("echo", ["PR is not a feature"])
    }
};

run();