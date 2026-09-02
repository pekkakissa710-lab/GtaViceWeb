# GTA Vice City Web Port - Source Integration

This directory contains the game source code from the reVC (GTA Vice City reversed) project.

## Structure

- `core/` - Core game systems (config, events, game loop)
- `renderer/` - Graphics and rendering
- `audio/` - Sound and music
- `skel/` - Platform abstraction layer
  - `web/` - Web/Emscripten specific files
  - `glfw/` - Desktop GLFW implementation
  - `win/` - Windows specific code
- `entities/` - Game objects (peds, vehicles, etc)
- `vehicles/` - Vehicle specific code
- `peds/` - Pedestrian AI
- `weapons/` - Weapons and combat
- `collision/` - Collision detection
- `animation/` - Animation system
- `control/` - Input and camera control
- `buildings/` - Building/zone system
- `save/` - Save game system
- `text/` - Text rendering and localization
- `modelinfo/` - Model information
- `objects/` - World objects
- `extras/` - Additional utilities

## Web Build

For the web build, platform-specific code is in `skel/web/` and includes:
- `main_web.cpp` - Web entry point
- `events.cpp` - Event handling
- `timer.cpp` - Timing system
- `rwsgl.cpp` - OpenGL ES / WebGL rendering
- `emscripten_bindings.cpp` - JavaScript FFI

## Building

See the main README.md for build instructions.
