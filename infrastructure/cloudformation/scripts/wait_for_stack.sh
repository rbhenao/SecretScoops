#!/bin/bash

STACK_NAME=$1
echo "Waiting for CloudFormation stack $STACK_NAME to be in CREATE_COMPLETE state..."
aws cloudformation wait stack-create-complete --stack-name "${STACK_NAME}"
echo "Stack is ready!"