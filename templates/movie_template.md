<%*
let title = tp.file.title
if (title.startsWith("Untitled")) {
  title = await tp.system.prompt("Название курса");
}
await tp.file.rename(title)
-%>---
type: movie
aliases:
  - "% <%* tR += title %>"
cover: {{posterUrl}}
country: {{countries}}
genres: {{genres}}
status: todo
tags: []
parent: [[movies]]
BC-list-note-field: "children"
BC-list-note-neighbour-field: "next"
author: [[{{director}}]]
description: "{{description}}"
---
NOTES

- [[Заметка о фильме 1]]
- [[Заметка о фильме 2]]
- [[Заметка о фильме 3]]

<% tp.file.cursor(0) %>