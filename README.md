[![](https://img.shields.io/badge/desktopui-slack-green.svg?logo=slack)](https://join.slack.com/t/desktopui/shared_invite/enQtNTE4NjEyNTA1MzE5LTczZWYzZGQ4YWVhNmFjMWE1N2U2M2FjOGVmYjljMTkyM2I3NjM2OWVhNmNhYTBkZWQxODcxMWY3ZDlhM2YzY2Q)

_the article is work-in-progress, it mostly likely will be split into segments_

- [Intro](#intro)
  - [Isn't desktop software dying?](#isnt-desktop-software-dying)
  - [10 Popular Desktop Applications and the trade-offs](#10-popular-desktop-applications-and-the-trade-offs)
  - ["New Wave" vs "Old school"](#%22new-wave%22-vs-%22old-school%22)
  - [Immediate Mode GUI](#immediate-mode-gui)
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
- [nuklear](#nuklear)
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

## Intro

### Isn't desktop software dying?

### 10 Popular Desktop Applications and the trade-offs

**Microsoft Office**

Classic, client-side value, with a huge legacy and with ongoing process of rewriting. No Linux version.

**Adobe Photoshop**

Classic, client-side value, with a huge legacy and with ongoing process of rewriting. No Linux version.

**Skype**

Fast iteration on development more than anything.

**Sublime Text**

Small team. All platforms. Complex logic behind UI, but few controls. Fast&responsive.

**VLC Player**

Relatively simple UI with complex low-level processing behind it.

**Spotify**

Single-window static UI.

**Dropbox**

Little UI, deep integration into the system. Network/Server > Client

**Arduino IDE**

Written in Java Swing.

**Telegram Desktop**

Web could be banned, because URL != server API endpoint, URL is more like a name, shortcut to launch an app.

**Small indie app**

### "New Wave" vs "Old school"

### Immediate Mode GUI

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

Setup used for building a showcase app:

**Build system**: Webpack

**Languages**: TypeScript

**Libraries**: React, Styled Components

**Editor**: Visual Studio Code

**Renderer** Software renderer for DOM (Skia) + WebGL

Since Electron is based on a web browser, Chromium in this case, the developer experience for anyone who is already familiar with the web is just amazing. For everything that is related to the UI inside a window you feel like you just write a web application. You have all sort of hot reloadings, DevTools that allows you to change styles on the fly and profile, and infinite amount of integrations with tools UI designers are using.

The browser is an incredibly complicated piece of software, comparable with the Operating System itself. There is a lot happening to render these simple HTML + CSS into a pixels that we see on the screen. _I should put here a link to Chrome internals_. Chromium uses cross-platform library **Skia** (skia.org) to paint it.

Let's check a simple button. In order to place an input on the screen you need HTML:

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

This is the result you get on macOS:

<img width="70" alt="screenshot 2019-01-13 14 00 03" src="https://user-images.githubusercontent.com/1004115/51084515-2e133c80-173c-11e9-869e-7f030a4e1a7a.png">

How does it translate to different platforms? At first glance it looks like a native button on macOS, but when we press it, we can spot a little difference:

![a pressed button in Chrome](https://user-images.githubusercontent.com/1004115/51084508-0e7c1400-173c-11e9-8e01-afae48d71047.gif)

![a pressed button in Safari](https://user-images.githubusercontent.com/1004115/51084915-070c3900-1743-11e9-9040-87c1fa4395db.gif)

Why is it happening? If we dump our rendered chat client from HTML+CSS to Skia's internal representation format and use a debugger, we can watch a step-by-step demonstration of how the whole document was painted by using lower-level graphical instructions:

<img width="350" alt="Skia debugger step-by-step painting process of a chat" src="https://user-images.githubusercontent.com/1004115/51084323-92cc9800-1738-11e9-94fe-d40e56f16830.gif">

And the button here is just an image of button's background + set of glyphs drawn over it + some transformation logic.

So the button in Chrome doesn't match native look and feel for every operating system out there. But who cares? In terms of styling, usually for a web site it does not mean a lot, controls are rarely used as it is, their design are customized and it probably won't look anything like a default native button anyway:

<img width="90" alt="A styled button" src="https://user-images.githubusercontent.com/1004115/51088353-9fb8ae00-176f-11e9-9a58-c4c891f6c6a2.png">

For a certain group of desktop apps, though, you may want to "mimic" its look to make it closer to system controls. That is possible by carefully crafting the right CSS, but it'll be harder to maintain over the time. As an example, look at the library that provided a set of macOS UI controls https://screenisland.com/maverix/#/controls, it became outdated the next second Apple released the next macOS version.

Good news, we don't need anything like that for our chat app, and probably for any UI-heavy app.

**Network**

What about writing a network code, HTTP and WebSocket in particular? We can guess just by looking at the names of these protocols, we have Hypertext and Web here, both invented for the web browser. Surprisingly, though, HTTP was much more suited initially for interlinked documents, not apps, so all we have is XmlHttpRequest and Fetch and abstractions over them. But it's no longer true, and you have things like WebRTC now and can build Skype on top of it.

And again we're writing web application, so to start using Slack's API we'll go to npm:

`yarn add @slack/client`

and use it like this for HTTP API:

```ts
const web = new WebClient(token);
return web.users.list({}).then(results => {
  return results.members as Array<SlackUser>;
});
```

and also we can use WebSocket-based, real-time client, without even thinking about details:

```ts
const rtm = new RTMClient(token, params);
rtm.on("message", message => {
  // Log the message
  console.log(
    `(channel:${message.channel}) ${message.user} says: ${message.text}`
  );
});
```

_Here comes a small rant about how hard to write a desktop client for Slack, even though it's understandable from the business' standpoint and I should have probably picked something open sourced. But thanks to the support, turns out it's possible to use undocumented way to use their API. And again, I love web, so easy to debug on live._

<img width="1202" alt="Paused debugger for Slack developer section in order to change a scope parameter" src="https://user-images.githubusercontent.com/1004115/51083733-c951e500-172f-11e9-93ea-c918f874e25e.png">

**OS Integration**

To be able to write an app

<img width="1347" alt="oAuth in a Slack app that does not re-use the browser" src="https://user-images.githubusercontent.com/1004115/51083737-cfe05c80-172f-11e9-854a-96079c04d274.png">

OAuth leveraging existing Slack session in browser.

**Developer experience**

<img width="1041" alt="Simplicity of UI development in Electron — it's basically the same as in the browser" src="https://user-images.githubusercontent.com/1004115/51083744-ef778500-172f-11e9-9ed8-d7665c42757a.png">

**Accessiblity**

<img width="400" alt="macOS accessibility shortcuts" src="https://user-images.githubusercontent.com/1004115/51406915-8c408500-1b6b-11e9-9243-f6c2eab9bc1a.png">

![macOS accessiblity quick links]()

1. Voice Over

At first, after writing a prototype, I was getting "link, #webrender, we":
<img width="400" alt="Voice over demonstration for menu, it says link, #webrender, we" src="https://user-images.githubusercontent.com/1004115/51429958-67104d00-1c25-11e9-9f08-410aa942c012.png">

Why is that?

Because produced HTML looked like this:

```html
<div>
  <!-- ... -->
  <a href="">
    <span>#</span>

    <span>webrender</span>

    <span>we</span>
  </a>
  <!-- ... -->
</div>
```

After reading [https://inclusive-components.design/menus-menu-buttons/](https://inclusive-components.design/menus-menu-buttons/), I added some semantics and aria attributes:

```html
<nav>
  <ul aria-labelledby="sections-heading">
    <h3 id="sections-heading">Channel List</h3>
    <!-- ... -->
    <li>
      <a href="" aria-current="page">
        <span aria-hidden="true">#</span>

        <span aria-label="channel webrender">webrender</span>

        <span aria-hidden="true">we</span>
      </a>
    </li>
    <!-- ... -->
  </ul>
</nav>
```

It's all done in Styled components and React fully supports `aria-` attributes.

So we hide `#` and `we` (needed for the compact mode), and now it looks like menu, and user knows what to expect:

<img width="402" alt="The demonstration of Voice over after a small refactoring" src="https://user-images.githubusercontent.com/1004115/51430179-4f869380-1c28-11e9-9276-6b9e889f4ec7.png">

And what's nice, we can use LightHouse to inspect accessiblity since our UI is basically a html opened in web browser.

This is not complete.

## TODO: WebView wrapper https://github.com/Boscop/web-view

## TODO: Servo WebRenderer http://tomsik.cz/node-webrender/

## TODO: React Native from Microsoft

## TODO: React Native for Qt from Status

## TODO: Flutter for desktop

## TODO: Libui (proton-native)

## TODO: Libui (bindings for Rust/Go)

## TODO: sciter

## nuklear

[https://github.com/vurtun/nuklear](https://github.com/vurtun/nuklear)

**Build system**: CMake
**Launguage**: C
**Editor**: CLion
**Renderer** Not included, you can add it or copy from examples (GLFW3, GDI2, SDL, X11, etc.)

Another immediate mode GUI. Single-file dependency (On macOS it requires installing `glfw`, `glew` to compile), plain C, OpenGL.

At first glance it looks like everything that you can expect from it: the rendering is blurry, no accessiblity bridge, no OS-awareness, and there are some layout artifacts:

![nuklear example widget layout problems with window resizing](https://user-images.githubusercontent.com/1004115/51437327-fc572400-1cad-11e9-87f8-a8032ffd98e0.gif)

But this is just one example app, the other one from repository (`extended.c`) looks much better, although, text rendering is still off.
In real life, some issues can be mitigated if you build a very complex app and able to invest into it.

Using a wrapper also nice if you want to write a lot of code, and there are plenty of it, e.g. Rust, Go, Python.

[mwcampbell wrote](https://news.ycombinator.com/item?id=16347902)

> Technical follow-up: It seems to me that implementing today's platform accessibility APIs (e.g. UI Automation for Windows, AT-SPI for Unix) would be difficult if not impractical for an immediate-mode toolkit like this one.
> These accessibility APIs expose a tree of UI objects, which the client (e.g. screen reader) can freely navigate and query. This basically assumes that there's a tree of UI objects in memory, which is the case for all mainstream toolkits as far as I know. But that's not the case for an immediate-mode toolkit. At least with Nuklear, the content and state of the UI (e.g. the label and current checked state of a checkbox) aren't stored anywhere in the toolkit's data structures. So I guess applications would have to play a very active role in implementing accessibility APIs, much more than they would with, say, Qt or even Win32.
> Other Issues:

- OpenGL is deprecated on macOS
- [Dynamic height](https://github.com/vurtun/nuklear/issues/504)
- [Scroll to bottom of a scrollbar](https://github.com/vurtun/nuklear/issues/326)

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
