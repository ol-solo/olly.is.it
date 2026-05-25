<%*
const files = app.vault.getMarkdownFiles();

// 1. выбираем исходный конспект
const noteFiles = files.filter(f => {
  const cache = app.metadataCache.getFileCache(f);
  const fm = cache && cache.frontmatter ? cache.frontmatter : {};
  return fm.type === "note";
});

const noteNames = noteFiles.map(f => f.basename);
const notePaths = noteFiles.map(f => f.path);

const chosenSourcePath = await tp.system.suggester(noteNames, notePaths, false, "Выбери конспект");
const sourceFile = tp.file.find_tfile(chosenSourcePath);
const sourceName = sourceFile.basename;

const sourceCache = app.metadataCache.getFileCache(sourceFile);
const sourceFm = sourceCache?.frontmatter ?? {};

// 2. выбираем course/MOC-заметку
const courseFiles = files.filter(f => {
  const cache = app.metadataCache.getFileCache(f);
  const fm = cache && cache.frontmatter ? cache.frontmatter : {};
  return fm.type === "course";
});

const courseNames = courseFiles.map(f => f.basename);
const coursePaths = courseFiles.map(f => f.path);

const chosenCoursePath = await tp.system.suggester(courseNames, coursePaths, false, "Выбери MOC / курс");
const courseFile = tp.file.find_tfile(chosenCoursePath);
const courseName = courseFile.basename;

// 3. parent берём из source, если есть, иначе из выбранного курса
let parentName = "";
if (sourceFm.parent) {
  parentName = String(sourceFm.parent).replace(/^\\[\\[/, "").replace(/\\]\\]$/, "");
}
if (!parentName) {
  parentName = courseName;
}

// 4. имя карточки строим автоматически
const cardTitle = `SR - ${sourceName}`;
await tp.file.rename(cardTitle);

// 5. обновляем поля исходного конспекта
await app.fileManager.processFrontMatter(sourceFile, fm => {
  fm["sr"] = `[[flashcards/${cardTitle}]]`;
  fm["moc"] = `[[${courseName}]]`;
});
-%>
---
type: note
aliases: []
tags: []
parent: [[<%* tR += parentName %>]]
source: [[<%* tR += sourceName %>]]
moc: [[<%* tR += courseName %>]]
next:
prev:
---

# Навигация
- Исходный конспект: [[<%* tR += sourceName %>]]
- Карта темы: [[<%* tR += courseName %>]]

# Карточки

<% tp.file.cursor(0) %>