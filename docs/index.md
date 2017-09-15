---
layout: default
title: "Home"
---

### What is Adventure

**Adventures** is a custom story format for [Twine 2](https://twinery.org/) made by [Longwelwind](https://twitter.com/Longwelwind) that allows writers to add RPG elements such as health, items, golds and more to their story. The project is open source; feel free to contribute on the [Github repository](https://github.com/Longwelwind/adventures) !

![Demo of Adventures]({{ site.baseurl }}/assets/home-demo.gif)

The documentation is split into 2 sections:

* **Basic Usage** shows how to use the basic functions of **Adventures** and is perfect for beginners, or those who don't possess sufficient Javascript knowledge as most scripts can be copy/pasted into your story. This section will show you how to change the health of the player, change the gold it holds and add or remove items in its inventory.
* **Advanced Usage** shows the advanced features of **Adventures** and is reserved for those who possess an intermediate knowledge of Javascript and want to make more complex interactions. This section will show you how to create custom items, for example.

### Requirements

**Adventures** is based on [klembot's Snowman 2](https://bitbucket.org/klembot/snowman-2) and works by calling Javascript functions inside `<% %>` tags to change the state of the character and the story. For example, to add a sword to the inventory of the player, you'd write in one of your passages:

```
In the middle of the hall, amidst the corpses of the goblins, you find a sword. You're definitly not the first one to wield it, but it should suffice should a monster bar your way.

<% character.inventory.addItem("sword"); %>
```

If you have no knowledge of Javascript, a small section describing the basics of Javascript will help you get the minimum skill to use Adventures.