---
layout: default
title: "Home"
---

### What is Adventure

**Adventures** is a custom story format for [Twine 2](https://twinery.org/) that allows writers to add RPG elements such as health, items, golds and more to their story.

![Demo of Adventures]({{ site.url }}/assets/home-demo.gif)

### Requirements

**Adventures** is based on [klembot's Snowman 2](https://bitbucket.org/klembot/snowman-2) and works by calling Javascript functions inside `<% %>` tags to change the state of the character and the story. For example, to add a sword to the inventory of the player, you'd write in one of your passages:

```
In the middle of the hall, amidst the corpses of the goblins, you find a sword. You're definitly not the first one to wield it, but it should suffice should a monster bar your way.

<% character.inventory.addItem("sword"); %>
```

It is recommended to know a bit of Javascript, but it is not mandatory. Most function calls are easily understandable and can be copy/pasted from the docs.