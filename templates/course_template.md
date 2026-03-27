<%*
let title = tp.file.title
if (title.startsWith("Untitled")) {
  title = await tp.system.prompt("Название курса");
}
await tp.file.rename(title)
-%>---
type: course
aliases:
  - "№ <%* tR += title %>"
status: todo
tags: []
category: [[courses]]
BC-list-note-field: "children"
BC-list-note-neighbour-field: "next"
url:
---

NOTES

- [[Конспект 1]]
- [[Конспект 2]]
- [[Конспект 3]]

<% tp.file.cursor(0) %>