#!/bin/bash

# Default values for optional parameters
#DEFAULT_S3_BUCKET="henlab-cfn-templates"
DEFAULT_REGION="us-west-1"
DEFAULT_S3_PREFIX="cfn_template"

# Function to display usage instructions
usage() {
    echo "Usage: $0 -f TEMPLATE_FILE -b S3_BUCKET [-p S3_PREFIX] [-g REGION]"
    echo
    echo "Options:"
    echo "  -f TEMPLATE_FILE   Path to the CloudFormation template file (required)"
    echo "  -b S3_BUCKET       Name of the S3 bucket to upload the template (optional, default: $DEFAULT_S3_BUCKET)"
    echo "  -p S3_PREFIX       Prefix for the S3 object key (optional, default: $DEFAULT_S3_PREFIX)"
    echo "  -g REGION          AWS region for the S3 bucket (optional, default: $DEFAULT_REGION)"
    exit 1
}

# Parse command-line arguments
while getopts ":f:b:p:g:" opt; do
    case $opt in
        f) TEMPLATE_FILE=$(realpath "$OPTARG") ;;
        b) S3_BUCKET="$OPTARG" ;;
        p) S3_PREFIX="$OPTARG" ;;
        g) REGION="$OPTARG" ;;
        *) usage ;;
    esac
done

# Validate required parameters
if [ -z "$TEMPLATE_FILE" ] || [ -z "$S3_BUCKET" ]; then
    echo "Error: TEMPLATE_FILE and S3_BUCKET are required."
    usage
fi

# Set default values for optional parameters
S3_PREFIX=${S3_PREFIX:-$DEFAULT_S3_PREFIX}
REGION=${REGION:-$DEFAULT_REGION}

# Print arguments for transparency
echo "======================================"
echo "Deploying CloudFormation Template to S3 with:"
echo "--------------------------------------"
echo "Template File:     $TEMPLATE_FILE"
echo "S3 Bucket:         $S3_BUCKET"
echo "S3 Prefix:         $S3_PREFIX"
echo "Region:            $REGION"
echo "======================================"

# Check if the template file exists
if [ ! -f "$TEMPLATE_FILE" ]; then
    echo "Error: Template file not found at $TEMPLATE_FILE"
    exit 1
fi

# Generate the S3 object key and URL
S3_KEY="$S3_PREFIX/$(basename "$TEMPLATE_FILE")"
S3_URL="https://$S3_BUCKET.s3.$REGION.amazonaws.com/$S3_KEY"

# Temporary file to hold the S3 template content
TEMP_S3_FILE=$(mktemp)

# Check if the file exists in S3
aws s3 cp "s3://$S3_BUCKET/$S3_KEY" "$TEMP_S3_FILE" 2>/dev/null

if [ $? -eq 0 ]; then
    # Compare the local file with the S3 file
    DIFF_OUTPUT=$(diff "$TEMPLATE_FILE" "$TEMP_S3_FILE" | head -n 5)
    if [ -z "$DIFF_OUTPUT" ]; then
        echo "No changes found between template file and s3 template file. Skipping upload."
        UPLOAD_NEEDED=0
    else
        echo "Changes detected between template file and s3 template file:"
        echo "$DIFF_OUTPUT"
        UPLOAD_NEEDED=1
    fi
else
    echo "Template file does not exist in S3. Proceeding with upload."
    UPLOAD_NEEDED=1
fi

# Clean up temporary file
rm -f "$TEMP_S3_FILE"

# Perform the upload if needed
if [ "$UPLOAD_NEEDED" -eq 1 ]; then
    echo "Uploading CloudFormation template to S3: $S3_URL..."
    aws s3 cp "$TEMPLATE_FILE" "s3://$S3_BUCKET/$S3_KEY"
fi

if [ $? -ne 0 ]; then
    echo "Error: Failed to upload template to S3."
    exit 1
fi