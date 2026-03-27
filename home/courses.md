---
type: course
aliases: №
next: "[[Дополнительные материалы]]"
---
```button
name 🏫 new course
type note(My New Note, tab) template
action course_template
templater true
prompt true
```
^button-hgob

## В процессе
**status:** ==wip== *(work in progress)*

```dataview
TABLE WITHOUT ID
	file.link AS "Название",
	join(category, ", ") AS "Категория"
FROM !"templates"
WHERE type = "course" AND status = "wip"
```

## Ожидают прохождения
**status:** ==todo==

```dataview
TABLE WITHOUT ID
	file.link AS "Название",
	join(category, ", ") AS "Категория"
FROM !"templates"
WHERE type = "course" AND status = "todo"
```

## Завершённые
**status:** ==done==

```dataview
TABLE WITHOUT ID
	file.link AS "Название",
	join(category, ", ") AS "Категория"
FROM !"templates"
WHERE type = "course" AND status = "done"
```