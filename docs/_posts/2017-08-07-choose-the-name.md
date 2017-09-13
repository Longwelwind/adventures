---
layout: page
title: "Changing the hero's name"
category: others
date: 2017-08-07 21:06:04
---

### Setting the name

The name of the character (displayed at the top of the left panel) is stored in the variable `character.name`. It can be changed by writing in one of your passage:

```
<%
character.name = "Tanis Half-Elven"
%>
```

You can for example put this code in the first passage of your story, if you want the name of the character to be "fixed" (not chosen by the player).

### Letting the player choose its name

This section will show you how to let the player choose its name. Specifically, we will:

* Make sure the character panel is hidden at the beginning of the game
* Put an text box in the first passage of the game, to let the player choose the name of its character
* Once the player clicks on the link to go to the second passage, display the left panel with the name

#### Hide the character panel

In the first passage of the game, add this small script to hide the character panel

```
<%
story.config.displayCharacterPanel = false;
%>
```

#### Add the text box

Always in the first passage of the game, add this small HTML code to show a text box where the player can write the name of its character

```
<input onchange="character.name = this.value">
```

#### Display the character panel


```
<%
story.config.displayCharacterPanel = true;
%>
```

### Example

As an example, here is the complete content of the two first passages of a story that would ask the player the name of its character

#### First passage

```
<%
story.config.displayCharacterPanel = false;
%>

Welcome adventurer, what is your name ?

<p><input onchange="character.name = this.value" /></p>

[[Confirm|Second]]
```

#### Second passage

```
<%
story.config.displayCharacterPanel = true;
%>

Your name is <%= character.name %>!

You wake up in an inn, without any memory of what happened last night...
```