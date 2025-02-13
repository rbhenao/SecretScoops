#!/bin/bash

# Load environment variables from .env if available
if [ -f ../api/.env ]; then
  export $(grep -v '^#' ../api/.env | xargs)
fi

# Set default values if not set in .env
SQS_ENDPOINT=${SQS_ENDPOINT:-http://localhost:9324}
SQS_QUEUE_NAME=${SQS_QUEUE_NAME:-order-queue}
QUEUE_URL="$SQS_ENDPOINT/queue/$SQS_QUEUE_NAME"

# Purge the order queue
echo "Purging messages from the SQS queue: $SQS_QUEUE_NAME"
aws sqs purge-queue --endpoint-url "$SQS_ENDPOINT" --queue-url "$QUEUE_URL"
echo "Queue cleared successfully!"