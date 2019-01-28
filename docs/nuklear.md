---
layout: page
title: Nuklear
tagline: Small, Immediate Mode, C
active: true
---

- [Internals](#internals)
- [Developer experience](#developer-experience)
- [Accessiblity](#accessiblity)
- [OS Integration](#os-integration)
- [Other Issues](#other-issues)
-

[https://github.com/vurtun/nuklear](https://github.com/vurtun/nuklear)

**Renderer** Not included, you can add it or copy from examples (GLFW3, GDI2, SDL, X11, etc.)

Tech stack used for building a showcase app:

| **Build system** | CMake |
| **Languages** | C |
| **Libraries** | GLFW |
| **Editor** | CLion |

## Internals

Another immediate mode GUI. Single-file dependency (On macOS it requires installing `glfw`, `glew` to compile), plain C, OpenGL.

At first glance it looks like everything that you can expect from it: the rendering is blurry, no accessiblity bridge, no OS-awareness, and like this resizing artifact:

![nuklear example widget layout problems with window resizing](https://user-images.githubusercontent.com/1004115/51437327-fc572400-1cad-11e9-87f8-a8032ffd98e0.gif)

But this is just one example app, the other one from repository (`extended.c`) looks better, although, text rendering is still off.

<img width="538" alt="Extended example of Nuklear" src="https://user-images.githubusercontent.com/1004115/51789123-e4dcd700-2196-11e9-8fa2-5bd8985538db.png">

In real life, some issues can be mitigated if you build a very complex app and able to invest into it.

Using a wrapper also nice if you want to write a lot of code, and there are plenty of it, e.g. Rust, Go, Python.

Nuklear, along with [IMGUI](/imgui) is an example of [Immediate Mode GUI](/). So the basic idea looks like this:

```c
  while(true) {
    // draw a frame
    // react on input
  }
```

Or to be more specific:

```c

#include "nuklear.h"
#include "nuklear_glfw_gl3.h"


// ..
// Event loop
while (!glfwWindowShouldClose(win)) {
  if (nk_begin(ctx, "Demo", nk_rect(50, 50, 230, 250),
                         NK_WINDOW_BORDER |
                         NK_WINDOW_MOVABLE |
                         NK_WINDOW_SCALABLE |
                         NK_WINDOW_MINIMIZABLE |
                         NK_WINDOW_TITLE)) {
    // ..
    nk_layout_row_static(ctx, 30, 80, 1);
    if (nk_button_label(ctx, "button"))
        fprintf(stdout, "button pressed\n");
    }
    // ..
  }
}
```

> GLFW is an Open Source, multi-platform library for OpenGL, OpenGL ES and Vulkan development on the desktop. It provides a simple API for creating windows, contexts and surfaces, receiving input and events.
> GLFW is written in C and has native support for Windows, macOS and many Unix-like systems using the X Window System, such as Linux and FreeBSD.

`nuklide.h` consists of a bunch of nk\_ functions that "draw" something on the screen and handle user input **each frame** using the backend you provided.
In this case it's [glfw3](#glfw3)

What does `nk_button_label` do? It's an alias:

```c
int nk_button_label(struct nk_context *ctx, const char *title)
{
    return nk_button_text(ctx, title, nk_strlen(title));
}
```

...which could be roughly transformed into the following:

```c

    // ..
    /* calculate button content space */
    content->x = r.x + style->padding.x + style->border + style->rounding;
    content->y = r.y + style->padding.y + style->border + style->rounding;
    content->w = r.w - (2 * style->padding.x + style->border + style->rounding*2);
    content->h = r.h - (2 * style->padding.y + style->border + style->rounding*2);

    /* execute button behavior */
    bounds.x = r.x - style->touch_padding.x;
    bounds.y = r.y - style->touch_padding.y;
    bounds.w = r.w + 2 * style->touch_padding.x;
    bounds.h = r.h + 2 * style->touch_padding.y;

     if (nk_input_is_mouse_hovering_rect(i, r)) {
        *state = NK_WIDGET_STATE_HOVERED;
        if (nk_input_is_mouse_down(i, NK_BUTTON_LEFT))
            *state = NK_WIDGET_STATE_ACTIVE;
        if (nk_input_has_mouse_click_in_rect(i, NK_BUTTON_LEFT, r)) {
            ret = (behavior != NK_BUTTON_DEFAULT) ?
                nk_input_is_mouse_down(i, NK_BUTTON_LEFT):
                #ifdef NK_BUTTON_TRIGGER_ON_RELEASE
                nk_input_is_mouse_released(i, NK_BUTTON_LEFT);
                #else
                nk_input_is_mouse_pressed(i, NK_BUTTON_LEFT);
                #endif
    // ..
    if (style->draw_begin) style->draw_begin(out, style->userdata);
    nk_draw_button_text(out, &bounds, &content, state, style, string, len, align, font);
    if (style->draw_end) style->draw_end(out, style->userdata);

    // ..

```

So far we only see library-specific code, but Nuklear has a lot of backends, and to add one you need to implement a few functions
how to draw geometry on the screen, how handle input devices such as mouses. This is how glfw OpenGL3 specific code looks like:

```c
// ..
/* iterate over and execute each draw command */
 nk_draw_foreach(cmd, &glfw.ctx, &dev->cmds)
 {
   if (!cmd->elem_count)
     continue;
   glBindTexture(GL_TEXTURE_2D, (GLuint)cmd->texture.id);
   glScissor(
       (GLint)(cmd->clip_rect.x * glfw.fb_scale.x),
       (GLint)((glfw.height - (GLint)(cmd->clip_rect.y + cmd->clip_rect.h)) * glfw.fb_scale.y),
       (GLint)(cmd->clip_rect.w * glfw.fb_scale.x),
       (GLint)(cmd->clip_rect.h * glfw.fb_scale.y));
   glDrawElements(GL_TRIANGLES, (GLsizei)cmd->elem_count, GL_UNSIGNED_SHORT, offset);
   offset += cmd->elem_count;
 }
```

## Developer experience

It compiles damn fast. But C is unsafe language. There are options.

## Accessiblity

[mwcampbell wrote](https://news.ycombinator.com/item?id=16347902)

_Technical follow-up: It seems to me that implementing today's platform accessibility APIs (e.g. UI Automation for Windows, AT-SPI for Unix) would be difficult if not impractical for an immediate-mode toolkit like this one._
_These accessibility APIs expose a tree of UI objects, which the client (e.g. screen reader) can freely navigate and query. This basically assumes that there's a tree of UI objects in memory, which is the case for all mainstream toolkits as far as I know. But that's not the case for an immediate-mode toolkit. At least with Nuklear, the content and state of the UI (e.g. the label and current checked state of a checkbox) aren't stored anywhere in the toolkit's data structures. So I guess applications would have to play a very active role in implementing accessibility APIs, much more than they would with, say, Qt or even Win32._

Could we though back the tree itself?

## OS Integration

So we need to impelement deep linking.

https://github.com/jimon/osx_app_in_plain_c/blob/master/main.c

## Other Issues

- OpenGL is deprecated on macOS
- [Dynamic height](https://github.com/vurtun/nuklear/issues/504)
- [Scroll to bottom of a scrollbar](https://github.com/vurtun/nuklear/issues/326)
