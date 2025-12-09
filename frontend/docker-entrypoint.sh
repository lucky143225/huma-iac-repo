#!/bin/sh
# Lambda entry point script
# This is executed when Lambda container starts

# Start nginx in the background
nginx -g "daemon off;" &
NGINX_PID=$!

# Keep the container alive
wait $NGINX_PID
