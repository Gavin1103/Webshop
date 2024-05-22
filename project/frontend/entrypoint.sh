#!/bin/sh

# Change ownership of node_modules to the 'node' user
chown -R node:node /usr/src/app/node_modules

# Execute the provided command
exec "$@"
