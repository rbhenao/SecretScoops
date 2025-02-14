#!/bin/bash

# Function to display usage instructions
usage() {
    echo "Usage: $0 -s STACK_NAME"
    echo
    echo "Options:"
    echo "  -s STACK_NAME      Name of the CloudFormation stack (required)"
    exit 1
}

# Parse command-line arguments
while getopts ":s:" opt; do
    case $opt in
        s) STACK_NAME="$OPTARG" ;;
        *) usage ;;
    esac
done

# Validate required parameters
if [ -z "$STACK_NAME" ]; then
    echo "Error: STACK_NAME is required."
    usage
fi

# Confirm deletion
read -p "Are you sure you want to delete the CloudFormation stack '$STACK_NAME'? (y/n): " CONFIRM
if [[ "$CONFIRM" != "y" ]]; then
  echo "Stack deletion aborted."
  exit 0
fi

# Delete the stack
echo "Deleting CloudFormation stack: $STACK_NAME..."
aws cloudformation delete-stack --stack-name "$STACK_NAME"

if [ $? -eq 0 ]; then
  echo "Deletion of stack '$STACK_NAME' initiated successfully."
  echo "Use 'aws cloudformation describe-stacks --stack-name $STACK_NAME' to check its status."
else
  echo "Failed to initiate deletion of stack '$STACK_NAME'."
  exit 1
fi