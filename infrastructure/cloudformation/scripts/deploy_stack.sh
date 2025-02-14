#!/bin/bash

# Import shared stack operations
SCRIPT_DIR=$(dirname "$(realpath "$0")")
source "$SCRIPT_DIR/shared_stack_ops.sh"

# Parse arguments
parse_arguments "$@"

# Upload template to S3
upload_template_to_s3

# Print arguments
print_arguments "Deploying"

# Launch the CloudFormation stack
echo "Launching CloudFormation stack: $STACK_NAME..."

CREATE_STACK_CMD=(
    aws cloudformation create-stack \
    --stack-name "$STACK_NAME" \
    --template-url "$S3_URL" \
    --role-arn "$ROLE_ARN" \
    --tags Key="$TAG_KEY",Value="$TAG_VALUE" \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM
)

if [ -n "$STACK_PARAMS" ]; then
    CREATE_STACK_CMD+=(--parameters $STACK_PARAMS)
fi

# Print the command for testing
echo "Command to be executed:"
echo "${CREATE_STACK_CMD[@]}"

"${CREATE_STACK_CMD[@]}"

# Check if the command succeeded (remove this block when enabling execution)
if [ $? -eq 0 ]; then
    echo "CloudFormation stack creation initiated successfully."
    echo "Use 'aws cloudformation describe-stacks --stack-name $STACK_NAME' to monitor the stack's progress."
else
    echo "Failed to initiate CloudFormation stack creation."
    exit 1
fi