---
layout: page
title: Electron
tagline: Packed Chromium + Node.js
---

- [Internals](#internals)
- [Developer experience](#developer-experience)
- [Network](#network)
- [OS Integration](#os-integration)
- [Accessibility (a11y)](#accessibility-a11y)
  - [Voice Over](#voice-over)
- [Animations](#animations)
- [Theme support](#theme-support)

| **Home** | [https://electronjs.org](https://electronjs.org) |
| **Platforms** | Linux, macOS, Windows |
| **Renderer** | Skia + WebGL |
| **Download Electron Chat** | Coming soon |

Tech stack used for building a showcase app:

| **Build system** | Webpack |
| **Languages** | TypeScript |
| **Libraries** | React, styled components |
| **Editor** | Visual Studio Code |

## Internals

The browser is an incredibly complicated piece of software comparable with the Operating System itself.
There is a lot happening to render these simple HTML + CSS into a pixels that we see on the screen. _I should put here a link to Chrome internals_. Chromium uses cross-platform library **Skia** (skia.org) to paint it.

Let's look at a simple button.
In order to place it on the screen you need HTML:

```html
<button type="button">Save</button>
```

some optional CSS to style this button:

```css
button {
  margin: 2em;
}
```

and optionally JavaScript to handle changes:

```js
document.querySelector("input").onchange = e => console.log(e);
```

This is the result you get on macOS in Chrome and Electron:

<img width="70" alt="A default button in Chrome" src="https://user-images.githubusercontent.com/1004115/51084515-2e133c80-173c-11e9-869e-7f030a4e1a7a.png">

At first glance it looks like a native button on macOS, but when we press it, we can spot a little difference comparing to the same button in Safari:

![a pressed button in Chrome](https://user-images.githubusercontent.com/1004115/51084508-0e7c1400-173c-11e9-8e01-afae48d71047.gif)

![a pressed button in Safari](https://user-images.githubusercontent.com/1004115/51084915-070c3900-1743-11e9-9040-87c1fa4395db.gif)

Why is it happening? If we dump our rendered chat client from HTML+CSS to Skia's internal representation format and use a debugger,
we can watch a step-by-step demonstration of how the whole document was painted by using lower-level graphical instructions:

<img width="450" alt="Skia debugger step-by-step painting process of a chat" src="https://user-images.githubusercontent.com/1004115/51084323-92cc9800-1738-11e9-94fe-d40e56f16830.gif">

And the button here is just an image of button's background + set of glyphs drawn over it + some transformation logic applied to get the correct size.

So the button in Chrome doesn't match the native look&feel for every operating system out there. But who cares?
In terms of styling, usually for a web site it does not mean a lot, controls are rarely used as it is, their design are customized and it probably won't look anything like a default native button anyway:

<img width="90" alt="A styled button" src="https://user-images.githubusercontent.com/1004115/51088353-9fb8ae00-176f-11e9-9a58-c4c891f6c6a2.png">

This is not always true for the desktop. For a certain group of desktop apps, though, you may want to "mimic" the look to make it closer to system controls.
That is still possible by carefully crafting the right CSS, but it'll be harder to maintain over the time. As an example, look at the library that provided a set of macOS UI controls called [Maverix](https://screenisland.com/maverix/#/controls), it became outdated the next second Apple released the next macOS version.

Good news, we don't need anything like for the most parts of our [chat app](/#chat-app-is-the-new-todo-list), we can use custom styles.

## Developer experience

Since Electron is based on a web browser, Chromium in this case, the developer experience for anyone who is already familiar with the web is just amazing.
For everything that is related to the UI inside a window you feel like you just write a web application. You have all sort of hot reloadings, DevTools that allows you to change styles on the fly and profile on every machine your app installed, and infinite amount of integrations with design tools.

<img width="1041" alt="Simplicity of UI development in Electron — it's basically the same as in the browser" src="https://user-images.githubusercontent.com/1004115/51083744-ef778500-172f-11e9-9ed8-d7665c42757a.png">

The level of **googlability** of any problem is really high, either that is an npm package, a stackoverflow question or a GitHub issue similar to yours.

## Network

What about writing a network code, HTTP and WebSocket in particular?
We can guess just by looking at the names of these protocols, we have **Hyper**text and **Web**Socket here, both invented for the **web** browser, which exactly Electron is.
Surprisingly, though, HTTP was much more suited initially for interlinked documents, not apps, so all we have is XmlHttpRequest and Fetch and abstractions over them.
Now, the things are changing and browsers get better. Also, you have WebRTC now and can try to build Skype on top of it.

And again we're writing web application, so to start using Slack's API we'll go to npm:

```
yarn add @slack/client
```

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

## OS Integration

To be able to write an app

<img width="1347" alt="oAuth in a Slack app that does not re-use the browser" src="https://user-images.githubusercontent.com/1004115/51083737-cfe05c80-172f-11e9-854a-96079c04d274.png">

OAuth leveraging existing Slack session in browser.

## Accessibility (a11y)

Let's enable acessibility on macOS and check simple things:

<img width="400" alt="macOS accessibility shortcuts" src="https://user-images.githubusercontent.com/1004115/51406915-8c408500-1b6b-11e9-9243-f6c2eab9bc1a.png">

### Voice Over

At first I was getting "link, #webrender, we" on each menu:

<img width="600" alt="Voice over demonstration for menu, it says link, #webrender, we" src="https://user-images.githubusercontent.com/1004115/51429958-67104d00-1c25-11e9-9f08-410aa942c012.png">

Why is that?

Because React components inside `ChannelList` produced HTML that looked like this:

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

After reading [https://inclusive-components.design/menus-menu-buttons/](https://inclusive-components.design/menus-menu-buttons/),
I added some semantics and aria attributes:

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

It's all done in styled-components and React fully supports `aria-` attributes.

So we hide `#` and `we` (needed for the compact mode), and now it looks like menu, and user knows what to expect:

<img width="402" alt="The demonstration of Voice over after a small refactoring" src="https://user-images.githubusercontent.com/1004115/51430179-4f869380-1c28-11e9-9276-6b9e889f4ec7.png">

And what's nice, we can use LightHouse to inspect accessiblity since our UI is basically a html opened in web browser and we can use Devtron — a tool to debug Electron apps.

## Animations

To be continued...

## Theme support
