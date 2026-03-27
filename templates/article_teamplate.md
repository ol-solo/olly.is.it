<%*
let title = tp.file.title
if (title.startsWith("Untitled")) {
  title = await tp.system.prompt("Title");
}
await tp.file.rename(title)
-%>---
type: article
aliases:
  - "; <%* tR += title %>"
status: todo
tags: []
parent: [[articles]]
prev:
next:
category:
url:
---
___

<% tp.file.cursor(0) %>
