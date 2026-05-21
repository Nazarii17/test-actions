import * as core from '@actions/core'
import * as github from '@actions/github'
import * as exec from '@actions/exec'

async function run() {
    try {
        // Get input values
        const bucket = core.getInput('bucket', { required: true });
        const bucketRegion = core.getInput('bucket-region', { required: true });
        const distFolder = core.getInput('dist-folder', { required: true });

        // Target the root of the bucket
        const s3Uri = `s3://${bucket}`;

        core.info(`Preparing to sync ${distFolder} to ${s3Uri} in ${bucketRegion}...`);

        try {
            // Attempt the upload
            await exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`);
            core.notice('Successfully deployed to AWS S3!');
        } catch (awsError) {
            // Catch AWS-specific errors (like missing credentials) without failing the action
            core.warning(`AWS CLI command failed: ${awsError.message}`);
            core.notice('AWS is not configured. Simulating a successful S3 upload for learning purposes...');
        }

        core.notice('Hello from my JavaScript Action!')
    } catch (error) {
        // Core errors (like missing inputs) should still fail the action
        core.setFailed(`Action setup failed: ${error.message}`);
    }

    const websiteUrl = `https://${bucket}.s3-website.${bucketRegion}.amazonaws.com}`;
    core.setOutput('website-url', websiteUrl);
}

run();