---
layout: page
title: "Installing"
category: basic-usage
date: 2017-08-07 21:06:05
---

To install **Adventures** in Twine 2, click `Formats` in the main menu, then `Add a New Format` and paste the url below into the box. Finally, click `Add`.

```
https://raw.githubusercontent.com/Longwelwind/adventures/master/dist/format.js
```

You can now create new story or edit an existing one and change the story format for your story.

**Note:** If you're using the web version of Twine 2 (inside your browser), you may run into an error. Try to use the Windows/Linux/OSX version instead!

### Interactions

**Adventures** is based on [klembot's Snowman 2](https://bitbucket.org/klembot/snowman-2). The content of the passages are processed by [lodash's _.template function](https://lodash.com/docs/4.17.4#template), which allows you to execute Javascript scripts inside the `<% %>` tags, and print dynamic values using the `<%= %>` tags.

For example, the passage:

```
<%
var name = "Arthas";
%>

The old pirate greeted you: "Ahoy, you must be <%= name %>" !
```

Would become, once in the story: `The old pirate greeted you: "Ahoy, you must be Arthas" !`.

You can also conditionaly print content using the classic `if` Javascript structure:

```
Along the road, you stumble upon a group of bandits

<% if (character.money >= 100) { %>

They notice that your purse seems to be quite heavy

<% } %>
```



