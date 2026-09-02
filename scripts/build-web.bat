@echo off
REM Build script for web version (Windows)

echo Building GTA Vice City Web Port...

if "%EMSDK%"==" " (
    echo Error: EMSDK environment variable not set
    echo Please install and activate Emscripten SDK
    exit /b 1
)

REM Create build directory
if not exist build-web mkdir build-web
cd build-web

REM Configure with Emscripten
echo Configuring build...
call emcmake cmake .. -DCMAKE_BUILD_TYPE=Release -DRE3_WEB=ON

REM Build
echo Building...
cmake --build . -j%NUMBER_OF_PROCESSORS%

echo Build complete!
echo Output: build-web\web\
echo.
echo To run locally:
echo   python -m http.server 8000 --directory build-web\web
echo Then open: http://localhost:8000
