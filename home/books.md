---
type: book
aliases: "&"
---
%%cssClass: cards%%

## В процессе
```dataview
TABLE WITHOUT ID
	("![|80](" + cover + ")") as "Обложка",
	file.link AS "Название",
	join(author, ", ") AS "Автор(ы)",
	start AS "Начал",
	join(category, ", ") AS "Категория"
FROM !"templates"
WHERE type = "book" AND status = "wip"
```

## Ожидают прочтения
```dataview
TABLE WITHOUT ID
	("![|80](" + cover + ")") as "Обложка",
	file.link AS "Название",
	join(author, ", ") as "Автор(ы)",
	join(category, ", ") AS "Категория"
FROM !"templates"
WHERE type = "book" AND status = "todo"
```

## Завершённые
```dataview
TABLE WITHOUT ID
	("![|80](" + cover + ")") as "Обложка",
	file.link AS "Название",
	join(author, ", ") AS "Автор(ы)",
	start AS "Начал",
	end AS "Закончил",
	join(category, ", ") AS "Категория"
FROM !"templates"
WHERE type = "book" AND status = "done"
```
