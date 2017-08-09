---
layout: page
title: "Health and Gold"
category: basic-usage
date: 2017-08-07 21:06:05
---

### Health

You can change the health of the player using the following functions:

```javascript
// The character will receive 12 points of damage
character.damage(12);
// The character will be healed of 8 points of damage 
character.heal(8);
```

The character has a maximum health of 20.

Its current health is accessible through ```character.health```, for example:

```
The innkeeper welcomed you into his place.

<% if (character.health < 10) { %>

"It looks like you're hurt, I'll get you a bedroom. No need to pay, it looks like you've got enough trouble today already."

<% } %>

```

If the health of the character ever falls to 0, the game will trigger a death screen, ending the adventure of the player

### Gold

The amount of gold carried by the player can be changed using the following functions:

```javascript
// Add 45 gold to the inventory of the player
character.addGold(45);
// Remove 25 gold to the inventory of the player
character.removeGold(25);
```

The amount of gold carried by the player can be accessed through `character.gold`. For example, you can offer the player to buy an item:

```
"I have a sword that might help in your future encounters.

It's not free, though... 10 gold might convince me to give it to you."

<% if (character.gold >= 10) { %>
    [["Okay !"|Buy the sword]]
<% } %>

[["I don't want it"|Continue]]
```

The link to the passage `Buy the sword` will only appear if the player has at least 10 gold.

In the passage `Buy the sword`, you can then write:

```
<%
character.removeGold(10);
character.inventory.addItem("sword");
%>

"Hope you'll make good use of it !"
```