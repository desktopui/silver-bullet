[![](https://img.shields.io/badge/desktopui-slack-green.svg?logo=slack)](https://join.slack.com/t/desktopui/shared_invite/enQtNTE4NjEyNTA1MzE5LTczZWYzZGQ4YWVhNmFjMWE1N2U2M2FjOGVmYjljMTkyM2I3NjM2OWVhNmNhYTBkZWQxODcxMWY3ZDlhM2YzY2Q)

_the article is work-in-progress_

- [A showcase app](#a-showcase-app)
- [Desktop frameworks](#desktop-frameworks)
- [Motivation](#motivation)
    - [Isn't desktop dying? Given that PWA is coming, and WebAssembly is a thing.](#isnt-desktop-dying-given-that-pwa-is-coming-and-webassembly-is-a-thing)
    - [So what should I use? Please, no "it depends" answer.](#so-what-should-i-use-please-no-%22it-depends%22-answer)

## A showcase app

<img src="https://user-images.githubusercontent.com/1004115/50629735-e37d0d80-0f4e-11e9-9c2e-3081e943879e.png" alt="a prototype for a chat app screenshot" width="400"  />

Instead of a ToDo list, we are going to implement a minimal chat example in hope of searching some answers for various problems that needs to be solved in desktop UI engineering:

- Network: HTTP requests and web sockets
- Animation
- Accessiblity
- Responsive layout
- Platform-specific API that browsers don't have (yet) and OS integration.
- Theme support and/or the dark theme in Mojavi
- i18n
- Sort of Advanced UI: inversible scroll and/or a virtualized list
- Basic tests

It's not that kind of test "let's measure some metrics, get scores and choose the best", like you read when choosing a TV. It's merely an attempt
to explore current possibilities to write GUI and learn something new.

## Desktop frameworks

- ### Electron. TypeScript, React, Styled Components, Visual Studio Code.
- ### TODO: WebView wrapper https://github.com/Boscop/web-view
- ### TODO: Servo WebRenderer http://tomsik.cz/node-webrender/
- ### TODO: React Native from Microsoft
- ### TODO: React Native for Qt from Status
- ### TODO: Flutter for desktop
- ### TODO: Libui (proton-native)
- ### TODO: Libui (bindings for Rust/Go)
- ### TODO: Qt
- ### TODO: Swing Java
- ### TODO: The framework SublimeText is using.
- ### _Bonus:_ Marzipan (iOSMac)

## Motivation

#### Isn't desktop dying? Given that PWA is coming, and WebAssembly is a thing.

It surely will narrow down the area for desktop apps. Apple recently [turned back]() on desktop machines recognizing its importance for the community. It's still a primary tool for pro users. Most people still prefers editing code, photos and video in specialized desktop tool.

#### So what should I use? Please, no "it depends" answer.

But it really depends. From a plain old web application with offline compabilities to fully native there are scale with different set of trade-offs.
