#!/bin/bash

# Load environment variables from .env if available
if [ -f ../api/.env ]; then
  export $(grep -v '^#' ../api/.env | xargs)
fi

# Set default values if not set in .env
DB_USER=${POSTGRES_USER:-admin}
DB_PASS=${POSTGRES_PASSWORD:-password}
DB_NAME=${POSTGRES_DB:-secretscoops}
DB_HOST=${POSTGRES_HOST:-secret_scoops_db}  # Use Docker container name
DB_PORT=${POSTGRES_PORT:-5432}

# Execute SQL command to clear the orders table
echo "Clearing orders table in Docker container..."
docker exec -i secret_scoops_db psql -U $DB_USER -d $DB_NAME -c "DELETE FROM orders;"
echo "Orders table cleared!"