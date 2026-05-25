<%*
let cardTitle = tp.file.title;
if (cardTitle.startsWith("Untitled")) {
  cardTitle = await tp.system.prompt("Title", "SR - ");
}
await tp.file.rename(cardTitle);

const files = app.vault.getMarkdownFiles();
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

let parentName = "";
if (sourceFm.parent) {
  parentName = String(sourceFm.parent).replace(/^\\[\\[/, "").replace(/\\]\\]$/, "");
}

let mocName = "";
if (sourceFm.moc) {
  mocName = String(sourceFm.moc).replace(/^\\[\\[/, "").replace(/\\]\\]$/, "");
}
if (!mocName) {
  mocName = await tp.system.prompt("Имя MOC", `MOC - ${parentName}`);
}

// обновляем поля в исходном конспекте
await app.fileManager.processFrontMatter(sourceFile, fm => {
  fm["sr"] = `[[flashcards/${cardTitle}]]`;
  fm["moc"] = `[[${mocName}]]`;
});
-%>
---
type: note
aliases: []
tags: []
parent: [[<%* tR += parentName %>]]
source: [[<%* tR += sourceName %>]]
moc: [[<%* tR += mocName %>]]
next:
prev:
---

## Навигация
- Исходный конспект: [[<%* tR += sourceName %>]]
- Карта темы: [[<%* tR += mocName %>]]

## Карточки

<% tp.file.cursor(0) %>