// Main entry point for web build
#include "common.h"
#include "main.h"
#include "patcher.h"
#include "Timer.h"
#include "Clock.h"

#ifdef WEBGL
#include <emscripten.h>
#include <GLES3/gl3.h>

// Forward declarations
void EngineUpdate();
void EngineRender();
void EngineShutdown();

// Game loop callback
void em_main_loop(void) {
    EngineUpdate();
    EngineRender();
}

// Entry point
int main(int argc, char *argv[]) {
    // Initialize the game engine
    if (!InitialiseGame()) {
        return 1;
    }
    
    // Setup emscripten main loop
    emscripten_set_main_loop(em_main_loop, 0, 1);
    
    // This won't be reached in normal execution
    EngineShutdown();
    return 0;
}

#endif
