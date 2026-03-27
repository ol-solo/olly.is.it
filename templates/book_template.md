<%*
let title = tp.file.title
if (title.startsWith("Untitled")) {
  title = await tp.system.prompt("Title");
}
await tp.file.rename(title)
-%>---
type: book
aliases:
  - "& <%* tR += title %>"
cover: {{coverUrl}}
start:
end:
status: todo
tags: []
parent: [[books]]
BC-list-note-field: "children"
BC-list-note-neighbour-field: "next"
category:
author: [[{{author}}]]
url:
---
NOTES

- [[Заметка по книге 1]]
- [[Заметка по книге 2]]
- [[Заметка по книге 3]]

<% tp.file.cursor(0) %>

