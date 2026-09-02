#!/bin/bash
# Development server script

if [ ! -d "build-web/web" ]; then
    echo "Error: build-web/web directory not found"
    echo "Please run: ./scripts/build-web.sh"
    exit 1
fi

echo "Starting development server..."
echo "Open http://localhost:8000 in your browser"
echo ""
echo "Press Ctrl+C to stop"
echo ""

cd build-web/web
python3 -m http.server 8000
