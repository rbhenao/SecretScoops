#!/bin/bash

# Default values for optional parameters
DEFAULT_REGION="us-west-1"
DEFAULT_S3_PREFIX="cfn_template"

# Function to display usage instructions
usage() {
    echo "Usage: $0 -f TEMPLATE_FILE -s STACK_NAME -r ROLE_ARN -b S3_BUCKET [-p S3_PREFIX] [-g REGION] [-k TAG_KEY] [-v TAG_VALUE] [-o STACK_PARAMS]"
    echo
    echo "Options:"
    echo "  -f TEMPLATE_FILE   Path to the CloudFormation template file (required)"
    echo "  -s STACK_NAME      Name of the CloudFormation stack (required)"
    echo "  -r ROLE_ARN        ARN of the IAM role for CloudFormation (required)"
    echo "  -b S3_BUCKET       Name of the S3 bucket to upload the template (required)"
    echo "  -p S3_PREFIX       Prefix for the S3 object key (optional, default: $DEFAULT_S3_PREFIX)"
    echo "  -g REGION          AWS region for the S3 bucket (optional, default: $DEFAULT_REGION)"
    echo "  -k TAG_KEY         Key for the stack tag (optional, default: 'Name')"
    echo "  -v TAG_VALUE       Value for the stack tag (optional, default: STACK_NAME)"
    echo "  -o STACK_PARAMS    Additional stack parameters as a JSON string (optional)"
    exit 1
}

# Parse command-line arguments
parse_arguments() {
    while getopts ":f:s:r:b:p:g:k:v:o:" opt; do
        case $opt in
            f) TEMPLATE_FILE=$(realpath "$OPTARG") ;;
            s) STACK_NAME="$OPTARG" ;;
            r) ROLE_ARN="$OPTARG" ;;
            b) S3_BUCKET="$OPTARG" ;;
            p) S3_PREFIX="$OPTARG" ;;
            g) REGION="$OPTARG" ;;
            k) TAG_KEY="$OPTARG" ;;
            v) TAG_VALUE="$OPTARG" ;;
            o) STACK_PARAMS="$OPTARG" ;;
            *) usage ;;
        esac
    done

    # Validate required parameters
    if [ -z "$TEMPLATE_FILE" ] || [ -z "$STACK_NAME" ] || [ -z "$ROLE_ARN" ] || [ -z "$S3_BUCKET" ]; then
        echo "Error: TEMPLATE_FILE, STACK_NAME, ROLE_ARN and S3_BUCKET are required."
        usage
    fi

    # Set default values for optional parameters
    S3_PREFIX=${S3_PREFIX:-$DEFAULT_S3_PREFIX}
    REGION=${REGION:-$DEFAULT_REGION}
    TAG_KEY=${TAG_KEY:-"Name"}
    TAG_VALUE=${TAG_VALUE:-$STACK_NAME}
}

# Upload template to S3
upload_template_to_s3() {
    SCRIPT_DIR=$(dirname "$(realpath "$0")")
    "$SCRIPT_DIR/update_template.sh" -f "$TEMPLATE_FILE" -b "$S3_BUCKET" -p "$S3_PREFIX" -g "$REGION"

    if [ $? -ne 0 ]; then
        echo "Error: Failed to upload template to S3."
        exit 1
    fi

    S3_KEY="$S3_PREFIX/$(basename "$TEMPLATE_FILE")"
    S3_URL="https://$S3_BUCKET.s3.$REGION.amazonaws.com/$S3_KEY"
}

# Print arguments for transparency
print_arguments() {
    echo "======================================"
    echo "$1 CloudFormation Stack with:"
    echo "--------------------------------------"
    echo "Template URL:      $S3_URL"
    echo "Stack Name:        $STACK_NAME"
    echo "Role ARN:          $ROLE_ARN"
    echo "S3 Bucket:         $S3_BUCKET"
    echo "S3 Prefix:         $S3_PREFIX"
    echo "Region:            $REGION"
    echo "Tag Key:           $TAG_KEY"
    echo "Tag Value:         $TAG_VALUE"
    echo "Stack Parameters:  ${STACK_PARAMS:-None}"
    echo "======================================"
}