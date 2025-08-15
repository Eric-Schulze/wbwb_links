#!/bin/bash
# Simple script to serve the website locally

echo "Starting local web server..."
echo "Your website will be available at: http://localhost:8000"
echo "Press Ctrl+C to stop the server"
echo ""

# Try different methods to serve the files
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m http.server 8000
elif command -v php &> /dev/null; then
    php -S localhost:8000
elif command -v npx &> /dev/null; then
    npx serve . -p 8000
else
    echo "No suitable web server found. Please install Python, PHP, or Node.js"
    exit 1
fi