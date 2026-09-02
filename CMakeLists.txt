cmake_minimum_required(VERSION 3.14)

set(EXECUTABLE re3)
set(PROJECT RE3)

project(${EXECUTABLE} C CXX)
set(${PROJECT}_AUTHOR "${PROJECT} Team")

# Web build flag
option(RE3_WEB "Build for web with Emscripten" OFF)

if(RE3_WEB)
    message(STATUS "Building for Web with Emscripten")
    set(CMAKE_TOOLCHAIN_FILE "$ENV{EMSDK}/upstream/emscripten/cmake/Emscripten.cmake" CACHE PATH "Emscripten CMake toolchain")
endif()

list(APPEND CMAKE_MODULE_PATH "${PROJECT_SOURCE_DIR}/cmake")

# Skip Git SHA1 for now to avoid complex build setup
set(SKIP_GIT_SHA ON)

# Audio configuration
if(RE3_WEB)
    set(${PROJECT}_AUDIO "OPENAL")
else()
    if(WIN32)
        set(${PROJECT}_AUDIOS "OAL" "MSS")
    else()
        set(${PROJECT}_AUDIOS "OAL")
    endif()
    set(${PROJECT}_AUDIO "OAL" CACHE STRING "Audio")
endif()

option(${PROJECT}_VENDORED_LIBRW "Use vendored librw" ON)
if(${PROJECT}_VENDORED_LIBRW)
    add_subdirectory(vendor/librw)
else()
    find_package(librw REQUIRED)
endif()

add_subdirectory(src)
