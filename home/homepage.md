---
cssclasses:
  - dashboard
---
## Навигация
[[courses]]
[[articles]]
[[books]]
[[movies]]
[[series]]
[[other]]

## Buttons
```button
name 🏫 new course
type note(My New Note, tab) template
action course_template
templater true
prompt true
```
^button-3dsv
```button
name 📕 new book
type note(My New Note, tab) template
action book_template
templater true
folder projects/books
prompt true
```
^button-c0ks
```button
name 📽️ new movie
type note(My New Note, tab) template
action movie_template
templater true
folder projects/movies
prompt true
```
^button-vulv
```button
name 📺 new series
type note(My New Note, tab) template
action serie_template
templater true
folder projects/series
prompt true
```
^button-r8a8
```button
name 📝 new note
type note(My New Note, tab) template
action note_template
templater true
folder /
prompt true
```
^button-cgwz

---
## В процессе
```dataview
TABLE WITHOUT ID
	file.link AS "Название",
	type AS "Тип"
FROM !"templates"
WHERE status = "wip"
SORT file.mday DESC
```

---
## Новое
```dataview
TABLE WITHOUT ID
	file.link AS "Название",
	type AS "Тип"
FROM !"templates"
WHERE status = "todo"
SORT file.mday DESC
```
