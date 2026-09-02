// Web WebGL rendering skeleton
#include "common.h"
#include "patcher.h"
#include "main.h"

#ifdef WEBGL
#include <emscripten.h>
#include <GLES3/gl3.h>
#include "RwRaster.h"

bool WebGL_Init(void) {
    // WebGL context is created by the canvas in HTML
    // The RenderWare library will use the existing WebGL context
    return true;
}

void WebGL_Shutdown(void) {
    // Cleanup handled by browser
}

bool WebGL_GetVideoMode(int *mode) {
    if (mode) *mode = 0;
    return true;
}

#endif
