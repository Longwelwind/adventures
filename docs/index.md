---
layout: default
title: "Jekyll Docs Template"
---

### What is Adventure

**Adventures** is a custom story format for [Twine 2](https://twinery.org/) that allows writers to add RPG elements such as health, items, golds and more to their story.

![Demo of Adventures]({{ site.url }}/assets/home-demo.gif)

### Requirements

**Adventures** is based on [klembot's Snowman 2](https://bitbucket.org/klembot/snowman-2). The content of the passages of processed by [lodash's _.template function](https://lodash.com/docs/4.17.4#template), which allows you to execute Javascript scripts inside the `<% %>` tags, and print dynamic valeus using the `<%= %>` tags.

For example, the passage:

```
<%
var name = "Arthas";
%>

The old pirate greeted you: "Ahoy, you must be <%= name %>" !
```

Would become, once in the story: `The old pirate greeted you: "Ahoy, you must be Arthas" !`

It is recommended to know a bit of Javascript, but it is not mandatory. Most function calls are easily understandable and can be copy/pasted from the docs.