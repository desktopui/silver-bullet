---
layout: page
title: About
tagline: ChatApp is the new TodoMVC
---

- [TLDR](#tldr)
- [Isn't desktop dying?](#isnt-desktop-dying)
- [10 Popular Desktop Applications and the trade-offs](#10-popular-desktop-applications-and-the-trade-offs)
- ["New Wave" vs "Old school"](#new-wave-vs-old-school)
- [Immediate Mode GUI](#immediate-mode-gui)
- [ChatApp is the new TodoMVC](#chatapp-is-the-new-todomvc)

## TLDR

I want to write an app, make it cross-platform, I want to do it in reasonable amount of time and with the smallest overhead possible.
What should I use?

It depends.

## Isn't desktop dying?

In short:

- No.
- Ok, but slowly.
- Professional software?
- That we consider mobile apps will evolve eventually anyway.
- It's fun to learn anyway!

## 10 Popular Desktop Applications and the trade-offs

**Adobe Photoshop**

Classic, client-side value, with a huge legacy and with ongoing process of rewriting. No Linux version.

**Microsoft Office**

_to be fact-checked_ Classic, client-side value, with a huge legacy and with ongoing process of rewriting. No Linux version.

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

Consider something like Macbook Alarm. Almost no UI.

## "New Wave" vs "Old school"

## Immediate Mode GUI

[IMMEDIATE-MODE GRAPHICAL USER INTERFACES (2005)](https://caseymuratori.com/blog_0001)

See [nuklear](/nuklear) and [imgui][/imgui]

## ChatApp is the new TodoMVC

Instead of a TODO list, we are going to implement a simplistic chat app in hope of searching some answers for various problems that needs to be solved in desktop UI engineering:

- Accessibility (a11y)
- Advanced UI elements: in this case either inversible scroll or a virtualized list or complex markdown layout
- Animation
- Basic tests
- Network: HTTP requests and web sockets
- Text rendering and internationalization (i18n)
- Theme support and/or the dark theme in Mojavi
- Platform-specific API that browsers don't have (yet) and OS integration.
- Responsive layout

It's not that kind of test "let's measure some metrics, get scores and choose the best", like you read when choosing a TV. It's merely an attempt
to explore current possibilities to write GUI and learn something new.

This is the main window that was prototyped in 10 minutes using Figma:

<img src="https://user-images.githubusercontent.com/1004115/50629735-e37d0d80-0f4e-11e9-9c2e-3081e943879e.png" alt="a prototype for a chat app screenshot" width="400"  />

We have a scrollable channel list, and scrollable message list, with the header and the footer which is a text input.

We are going to try Slack APIs as well and see how far we can go with it.
