Join DesktopUI slack: https://join.slack.com/t/desktopui/shared_invite/enQtNDE2MDA1MzIwMjU3LTNmMWFkOTUzNWQ0MDNiOTFiZTY1NTM0NDE3MTFjNzkzZDZmOTJlMGI4MmRlZjA3ZDk2NjM1YTY0MzA4ZThhMDQ

Instead of an TODO list, we are going to implement a minimal chat example that contains:

- Http requests
- Websockets
- Animation
- Basic layout
- A piece of code that uses platform API that browsers don't have (yet)
- Dark theme in Mojavi
- OS integration (showing if you're using ide in status - thus scanning the currently running process)
- Accessiblity
- Sort of Advanced UI: inversible scroll and/or virtualized list
- Basic tests

It's not that kind of test "let's measure some metrics, get scores and choose the best", like you read when choosing a TV. It's merely an attempt
to explore current possibilities to write GUI and learn something new.

## Contents

1. [Part 0 - Intro](#Intro)
1. [Part I - Electron](#Electron)
1. https://github.com/Boscop/web-view
1. http://tomsik.cz/node-webrender/
1. React Native from Microsoft
1. React Native for Qt from Status
1. Flutter for desktop
1. Libui
   5.1 Proton-native
   5.2 Bindings for ..
1. Qt
1. Swing Java
1. JavaFX
1. The framework SublimeText is using.

- _Bonus:_ Marzipan

## Intro

### Isn't desktop dying? Given that PWA is coming, and WebAssembly is a thing.

It surely will narrow down the area for desktop apps. Apple recently [turned back]() on desktop machines recognizing its importance for the community. It's still a primary tool for pro users. Most people still prefers editing code, photos and video in specialized desktop tool.

### So what should I use? Please, no "it depends" answer.

But it really depends. From a plain old web application with offline compabilities to fully native there are scale with different set of trade-offs.

## Electron

<!--
Electron has a its own renderer and some APIs that extend browser ones, but you're still have to implement many things in a platform-dependent way. -->
