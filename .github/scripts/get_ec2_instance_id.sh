#!/bin/bash

STACK_NAME=$1
INSTANCE_ID=$(aws cloudformation describe-stacks \
  --stack-name "$STACK_NAME" \
  --query "Stacks[0].Outputs[?OutputKey=='EC2InstanceId'].OutputValue" \
  --output text)

echo "EC2 Instance ID: $INSTANCE_ID"
echo "INSTANCE_ID=$INSTANCE_ID" >> $GITHUB_ENV