---
layout: page
title: "Items"
category: basic-usage
date: 2017-08-07 21:06:03
---

### Handling items in-game

**Adventures** comes with a list of pre-defined items you can use in your adventures. They are listed in the section below, and their corresponding `tag` must be used in the functions below to handle them.

To add an item (for example, a `sword`) to the player's inventory, you'd write:

```javascript
<%
character.inventory.addItem("sword");
%>
```

To remove an item (if the player has this item in its inventory):

```javascript
<%
character.inventory.removeItem("sword");
%>
```

You can also spawn items in a small chest under the content of the passage. Those items will be draggable by the player to their inventory.

```javascript
<%
// Those two lines will spawn one chest with two items:
// a sword and a shield
story.addLootItem("sword");
story.addLootItem("shield");
%>
```

### List of items

**Adventures** comes by default with a list of pre-defined items that you can use in your stories, shown in the table below. The first column (`tag`) is the name you must use in the functions described above.

tag|name|icon
---|---|---
`sword`|Sword|![sword]({{ site.baseurl }}/assets/items/weapon_01.png)