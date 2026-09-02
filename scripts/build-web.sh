#!/bin/bash
# Build script for web version

set -e

echo "Building GTA Vice City Web Port..."

# Check Emscripten
if [ -z "$EMSDK" ]; then
    echo "Error: EMSDK environment variable not set"
    echo "Please install and source Emscripten SDK:"
    echo "  git clone https://github.com/emscripten-core/emsdk.git"
    echo "  cd emsdk"
    echo "  ./emsdk install latest"
    echo "  ./emsdk activate latest"
    echo "  source ./emsdk_env.sh"
    exit 1
fi

# Create build directory
mkdir -p build-web
cd build-web

# Configure with Emscripten
echo "Configuring build..."
emcmake cmake .. -DCMAKE_BUILD_TYPE=Release -DRE3_WEB=ON

# Build
echo "Building..."
cmake --build . -j$(nproc)

echo "Build complete!"
echo "Output: build-web/web/"
echo ""
echo "To run locally:"
echo "  python3 -m http.server 8000 --directory build-web/web"
echo "Then open: http://localhost:8000"
