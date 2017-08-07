---
layout: page
title: "Installing"
category: basic-usage
date: 2017-08-07 21:06:05
---

To install **Adventures** in Twine 2, click `Formats` in the main menu, then `Add a New Format` and paste the url below into the box. Finally, click `Add`.

```
https://github.com/Longwelwind/adventures/blob/master/dist/format.js
```

You can now create new story or edit an existing one and change the story format for your story.

**Adventures** is based on [klembot's Snowman 2](https://bitbucket.org/klembot/snowman-2) and works by calling Javascript functions to change the state of the character and the story. For example, to add a sword to the inventory of the player, you'd write:

```
<% character.inventory.addItem("sword"); %>

In the middle of the hall, amidst the corpses of the goblins, you find a sword. You're definitly not the first one to wield it, but it should suffice should a monster bar your way.
```

