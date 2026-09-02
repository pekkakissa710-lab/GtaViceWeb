@echo off
REM Quick build script - combines setup and build (Windows)

echo Building GTA Vice City Web Port...
echo.

if "%EMSDK%"=="" (
    echo ERROR: Emscripten SDK not configured
    echo Please install Emscripten first
    exit /b 1
)

echo Step 1: Verify dependencies...
where cmake >nul 2>nul || (echo CMake not found && exit /b 1)
where python >nul 2>nul || (echo Python not found && exit /b 1)
echo OK
echo.

echo Step 2: Create build directory...
if not exist build-web mkdir build-web
echo OK
echo.

echo Step 3: Configure...
cd build-web
call emcmake cmake .. -DCMAKE_BUILD_TYPE=Release -DRE3_WEB=ON
echo OK
echo.

echo Step 4: Building (this may take a few minutes)...
cmake --build . -j%NUMBER_OF_PROCESSORS%
echo.

if exist "web\re3_web.wasm" (
    echo SUCCESS! Build output in: build-web\web\
    echo.
    echo To run locally:
    echo   python -m http.server 8000 --directory build-web\web
    echo   Open http://localhost:8000
) else (
    echo WARNING: Build may have failed. Check output above.
)
