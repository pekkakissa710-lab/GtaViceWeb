#!/bin/bash
# Quick build script - combines setup and build

set -e

echo "Building GTA Vice City Web Port..."
echo ""

if [ -z "$EMSDK" ]; then
    echo "ERROR: Emscripten SDK not configured"
    echo "Please install Emscripten first:"
    echo ""
    echo "  git clone https://github.com/emscripten-core/emsdk.git"
    echo "  cd emsdk"
    echo "  ./emsdk install latest"
    echo "  ./emsdk activate latest"
    echo "  source ./emsdk_env.sh"
    echo ""
    exit 1
fi

echo "Step 1: Verify dependencies..."
command -v cmake > /dev/null || { echo "CMake not found"; exit 1; }
command -v python3 > /dev/null || { echo "Python3 not found"; exit 1; }
echo "✓ Dependencies OK"
echo ""

echo "Step 2: Create build directory..."
mkdir -p build-web
echo "✓ Done"
echo ""

echo "Step 3: Configure..."
cd build-web
emcmake cmake .. -DCMAKE_BUILD_TYPE=Release -DRE3_WEB=ON 2>&1 | grep -v "^--" | grep -v "^$" || true
echo "✓ Done"
echo ""

echo "Step 4: Building (this may take a few minutes)..."
cmake --build . -j$(nproc) 2>&1 | tail -20 || true
echo "✓ Build complete"
echo ""

if [ -f "web/re3_web.wasm" ] && [ -f "web/re3_web.js" ]; then
    echo "SUCCESS! Build output in: build-web/web/"
    echo ""
    echo "To run locally:"
    echo "  python3 -m http.server 8000 --directory build-web/web"
    echo "  Open http://localhost:8000"
else
    echo "WARNING: Build may have failed. Check output above."
fi
