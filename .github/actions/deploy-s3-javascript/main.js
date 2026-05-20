import * as core from '@actions/core'
import * as github from '@actions/github'
import * as exec from '@actions/exec'

function run() {
    // Get input values
    let bucket = core.getInput('bucket', { required: true });
    let bucketRegion = core.getInput('bucket-region', { required: true });
    let distFolder = core.getInput('dist-folder', { required: true });
    // Upload files
    const s3Uri = `s3://${bucket}/${distFolder}`;
    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);

    core.notice('Hello from my JavaScript Action!')
}

run();
