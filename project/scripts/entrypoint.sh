#!/bin/bash

# Install Docker CLI
apt-get update && apt-get install -y docker.io

# Run the initialization scripts
npm install
npm run wait
npm run init-db

# Remove the container itself
CONTAINER_ID=$(hostname)
echo "Removing container $CONTAINER_ID..."
docker rm -f $CONTAINER_ID