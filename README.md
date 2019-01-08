[![](https://img.shields.io/badge/desktopui-slack-green.svg?logo=slack)](https://join.slack.com/t/desktopui/shared_invite/enQtNTE4NjEyNTA1MzE5LTczZWYzZGQ4YWVhNmFjMWE1N2U2M2FjOGVmYjljMTkyM2I3NjM2OWVhNmNhYTBkZWQxODcxMWY3ZDlhM2YzY2Q)

<img src="https://user-images.githubusercontent.com/1004115/50629735-e37d0d80-0f4e-11e9-9c2e-3081e943879e.png" alt="a prototype for a chat app screenshot" width="400"  />

Instead of an ToDo list, we are going to implement a minimal chat example in different UI frameworks and see some :

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

- ### [Electron](/tree/master/electron)
- ### WebView wrapper https://github.com/Boscop/web-view
- ### Servo WebRenderer http://tomsik.cz/node-webrender/
- ### React Native from Microsoft
- ### React Native for Qt from Status
- ### Flutter for desktop
- ### Libui (proton-native)
- ### Libui (bindings for Rust/Go)
- ### Qt
- ### Swing Java
- ### The framework SublimeText is using.
- ### _Bonus:_ Marzipan

## Motivation

### Isn't desktop dying? Given that PWA is coming, and WebAssembly is a thing.

It surely will narrow down the area for desktop apps. Apple recently [turned back]() on desktop machines recognizing its importance for the community. It's still a primary tool for pro users. Most people still prefers editing code, photos and video in specialized desktop tool.

### So what should I use? Please, no "it depends" answer.

But it really depends. From a plain old web application with offline compabilities to fully native there are scale with different set of trade-offs.
