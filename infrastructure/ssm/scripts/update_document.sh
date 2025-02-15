#!/bin/bash

# Function to display usage
usage() {
    echo "Usage: $0 -f DOCUMENT_FILE -n DOCUMENT_NAME"
    echo
    echo "Options:"
    echo "  -f DOCUMENT_FILE   Path to the SSM document file (required)"
    echo "  -n DOCUMENT_NAME   Name of the SSM document (required)"
    exit 1
}

# Parse arguments
while getopts ":f:n:" opt; do
    case $opt in
        f) DOCUMENT_FILE="$OPTARG" ;;
        n) DOCUMENT_NAME="$OPTARG" ;;
        *) usage ;;
    esac
done

# Validate arguments
if [ -z "$DOCUMENT_FILE" ] || [ -z "$DOCUMENT_NAME" ]; then
    echo "Error: DOCUMENT_FILE and DOCUMENT_NAME are required."
    usage
fi

DOCUMENT_FILE=$(realpath $DOCUMENT_FILE)

# Check if the file exists
if [ ! -f "$DOCUMENT_FILE" ]; then
    echo "Error: The file '$DOCUMENT_FILE' does not exist."
    exit 1
fi

# Update the SSM document
aws ssm update-document \
    --name "$DOCUMENT_NAME" \
    --content file://"$DOCUMENT_FILE" \
    --document-version "\$LATEST" \
    --document-format YAML

# Check the result
if [ $? -eq 0 ]; then
    echo "SSM document '$DOCUMENT_NAME' updated successfully using file '$DOCUMENT_FILE'."
else
    echo "Failed to update SSM document."
    exit 1
fi