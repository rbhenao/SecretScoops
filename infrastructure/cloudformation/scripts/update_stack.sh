#!/bin/bash

# Import shared stack operations
SCRIPT_DIR=$(dirname "$(realpath "$0")")
source "$SCRIPT_DIR/shared_stack_ops.sh"

# Parse arguments
parse_arguments "$@"

# Upload template to S3
upload_template_to_s3

# Print arguments
print_arguments "Updating"

# Update the CloudFormation stack
echo "Updating CloudFormation stack: $STACK_NAME..."
aws cloudformation update-stack \
  --stack-name "$STACK_NAME" \
  --template-url "$S3_URL" \
  --role-arn "$ROLE_ARN" \
  --tags Key="$TAG_KEY",Value="$TAG_VALUE" \
  --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM

# Check if the command succeeded
if [ $? -eq 0 ]; then
    echo "CloudFormation stack update initiated successfully."
    echo "Use 'aws cloudformation describe-stacks --stack-name $STACK_NAME' to monitor the stack's progress."
else
    echo "Failed to initiate CloudFormation stack update."
    exit 1
fi