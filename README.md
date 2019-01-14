[![](https://img.shields.io/badge/desktopui-slack-green.svg?logo=slack)](https://join.slack.com/t/desktopui/shared_invite/enQtNTE4NjEyNTA1MzE5LTczZWYzZGQ4YWVhNmFjMWE1N2U2M2FjOGVmYjljMTkyM2I3NjM2OWVhNmNhYTBkZWQxODcxMWY3ZDlhM2YzY2Q)

_the article is work-in-progress_

- [Searching for Silver Bullet](#searching-for-silver-bullet)
  - [Intro](#intro)
    - [Isn't desktop software dying?](#isnt-desktop-software-dying)
    - [10 Popular Desktop Applications and the trade-offs](#10-popular-desktop-applications-and-the-trade-offs)
    - ["New Wave" vs "Old school"](#%22new-wave%22-vs-%22old-school%22)
  - [Showcase: a chat app in different frameworks](#showcase-a-chat-app-in-different-frameworks)
  - [Electron](#electron)
  - [TODO: WebView wrapper https://github.com/Boscop/web-view](#todo-webview-wrapper-httpsgithubcomboscopweb-view)
  - [TODO: Servo WebRenderer http://tomsik.cz/node-webrender/](#todo-servo-webrenderer-httptomsikcznode-webrender)
  - [TODO: React Native from Microsoft](#todo-react-native-from-microsoft)
  - [TODO: React Native for Qt from Status](#todo-react-native-for-qt-from-status)
  - [TODO: Flutter for desktop](#todo-flutter-for-desktop)
  - [TODO: Libui (proton-native)](#todo-libui-proton-native)
  - [TODO: Libui (bindings for Rust/Go)](#todo-libui-bindings-for-rustgo)
  - [TODO: sciter](#todo-sciter)
  - [TODO: nulklear](#todo-nulklear)
  - [TODO: The framework Quip is using if available](#todo-the-framework-quip-is-using-if-available)
  - [TODO: WDL](#todo-wdl)
  - [TODO: Qt](#todo-qt)
  - [TODO: Swing Java](#todo-swing-java)
  - [TODO: The framework SublimeText is using if available](#todo-the-framework-sublimetext-is-using-if-available)
  - [TODO: JUCE](#todo-juce)
  - [TODO: wxwidgets](#todo-wxwidgets)
  - [TODO: JavaFX (TornadoFX)](#todo-javafx-tornadofx)
  - [Advanced](#advanced)
    - [Writing your own custom renderer (Webgl/OpenGL/DirectX)](#writing-your-own-custom-renderer-webglopengldirectx)
  - [Bonus: PWA (ServiceWorkers)](#bonus-pwa-serviceworkers)
  - [Bonus: Marzipan (iOSMac)](#bonus-marzipan-iosmac)

# Searching for Silver Bullet

## Intro

### Isn't desktop software dying?

### 10 Popular Desktop Applications and the trade-offs

### "New Wave" vs "Old school"

## Showcase: a chat app in different frameworks

Instead of a ToDo list, we are going to implement a simplistic chat app in hope of searching some answers for various problems that needs to be solved in desktop UI engineering:

- Network: HTTP requests and web sockets
- Animation
- Accessiblity
- Responsive layout
- Text rendering and internatialization
- Platform-specific API that browsers don't have (yet) and OS integration.
- Theme support and/or the dark theme in Mojavi
- Advanced UI: in this case either inversible scroll or a virtualized list or complex markdown layout
- Basic tests

It's not that kind of test "let's measure some metrics, get scores and choose the best", like you read when choosing a TV. It's merely an attempt
to explore current possibilities to write GUI and learn something new.

This is the main window that was prototyped in 10 minutes using Figma:

<img src="https://user-images.githubusercontent.com/1004115/50629735-e37d0d80-0f4e-11e9-9c2e-3081e943879e.png" alt="a prototype for a chat app screenshot" width="400"  />

We have a scrollable channel list, and scrollable message list, with the header and the footer which is a text input.

We are going to try Slack APIs as well and see how far we can go with it.

## Electron

[https://electronjs.org](https://electronjs.org)

**Build system**: Webpack

**Languages**: TypeScript

**Libraries**: React, Styled Components

**Editor**: Visual Studio Code

**Renderer** Software renderer for DOM (Skia) + WebGL

Since Electron is based on a web browser, Chromium in this case, the developer experience for anybody who is already familiar with the web is just amazing. For everything that is related to the UI inside a window you feel like you just write a web application. You have all sort of live and hot reloadings, DevTools that allows you to change styles on the fly and profile, and infinite amount of integrations with tools UI designers are using.

In order to place an input on the screen you need HTML:

```html
<button type="button">Save</button>
```

some optional CSS to style:

```css
button {
  margin: 2em;
}
```

and optionally add JavaScript to handle changes:

```js
document.querySelector("input").onchange = e => console.log(e);
```

That's the result on macOS:

<img width="70" alt="screenshot 2019-01-13 14 00 03" src="https://user-images.githubusercontent.com/1004115/51084515-2e133c80-173c-11e9-869e-7f030a4e1a7a.png">

How does it translate to different platforms? The browser is an incredibly complicated piece of software, comparable with the Operating System itself. There is a lot happening to render these simple HTML + CSS into a pixels that we see on the screen. _I should put here a link to Chrome internals_. Chromium uses cross-platform library **Skia** (skia.org) to paint it. At first glance it looks like a native button on macOS, but when we press it, we see the difference:

![a pressed button in Chrome](https://user-images.githubusercontent.com/1004115/51084508-0e7c1400-173c-11e9-8e01-afae48d71047.gif)

![a pressed button in Safari](https://user-images.githubusercontent.com/1004115/51084915-070c3900-1743-11e9-9040-87c1fa4395db.gif)

If we dump our chat client to Skia internal representation format and use a debugger, we can see a step-by-step process where button is just an image of button backgraound + set of glyphs over it + some transformation logic:

<img width="350" alt="Skia debugger step-by-step painting process of a chat" src="https://user-images.githubusercontent.com/1004115/51084323-92cc9800-1738-11e9-94fe-d40e56f16830.gif">

So the button doesn't match native look and feel. What does it mean? In terms of styling, usually for a web site it does not mean a lot, controls are rarely used as it is, their design are customized and it probably should not look anything like native button:

<img width="90" alt="Styled button" src="https://user-images.githubusercontent.com/1004115/51088353-9fb8ae00-176f-11e9-9a58-c4c891f6c6a2.png">

For a certain group of desktop apps, though, you may want to "mimic" it with system controls, which is possible by carefully crafting the right CSS, but it'll be harder to maintain with Electron. As an example, look at the library that provides a set of macOS UI controls https://screenisland.com/maverix/#/controls, it became outdated the next second Apple released the next macOS version.

Good news, we don't need anything like that for our chat app.

**Sign in**

<img width="1202" alt="Paused debugger for Slack developer section in order to change a scope parameter" src="https://user-images.githubusercontent.com/1004115/51083733-c951e500-172f-11e9-93ea-c918f874e25e.png">

**OAuth leveraging existing Slack session**

<img width="1347" alt="oAuth in a Slack app that does not re-use the browser" src="https://user-images.githubusercontent.com/1004115/51083737-cfe05c80-172f-11e9-854a-96079c04d274.png">

**A joy of prototyping with React and Styled components**

<img width="1041" alt="Simplicity of UI development in Electron — it's basically the same as in the browser" src="https://user-images.githubusercontent.com/1004115/51083744-ef778500-172f-11e9-9ed8-d7665c42757a.png">

## TODO: WebView wrapper https://github.com/Boscop/web-view

## TODO: Servo WebRenderer http://tomsik.cz/node-webrender/

## TODO: React Native from Microsoft

## TODO: React Native for Qt from Status

## TODO: Flutter for desktop

## TODO: Libui (proton-native)

## TODO: Libui (bindings for Rust/Go)

## TODO: sciter

## TODO: nulklear

## TODO: The framework Quip is using if available

## TODO: WDL

## TODO: Qt

## TODO: Swing Java

## TODO: The framework SublimeText is using if available

## TODO: JUCE

## TODO: wxwidgets

## TODO: JavaFX (TornadoFX)

## Advanced

### Writing your own custom renderer (Webgl/OpenGL/DirectX)

## Bonus: PWA (ServiceWorkers)

## Bonus: Marzipan (iOSMac)
