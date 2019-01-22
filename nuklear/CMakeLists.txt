cmake_minimum_required(VERSION 3.13)
project(nuklear C)

#add_subdirectory(vendor)

find_package(OpenGL REQUIRED)
find_package(glfw3 REQUIRED)
find_package(GLEW REQUIRED)
find_package(GLU REQUIRED)

#link_directories(${OPENGL_gl_LIBRARY} vendor)

include_directories(vendor ${OPENGL_INCLUDE_DIRS} ${GLEW_INCLUDE_DIRS} ${GLFW_INCLUDE_DIRS} include common)
#
#if (APPLE)
#    #UNAME_S := $(shell uname -s)
#    #GLFW3 := $(shell pkg-config --libs glfw3)
#    #CFLAGS += -I/usr/local/include
#        #-framework OpenGL -framework Cocoa -framework IOKit -framework CoreVideo -lm -lGLEW -L/usr/local/lib
#    set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} -I/usr/local/include")
#elseif (UNIX)
#
#else ()
#endif ()

set(CMAKE_C_STANDARD 11)

add_executable(nuklear main.c vendor/nuklear.h vendor/nuklear_glfw_gl3.h)

target_link_libraries(nuklear ${OPENGL_gl_LIBRARY} ${GLEW_LIBRARY} ${GLFW_LIBRARIES} ${GLU_LIBRARIES})