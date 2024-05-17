#!/bin/bash

# Function to handle cleanup
cleanup() {
  echo "Stopping Docker Compose..."
  docker-compose down
  exit 0
}

# Trap signals for cleanup
trap cleanup SIGINT SIGTERM

# Start Docker Compose
echo "Starting Docker Compose..."
docker-compose up -d

# Start backend and frontend servers in parallel
concurrently \
  "cd project/backend && ./gradlew bootRun" \
  "npm run dev -w project/frontend"

# Wait for any process to exit
wait
