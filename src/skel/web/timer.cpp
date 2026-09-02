// Web timer implementation
#include "common.h"
#include "Timer.h"

#ifdef WEBGL
#include <emscripten.h>
#include <ctime>

static uint32 oldPcTimer = 0;
static uint32 suspendDepth = 0;

uint32 Timer_GetClock(void) {
    // Get current time in milliseconds using Emscripten
    return (uint32)(emscripten_get_now());
}

void Timer_Init(void) {
    oldPcTimer = Timer_GetClock();
}

void Timer_Suspend(void) {
    suspendDepth++;
}

void Timer_Resume(void) {
    if (suspendDepth > 0) {
        suspendDepth--;
        oldPcTimer = Timer_GetClock();
    }
}

bool Timer_IsSuspended(void) {
    return suspendDepth > 0;
}

#endif
