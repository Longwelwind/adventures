---
layout: page
title: "Javascript basics"
category: basic-usage
date: 2017-08-07 21:06:04
---

**Adventures** uses Javascript as a scripting language. Code can be written inside the `<% %>` tags, and values can be printed using the `<%= %>` tags. If you have no knowledge of Javascript, this section will introduce you the basic to make a story.

### State

You can remember values in named variables using the following syntax:

```javascript
<%
answer = "accepted";
count = 45;
%>
```

In this example, we stored the string of characters `Accepted` in a variable called `answer` and the number `45` in a variable called `count`.

You can print the content of a variable using the `<%= %>` (Note the `=` sign in the tag). For example:

```
When the mage made an offer, you <%= answer %> it.

You have killed <%= count %> orcs
```

Once in the story, this would be printed as:

```
When the mage made an offer, you accepted it.

You have killed 45 orcs
```

## Conditional writing

You can print text conditionaly, depending on precise conditions. Using the previous variables, we can do, for example:

```
<%
if (offer == "accepted") {
%>

You did accept the offer when you had the choice.

<%
}
%>
```

**Note** the double `=` sign, the opening `{` and the corresponding closing `}`. In this example, the text will only be printed if the variable `offer` contains the value `"accepted"`.

An other example, here using the `<` operator:

```
<%
if (count < 50) {
%>

You didn't kill enough orcs to satisfy the master.

<%
}
%>
```

## Functions

Most of the interactions with **Adventures** is done through functions. A function has a *name*, and you give to it *arguments* when you call it. For example, to give money to the player, you would write:

```
You get some gold in the purse of the soldier

<%
character.addGold(45);
%>
```

In this case, you call the function `character.addGold` is the name of the function, and `45` is the argument you give to it.

The following sections of the documentation describe the different functions you can use to manage your story.