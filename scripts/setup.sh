#!/bin/bash
# Setup script for development

set -e

echo "GTA Vice City Web Port - Development Setup"
echo ""

# Check if Emscripten is installed
if [ -z "$EMSDK" ]; then
    echo "Emscripten SDK not found!"
    echo ""
    echo "Install Emscripten:"
    echo "  git clone https://github.com/emscripten-core/emsdk.git"
    echo "  cd emsdk"
    echo "  ./emsdk install latest"
    echo "  ./emsdk activate latest"
    echo "  source ./emsdk_env.sh"
    exit 1
fi

echo "✓ Emscripten found"

# Check CMake
if ! command -v cmake &> /dev/null; then
    echo "✗ CMake not found. Install with: apt-get install cmake"
    exit 1
fi

echo "✓ CMake found"

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "✗ Python3 not found. Install with: apt-get install python3"
    exit 1
fi

echo "✓ Python3 found"

echo ""
echo "Setup complete! Ready to build."
echo ""
echo "To build:"
echo "  ./scripts/build-web.sh"
echo ""
echo "To run locally:"
echo "  python3 -m http.server 8000 --directory build-web/web"
echo "  Open http://localhost:8000 in your browser"
