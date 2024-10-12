const core = require('@actions/core');
const github = require('@actions/github')
const exec = require('@actions/exec')

async function run()
{

    var title = core.getInput("pr-title");

    if (title.startsWith("feat"))
    {
        core.info("echo PR is a feature")
    }
    else
    {
        core.info("PR is not a feature")
    }
};

run();