#!/bin/bash

set -e  # Exit immediately if any command fails

# Ensure required inputs are provided
if [ $# -lt 2 ]; then
  echo "Usage: $0 <STACK_NAME> <APP_ROOT>"
  echo "Error: Missing arguments."
  echo "STACK_NAME - The CloudFormation stack name used to find the EC2 instance."
  echo "APP_ROOT - The root directory where the application should be deployed."
  exit 1
fi

STACK_NAME=$1
APP_ROOT=$2

# Step 1: Retrieve EC2 Instance ID from CloudFormation Stack
echo "Retrieving EC2 Instance ID for stack: $STACK_NAME..."
INSTANCE_ID=$(aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='EC2InstanceId'].OutputValue" \
  --output text)

if [ -z "$INSTANCE_ID" ] || [ "$INSTANCE_ID" == "None" ]; then
  echo "Error: Could not retrieve EC2 Instance ID from stack: $STACK_NAME."
  exit 1
fi

echo "Using EC2 Instance ID: $INSTANCE_ID"

# Step 2: Run the DeployApp SSM Document
echo "Running DeployApp SSM Document on instance: $INSTANCE_ID..."
COMMAND_ID=$(aws ssm send-command \
  --document-name "deploy_app" \
  --targets "Key=instanceids,Values=$INSTANCE_ID" \
  --parameters "AppRoot=$APP_ROOT" \
  --comment "Deploying application on EC2 instance" \
  --query 'Command.CommandId' --output text)

if [ -z "$COMMAND_ID" ] || [ "$COMMAND_ID" == "None" ]; then
  echo "Error: Could not retrieve SSM Command ID."
  exit 1
fi

echo "SSM Command ID: $COMMAND_ID"

# Step 3: Wait for SSM Deployment Completion
echo "Waiting for deployment to complete..."
aws ssm wait command-executed --command-id "$COMMAND_ID" --instance-id "$INSTANCE_ID"

echo "Deployment completed successfully!"
