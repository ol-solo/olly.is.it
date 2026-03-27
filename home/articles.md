---
type: article
aliases: ";"

---

## В процессе
```dataview
TABLE WITHOUT ID
	file.link AS "Название",
	join(category, ", ") AS "Категория"
FROM !"templates"
WHERE type = "article" AND status = "wip"
```
## Ожидают прочтения
```dataview
TABLE WITHOUT ID
	file.link AS "Название",
	join(category, ", ") AS "Категория"
FROM !"templates"
WHERE type = "article" AND status = "todo"
```
## Завершённые
```dataview
TABLE WITHOUT ID
	file.link AS "Название",
	join(category, ", ") AS "Категория"
FROM !"templates"
WHERE type = "article" AND status = "done"
```