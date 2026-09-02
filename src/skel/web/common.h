// Common header for web platform
#ifndef _COMMON_H_
#define _COMMON_H_

#ifdef WEBGL
#define WEBGL_ENABLED 1
#include <emscripten.h>
#include <GLES3/gl3.h>
#else
#define WEBGL_ENABLED 0
#endif

// Type definitions
typedef unsigned char uint8;
typedef signed char int8;
typedef unsigned short uint16;
typedef signed short int16;
typedef unsigned int uint32;
typedef signed int int32;
typedef unsigned long long uint64;
typedef signed long long int64;
typedef float Float;

// Boolean
typedef int bool;
#define true 1
#define false 0

#endif // _COMMON_H_
