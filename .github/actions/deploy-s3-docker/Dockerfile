# Use an official, lightweight Alpine image
FROM alpine:3.19

# Install the AWS CLI and Bash
RUN apk add --no-cache aws-cli bash

# Copy the shell script into the container
COPY entrypoint.sh /entrypoint.sh

# Make sure the script is executable
RUN chmod +x /entrypoint.sh

# Tell Docker to run this script when the container starts
ENTRYPOINT ["/entrypoint.sh"]