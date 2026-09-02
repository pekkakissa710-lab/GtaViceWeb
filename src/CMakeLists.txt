find_package(Threads REQUIRED)
set(THREADS_PREFER_PTHREAD_FLAG ON)

file(GLOB_RECURSE ${PROJECT}_SOURCES "*.cpp" "*.h")

# Remove platform-specific files for web build
if(RE3_WEB)
    list(FILTER ${PROJECT}_SOURCES EXCLUDE REGEX "skel/(win|glfw)/.*")
    list(APPEND ${PROJECT}_SOURCES
        "${CMAKE_CURRENT_SOURCE_DIR}/skel/web/events.cpp"
        "${CMAKE_CURRENT_SOURCE_DIR}/skel/web/timer.cpp"
        "${CMAKE_CURRENT_SOURCE_DIR}/skel/web/rwsgl.cpp"
    )
endif()

function(header_directories RETURN_LIST)
    file(GLOB_RECURSE ALL_SRCS *.h *.cpp *.c)
    set(RELDIRS)
    foreach(SRC ${ALL_SRCS})
        file(RELATIVE_PATH RELSRC "${CMAKE_CURRENT_SOURCE_DIR}" "${SRC}")
        get_filename_component(RELDIR "${RELSRC}" DIRECTORY)
        list(APPEND RELDIRS ${RELDIR})
    endforeach()
    list(REMOVE_DUPLICATES RELDIRS)
    set(${RETURN_LIST} ${RELDIRS} PARENT_SCOPE)
endfunction()

header_directories(${PROJECT}_INCLUDES)

if(NOT SKIP_GIT_SHA)
    configure_file("${CMAKE_CURRENT_SOURCE_DIR}/extras/GitSHA1.cpp.in" "${CMAKE_CURRENT_BINARY_DIR}/extras/GitSHA1.cpp" @ONLY)
    list(APPEND ${PROJECT}_SOURCES "${CMAKE_CURRENT_BINARY_DIR}/extras/GitSHA1.cpp")
endif()

if(RE3_WEB)
    add_executable(${EXECUTABLE}
        ${${PROJECT}_SOURCES}
    )
    set_target_properties(${EXECUTABLE} PROPERTIES SUFFIX ".js")
else()
    add_executable(${EXECUTABLE} WIN32
        ${${PROJECT}_SOURCES}
    )
endif()

target_link_libraries(${EXECUTABLE} PRIVATE
    librw::librw
    Threads::Threads
)

target_include_directories(${EXECUTABLE}
    PRIVATE
        $<BUILD_INTERFACE:${PROJECT_SOURCE_DIR}>
        $<BUILD_INTERFACE:${${PROJECT}_INCLUDES}>
)

target_compile_definitions(${EXECUTABLE}
    PRIVATE
        $<IF:$<CONFIG:DEBUG>,DEBUG,NDEBUG>
        LIBRW
        CMAKE_NO_AUTOLINK
)

if(NOT SKIP_GIT_SHA)
    target_compile_definitions(${EXECUTABLE} PRIVATE USE_OUR_VERSIONING)
endif()

if(RE3_WEB)
    target_compile_definitions(${EXECUTABLE} PRIVATE
        RW_GL3
        WEBGL
    )
    set_target_properties(${EXECUTABLE} PROPERTIES LINK_FLAGS
        "-s WASM=1 \
         -s ALLOW_MEMORY_GROWTH=1 \
         -s TOTAL_MEMORY=536870912 \
         -s EXPORTED_FUNCTIONS=\"['_main','_malloc','_free','_handleKeyDown','_handleKeyUp','_handleMouseMove','_handleMovementInput','_handleActionButton']\"
    ")
elseif(LIBRW_PLATFORM_D3D9)
    target_compile_definitions(${EXECUTABLE}
        PUBLIC
            USE_D3D9
    )
endif()

if(RE3_WEB)
    target_compile_definitions(${EXECUTABLE} PRIVATE
        AUDIO_OAL
    )
    find_package(OpenAL REQUIRED)
    if(TARGET OpenAL::OpenAL)
        target_link_libraries(${EXECUTABLE} PRIVATE OpenAL::OpenAL)
    else()
        target_include_directories(${EXECUTABLE} PRIVATE ${OPENAL_INCLUDE_DIR})
        target_link_libraries(${EXECUTABLE} PRIVATE ${OPENAL_LIBRARY})
        target_compile_definitions(${EXECUTABLE} PRIVATE ${OPENAL_DEFINITIONS})
    endif()
endif()

if(CMAKE_CXX_COMPILER_ID STREQUAL "GNU" OR CMAKE_CXX_COMPILER_ID STREQUAL "Clang" OR CMAKE_CXX_COMPILER_ID STREQUAL "AppleClang")
    target_compile_options(${EXECUTABLE}
        PRIVATE
            "-Wall"
    )
elseif(CMAKE_CXX_COMPILER_ID STREQUAL "MSVC")
    target_compile_options(${EXECUTABLE}
        PUBLIC
            /Zc:sizedDealloc-
    )
endif()

set_target_properties(${EXECUTABLE}
    PROPERTIES
        C_STANDARD 11
        C_STANDARD_REQUIRED ON
        CXX_STANDARD 11
        CXX_STANDARD_REQUIRED ON
)

if(RE3_WEB)
    add_custom_command(TARGET ${EXECUTABLE} POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E make_directory "${CMAKE_BINARY_DIR}/web"
        COMMAND ${CMAKE_COMMAND} -E copy "${CMAKE_CURRENT_BINARY_DIR}/${EXECUTABLE}.js" "${CMAKE_BINARY_DIR}/web/re3_web.js"
        COMMAND ${CMAKE_COMMAND} -E copy "${CMAKE_CURRENT_BINARY_DIR}/${EXECUTABLE}.wasm" "${CMAKE_BINARY_DIR}/web/re3_web.wasm"
        COMMAND ${CMAKE_COMMAND} -E copy_directory "${CMAKE_CURRENT_SOURCE_DIR}/../web" "${CMAKE_BINARY_DIR}/web"
        COMMENT "Packaging web build"
    )
endif()
