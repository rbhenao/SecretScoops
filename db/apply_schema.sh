#!/bin/bash

docker exec -i secret_scoops_db psql -U admin -d secretscoops < schema.sql
