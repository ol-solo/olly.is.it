---
type: movie
aliases: "%"
---
%%cssClass: cards%%
## В процессе
```dataview
TABLE WITHOUT ID
	("![|80](" + cover + ")") as "Обложка",
	file.link AS "Название",
	author AS "Режиссёр",
	join(category, ", ") AS "Категория"
FROM !"templates"
WHERE type = "movie" AND status = "wip"
```
## Ожидают просмотра
```dataview
TABLE WITHOUT ID
	("![|80](" + cover + ")") as "Обложка",
	file.link AS "Название",
	author AS "Режиссёр",
	join(category, ", ") AS "Категория"
FROM !"templates"
WHERE type = "movie" AND status = "todo"
```
## Завершённые
```dataview
TABLE WITHOUT ID
	("![|80](" + cover + ")") as "Обложка",
	file.link AS "Название",
	author AS "Режиссёр",
	join(category, ", ") AS "Категория"
FROM !"templates"
WHERE type = "movie" AND status = "done"
```