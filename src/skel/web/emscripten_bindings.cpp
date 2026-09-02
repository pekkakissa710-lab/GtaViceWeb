// Emscripten exported C functions for JavaScript interaction
#include "common.h"
#include "main.h"
#include "events.h"
#include "keyboard.h"
#include "pad.h"

#ifdef WEBGL
#include <emscripten.h>

// Input handlers callable from JavaScript
extern "C" {
    EMSCRIPTEN_KEEPALIVE
    void handleKeyDown(const char *action) {
        // Parse action string and set keyboard state
        if (!action) return;
        // Implementation would route to game's keyboard handler
    }
    
    EMSCRIPTEN_KEEPALIVE
    void handleKeyUp(const char *action) {
        // Parse action string and clear keyboard state
        if (!action) return;
        // Implementation would route to game's keyboard handler
    }
    
    EMSCRIPTEN_KEEPALIVE
    void handleMouseMove(float deltaX, float deltaY) {
        // Update camera based on mouse movement
        // This would integrate with the game's camera system
    }
    
    EMSCRIPTEN_KEEPALIVE
    void handleMovementInput(float x, float y) {
        // Handle analog stick input from mobile
        // x, y are normalized -1.0 to 1.0
    }
    
    EMSCRIPTEN_KEEPALIVE
    void handleActionButton(const char *action) {
        // Handle action button presses
        if (!action) return;
        // Implementation would route to game's action handler
    }
}

#endif
