---
layout: page
title: Intro
tagline: ChatApp is the new TodoMVC
---

- [TLDR](#tldr)
- [Isn't desktop dying?](#isnt-desktop-dying)
- [10 Popular Desktop Applications and the trade-offs](#10-popular-desktop-applications-and-the-trade-offs)
- ["New Wave" vs "Old school"](#new-wave-vs-old-school)
- [Immediate Mode GUI](#immediate-mode-gui)
- [ChatApp is the new TodoMVC](#chatapp-is-the-new-todomvc)

## TL;DR

I want to write an app, make it cross-platform,
do it in reasonable amount of time and with the smallest overhead possible.
What framework should I use?

Well, it depends.

## Do we need apps for desktop anyway? Isn't desktop dying?

In 2018 Apple said that iOS developers earned $34 billion at App Store. 
That figure is 28% higher than the $26.5 billion from 2017.
It's incredibly competitive market, iOS apps, and still you probably would have better chance to get paid by doing iOS.

The mobile has [overtaken](https://netmarketshare.com/device-market-share?options=%7B%22dateLabel%22%3A%22Custom%22%2C%22attributes%22%3A%22share%22%2C%22group%22%3A%22deviceType%22%2C%22sort%22%3A%7B%22share%22%3A-1%7D%2C%22id%22%3A%22deviceTypes%22%2C%22dateInterval%22%3A%22Monthly%22%2C%22filter%22%3A%7B%7D%2C%22dateStart%22%3A%222017-03%22%2C%22dateEnd%22%3A%222019-01%22%2C%22plotKeys%22%3A%5B%7B%22deviceType%22%3A%22Mobile%22%7D%2C%7B%22deviceType%22%3A%22Desktop%2Flaptop%22%7D%5D%2C%22segments%22%3A%22-1000%22%7D) desktop in many ways, including traffic:

![Some weird stats from netshare about how desktop has fallen](https://user-images.githubusercontent.com/1004115/52165689-fed96500-2714-11e9-86af-9446c9337879.png)

And offline web apps is the thing. Browsers eating the market, Google Docs vs Microsoft Office as an example.

Still, [5.5m Macs](https://9to5mac.com/2018/11/01/apple-earnings-fy18-q4/) were sold during 2018 Q4 and more than [75 million units](https://www.statista.com/statistics/263393/global-pc-shipments-since-1st-quarter-2009-by-vendor/) of all desktop computers were shipped in 2018.

![image](https://user-images.githubusercontent.com/1004115/52165775-f2094100-2715-11e9-9080-a0840c3930d9.png)

So desktop is definetly alive at the moment, and professional software isn't going anywere. [Yet](https://www.theverge.com/2018/10/15/17969754/adobe-photoshop-apple-ipad-creative-cloud).
Major part of this generation is still sitting all day behind computers, even they sit with theirs smartphones in all other time.

And by looking at effort Microsoft, Google and Apple doing, we might consider that mobile and web apps will evolve eventually into the same complex UI programs, facing the same problems.

In the end, it's fun to learn anyway!

## Do we need GUI frameworks at all?

So we decided that we still need desktop apps sometimes. Do we really need cross-platform UI for that?
Why we can't use the native library that was meant to be the best?
A lot of code could be shared? So let's do that.

...

## 10 Desktop Applications and the trade-offs

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
