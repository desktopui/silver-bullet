---
layout: page
title: Revery
tagline: Reason (OCaml), OpenGL
---

| **Web-site** | [https://github.com/revery-ui/revery](https://github.com/revery-ui/revery) |
| **Platforms** | Linux, macOS, Windows |
| **Renderer** | OpenGL + Flexbox |
| **Download Revery Chat** | In progress |

Start kit [https://github.com/revery-ui/revery-quick-start](https://github.com/revery-ui/revery-quick-start)

Tech stack used for building a showcase app:

| **Build system** | Esy |
| **Languages** | ReasonML (OCaml flavour) |
| **Libraries** | React ([Brisk](https://github.com/briskml/brisk), native re-implementation) |
| **Editor** | VSCode + Reason plugin |

- [Internals](#internals)
- [Developer experience](#developer-experience)

## Internals

Revery tries to re-use familar to web developer concepts coming from the OCaml which is a mature language with solid toolchain.

Revery written in Reason and the library you're using is React: its component model, the way it handles state, JSX and CSS-in-JS (I guess CSS-in-Reason?)

Although there are some difference, for example in JavaScript this is valid JSX:

```js
<Text prop={value}>Sign in with Slack</Text>
```

in Reason it would be

```reason
 <Text prop=value>"Sign in with Slack"</Text>
```

and [so on](https://reasonml.github.io/docs/en/jsx).

Revery using GLFW.

- Layout
- React

## Developer experience

```reason
let textHeaderStyle =
        Style.make(
          ~color=Colors.white,
          ~fontFamily="Lato-Regular.ttf",
          ~fontSize=24,
          ~marginHorizontal=8,
          ~opacity,
          ~transform=[TranslateY(translate)],
          (),
        );
```

### Type system

Reason is more lightweight version of OCaml and it tries to be more friendly to web developers

But it's still rich functional language with a tons of useful paradigms and nice type system.

### Compilation time

Esy works blazingly fast as a build system.

### Ecosystem

(these screens temporary)

![image](https://user-images.githubusercontent.com/1004115/52076947-e8120180-25a0-11e9-8734-9661d58a38fe.png)

![image](https://user-images.githubusercontent.com/1004115/52076437-b8aec500-259f-11e9-8632-cbf07a2df495.png)

https://github.com/facebook/reason/issues/2293

![image](https://user-images.githubusercontent.com/1004115/52163661-28cf5f00-26f6-11e9-9dac-cf66eb4c2c2b.png)
