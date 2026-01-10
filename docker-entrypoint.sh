#!/bin/sh

# Start the RCON service in the background
node /app/rcon-service/index.js &

# Start Next.js in the foreground
exec node server.js
