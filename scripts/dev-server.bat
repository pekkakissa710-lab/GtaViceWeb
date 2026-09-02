@echo off
REM Development server script for Windows

if not exist "build-web\web" (
    echo Error: build-web\web directory not found
    echo Please run: scripts\build-web.bat
    exit /b 1
)

echo Starting development server...
echo Open http://localhost:8000 in your browser
echo.
echo Press Ctrl+C to stop
echo.

cd build-web\web
python -m http.server 8000
