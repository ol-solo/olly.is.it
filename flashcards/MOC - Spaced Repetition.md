# MOC - Spaced Repetition

## Активные SRS-заметки
```dataview
TABLE file.link AS Note, file.tags AS Tags, file.mtime AS Updated
FROM ""
WHERE contains(file.tags, "#flashcards")
SORT file.mtime DESC
```

## Новые заметки для первичного обзора
```dataview
TABLE file.link AS Note, file.ctime AS Created
FROM ""
WHERE contains(file.tags, "#flashcards/review/new-notes")
SORT file.ctime DESC
```

## Концептуальные деки
```dataview
LIST
FROM ""
WHERE contains(file.tags, "#flashcards/concepts")
SORT file.name ASC
```

## Связующие карточки
```dataview
LIST
FROM ""
WHERE contains(file.tags, "#flashcards/links")
SORT file.name ASC
```