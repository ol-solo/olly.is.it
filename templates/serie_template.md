<%*
let title = tp.file.title
if (title.startsWith("Untitled")) {
title = await tp.system.prompt("Title");
}
await tp.file.rename(title)
-%>---
type: serie
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

- [[Заметка о сериале 1]]
- [[Заметка о сериале 2]]
- [[Заметка о сериале 3]]


<% tp.file.cursor(0) %>