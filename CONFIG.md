# Project Configuration

This file documents key project settings and build flags.

## CMake Configuration

### Web Build Options

```bash
cmake .. -DRE3_WEB=ON -DCMAKE_BUILD_TYPE=Release
```

**Variables:**
- `RE3_WEB` - Enable web build with Emscripten (default: OFF)
- `CMAKE_BUILD_TYPE` - Release or Debug (default: Release)

## Emscripten Flags

Key flags used in the web build:

```
-s WASM=1                          # Use WebAssembly
-s ALLOW_MEMORY_GROWTH=1           # Allow dynamic memory growth
-s TOTAL_MEMORY=536870912          # Initial 512MB memory
-s EXPORTED_FUNCTIONS=[...]        # Export C functions to JS
```

## Feature Flags

In `src/core/config.h` or via CMake:

- `LIBRW` - Use librw rendering engine (always enabled)
- `RW_GL3` - Use OpenGL 3 rendering (for web: WebGL 2)
- `AUDIO_OAL` - Use OpenAL audio (always enabled for web)
- `CMAKE_BUILD` - Building with CMake
- `USE_OUR_VERSIONING` - Include version info in binary

## Web-Specific Defines

- `WEBGL` - WebGL rendering path
- `EMSCRIPTEN` - Building with Emscripten (set automatically)

## Audio Settings

For web builds, audio is set to OpenAL with Web Audio API backend.

## Memory Settings

Web build initial memory: 512MB
Can grow dynamically based on usage.

## Browser Requirements

- WebAssembly support
- WebGL 2.0
- Web Audio API
- ES6 JavaScript
