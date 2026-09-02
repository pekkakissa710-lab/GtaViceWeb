# GTA Vice City Web Port

A browser-playable WebAssembly/WebGL port of the open-source GTA Vice City engine from the [re3/reVC](https://github.com/GTAmodding/re3) project.

## What is GtaViceWeb?

GtaViceWeb is a web port of the fully reversed GTA Vice City source code. The original C++ game engine is compiled to WebAssembly using Emscripten and rendered through WebGL, enabling Vice City to run directly in modern web browsers.

**This is NOT a GTA V port.** This is a reverse-engineered port of the original GTA Vice City (1989/2003) engine.

## How the Web Port Works

```
Original C++ Source (reVC)
        ↓
Emscripten Compiler
        ↓
WebAssembly (WASM)
        ↓
WebGL 2.0 Rendering
        ↓
Browser Canvas
```

The core game logic remains in C++ compiled to WebAssembly. Input handling, audio, and the rendering pipeline have been adapted for the browser environment while preserving the original game structure.

## Requirements

### Build Requirements

- **Emscripten SDK** (latest version, 3.1.56+)
- **Node.js** (v14+)
- **CMake** (3.14+)
- **Python** (3.6+)

### Runtime Requirements

- **Modern Web Browser** with:
  - WebAssembly support
  - WebGL 2.0
  - Web Audio API
  - ES6 JavaScript support

Supported browsers:
- Chrome/Chromium 57+
- Firefox 52+
- Safari 11+
- Edge 79+

### Game Data

**IMPORTANT:** GtaViceWeb requires legally obtained GTA Vice City game files to run. The repository does **NOT** include copyrighted game assets.

You will need to provide:
- Original GTA Vice City game data files (models, textures, audio, maps)
- These are loaded at runtime from a user-provided directory or IndexedDB

## Installation

### Prerequisites

1. **Install Emscripten:**
   ```bash
   # Clone the Emscripten repository
   git clone https://github.com/emscripten-core/emsdk.git
   cd emsdk
   
   # Install the latest SDK
   ./emsdk install latest
   ./emsdk activate latest
   
   # Source the environment
   source ./emsdk_env.sh  # On Linux/macOS
   emsdk_env.bat          # On Windows
   ```

2. **Install other dependencies:**
   ```bash
   # Ubuntu/Debian
   sudo apt-get install cmake python3 build-essential
   
   # macOS
   brew install cmake python3
   
   # Windows: Download and install from official sites
   ```

## Building

### Clone the Repository

```bash
git clone https://github.com/pekkakissa710-lab/GtaViceWeb.git
cd GtaViceWeb
git submodule update --init --recursive
```

### Build the Web Version

```bash
# Create and enter build directory
mkdir build-web
cd build-web

# Configure with Emscripten
emcmake cmake .. -DCMAKE_BUILD_TYPE=Release -DRE3_WEB=ON

# Build
cmake --build . -j$(nproc)
```

The build output will be in `build-web/web/` containing:
- `index.html` - Main entry point
- `re3_web.js` - JavaScript loader
- `re3_web.wasm` - WebAssembly binary
- Static assets (CSS, controls JS, etc.)

### Run Locally

After building:

```bash
# Serve the build directory
python3 -m http.server 8000 --directory build-web/web

# Open in browser: http://localhost:8000
```

## GitHub Pages Deployment

The project includes a GitHub Actions workflow that automatically builds the web version and deploys it to GitHub Pages.

1. Ensure GitHub Pages is enabled in repository settings
2. Set source to "GitHub Actions"
3. Push to `main` branch
4. The workflow will automatically build and deploy
5. Access at: `https://pekkakissa710-lab.github.io/GtaViceWeb/`

## Providing Game Data

### Option 1: File Picker (Easiest)
1. Launch the web build
2. Use the on-screen file picker to select GTA Vice City game files
3. Data is stored in browser's IndexedDB for persistence

### Option 2: Local Directory (Development)
1. Copy GTA Vice City game files to `gamefiles/` directory
2. Rebuild the project

### Option 3: Network Download
Advanced: Configure game data URL in settings to download from a server.

## Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome 57+ | ✅ Full | Recommended |
| Firefox 52+ | ✅ Full | Good performance |
| Safari 11+ | ✅ Full | macOS/iOS |
| Edge 79+ | ✅ Full | Chromium-based |
| Opera 44+ | ✅ Full | Chromium-based |

## Controls

### Desktop Keyboard
- **WASD** - Movement
- **Mouse** - Camera control
- **Space** - Jump/Action
- **E** - Enter/Exit vehicles
- **LCtrl** - Sprint
- **LShift** - Crouch
- **F** - Fire weapon
- **Enter** - Menu/Confirm
- **Esc** - Pause/Back
- **1-0** - Weapon select

### Mobile/Touch
- **Left Analog Stick** - Movement (auto-appears on touch)
- **Right Area Drag** - Camera control
- **Action Buttons** - Jump, fire, enter vehicle
- **Menu Button** - Pause

### Gamepad
Standard gamepad support (when connected):
- **D-Pad** - Menu navigation
- **Left Stick** - Movement
- **Right Stick** - Camera
- **Buttons** - Action, fire, jump
- **Triggers** - Weapon cycle

## Known Limitations

1. **Game Files Required** - Cannot run without licensed GTA Vice City data
2. **Performance** - Some older/mobile devices may experience reduced frame rates
3. **Audio** - Limited to browser-supported formats; some audio features may be unavailable
4. **Save Files** - Saves stored in IndexedDB (browser storage), not transferable between devices
5. **Mods** - ASI/DLL mods not compatible; code-level mods require recompilation
6. **Multiplayer** - Not implemented in this port

## Performance Tips

- Use Chrome or Firefox for best performance
- Close other tabs to allocate more memory
- Lower resolution or graphics settings in game menu if needed
- Disable hardware acceleration browser features if experiencing issues
- On mobile, use a tablet or high-end phone for better experience

## Development

### Project Structure

```
GtaViceWeb/
├── src/                    # Source from daynz/GTAviceCity
│   ├── core/
│   ├── renderer/
│   ├── audio/
│   ├── skel/
│   └── ...
├── web/                    # Web-specific files
│   ├── index.html
│   ├── style.css
│   ├── controls.js
│   ├── gamepad.js
│   └── audio.js
├── emscripten/            # Emscripten build configuration
│   ├── CMakeLists.txt
│   └── emscripten.cmake
├── .github/workflows/     # CI/CD
│   └── web-build.yml
├── vendor/                # Dependencies (librw, etc.)
└── build-web/            # Build output (after compilation)
```

### Modifying the Engine

1. Edit source in `src/` directory
2. Rebuild with `cmake --build build-web -j$(nproc)`
3. Test at `http://localhost:8000`

### Adding Web Features

- Modify `web/index.html` for UI
- Update `web/style.css` for styling
- Extend `web/controls.js` for input handling
- Adjust `web/audio.js` for audio behavior

### Debugging

```bash
# Build with debug symbols and logging
emcmake cmake .. -DCMAKE_BUILD_TYPE=Debug -DRE3_WEB=ON

# Browser DevTools
# - Open F12 in browser
# - Check Console for errors
# - Use Network tab to inspect WASM loading
# - Memory tab for memory profiling
```

## Copyright & Legal

**Code**: The underlying source code is from the GTAmodding/re3 project (reVC branch), used for educational and reverse-engineering purposes.

**Game Assets**: GTA Vice City is owned by Rockstar Games. This project does NOT include any copyrighted game files. Users must provide their own legally obtained game data.

See the original [re3 README](https://github.com/GTAmodding/re3/blob/miami/README.md) for more information on the reversed source code.

## Contributing

Contributions are welcome! Areas for improvement:
- Performance optimization
- Mobile UI refinement
- Additional browser compatibility
- Bug fixes and stability improvements
- Documentation

Please ensure contributions don't include copyrighted game assets.

## License

The code modifications and web port are provided for educational purposes. See the original [GTAmodding/re3](https://github.com/GTAmodding/re3) project for license information on the reversed source code.

## Resources

- [GTAmodding/re3](https://github.com/GTAmodding/re3) - Original reversed source
- [Emscripten Documentation](https://emscripten.org/docs)
- [WebGL 2.0 Specification](https://www.khronos.org/webgl/)
- [librw Project](https://github.com/aap/librw) - RenderWare replacement

## Troubleshooting

### Build fails with "Emscripten not found"
Ensure Emscripten is properly installed and environment is sourced:
```bash
source ~/emsdk/emsdk_env.sh  # On Linux/macOS
```

### WebAssembly initialization fails in browser
1. Check browser console (F12) for errors
2. Ensure WebGL 2.0 is supported: https://get.webgl.org/webgl2/
3. Check that game data files are loaded correctly

### Game runs but no audio
- Browser may require user interaction first (click Play)
- Check Web Audio API in console
- Try different audio format

### Low frame rate or crashes
- Close other browser tabs
- Reduce game graphics settings
- Try lower resolution
- Check available system memory

## Support

For issues, questions, or contributions:
1. Check [existing issues](https://github.com/pekkakissa710-lab/GtaViceWeb/issues)
2. Create a new issue with detailed information
3. Include browser version, error messages, and steps to reproduce

---

**Enjoy Vice City in your browser!** 🎮
