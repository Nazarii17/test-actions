#!/bin/bash

# 1. Get input values (GitHub injects them as INPUT_<UPPERCASE_NAME>)
# Note: GitHub converts hyphens to underscores, so:
# - bucket -> INPUT_BUCKET
# - bucket-region -> INPUT_BUCKET_REGION
# - dist-folder -> INPUT_DIST_FOLDER
BUCKET="${INPUT_BUCKET}"
BUCKET_REGION="${INPUT_BUCKET_REGION:-us-east-1}"
DIST_FOLDER="${INPUT_DIST_FOLDER}"

# Check for required inputs (simulating the core input failure)
if [ -z "$BUCKET" ] || [ -z "$DIST_FOLDER" ]; then
  echo "::error::Action setup failed: bucket and dist-folder are required."
  echo "DEBUG: BUCKET=${BUCKET}, DIST_FOLDER=${DIST_FOLDER}"
  echo "DEBUG: Available env vars: $(compgen -e | grep INPUT | sort)"
  exit 1
fi

# Target the root of the bucket
S3_URI="s3://${BUCKET}"

echo "Preparing to sync ${DIST_FOLDER} to ${S3_URI} in ${BUCKET_REGION}..."

# 2. Attempt the upload
# We run the command and check its exit status.
if aws s3 sync "${DIST_FOLDER}" "${S3_URI}" --region "${BUCKET_REGION}"; then
    echo "::notice::Successfully deployed to AWS S3!"
else
    # Catch AWS-specific errors
    echo "::warning::AWS CLI command failed."
    echo "::notice::AWS is not configured. Simulating a successful S3 upload for learning purposes..."
fi

echo "::notice::Hello from my Docker Action!"

# 3. Set the output
# In Docker/Shell actions, you set outputs by writing to the $GITHUB_OUTPUT environment file
WEBSITE_URL="https://${BUCKET}.s3-website.${BUCKET_REGION}.amazonaws.com"
echo "website-url=${WEBSITE_URL}" >> "$GITHUB_OUTPUT"
