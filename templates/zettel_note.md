<%*
let title = tp.file.title;
if (title.startsWith("Untitled")) {
title = await tp.system.prompt("Title");
}
if (!title) throw new Error("Title is required");

const files = app.vault.getMarkdownFiles();
const projectFiles = files.filter(f => {
const cache = app.metadataCache.getFileCache(f);
const fm = cache && cache.frontmatter ? cache.frontmatter : {};
return ["course", "book", "movie", "article"].includes(fm.type);
});

const names = projectFiles.map(f => f.basename);
const paths = projectFiles.map(f => f.path);
const chosenPath = await tp.system.suggester(names, paths, false, "Выбери родителя");
if (!chosenPath) throw new Error("Parent was not selected");

const parentFile = tp.file.find_tfile(chosenPath);
if (!parentFile) throw new Error("Parent file not found");
const parentName = parentFile.basename;

const srNote = await tp.system.prompt("Имя заметки с карточками", SR - ${title});
if (!srNote) throw new Error("SR note name is required");

const mocNote = await tp.system.prompt("Имя MOC", MOC - ${parentName});
if (!mocNote) throw new Error("MOC note name is required");

const flashcardsFolder = "flashcards";
const currentFile = tp.config.target_file;
if (currentFile && currentFile.basename !== title) {
await tp.file.rename(title);
}

if (!app.vault.getAbstractFileByPath(flashcardsFolder)) {
await app.vault.createFolder(flashcardsFolder);
}

const srPath = ${flashcardsFolder}/${srNote}.md;
if (!app.vault.getAbstractFileByPath(srPath)) {
const srContent = [
'---',
'type: note',
'aliases: []',
'tags: []',
parent: [[${parentName}]],
source: [[${title}]],
moc: [[${mocNote}]],
'next:',
'prev:',
'---',
'',
'## Навигация',
- Исходный конспект: [[${title}]],
- Карта темы: [[${mocNote}]],
'',
'## Карточки',
''
].join('\n');
await app.vault.create(srPath, srContent);
}

let parentContent = await app.vault.read(parentFile);
const notesHeader = 'NOTES';
const notesIndex = parentContent.indexOf(notesHeader);
if (notesIndex !== -1 && !parentContent.includes([[${title}]])) {
const afterNotes = parentContent.slice(notesIndex);
const listRegex = /^- .∗.∗.*$/gm;
let match;
let lastMatchEnd = null;
while ((match = listRegex.exec(afterNotes)) !== null) {
lastMatchEnd = match.index + match.length;
}

let insertPos;
if (lastMatchEnd !== null) {
insertPos = notesIndex + lastMatchEnd;
} else {
const nlIdx = parentContent.indexOf('\n', notesIndex);
insertPos = nlIdx === -1 ? parentContent.length : nlIdx + 1;
}

const prefix = parentContent.slice(0, insertPos);
const suffix = parentContent.slice(insertPos);
const needsNewline = prefix.endsWith('\n') ? '' : '\n';
const linkLine = ${needsNewline}- [[${title}]]\n;
parentContent = prefix + linkLine + suffix;
await app.vault.modify(parentFile, parentContent);
}

tR += `---
type: note
aliases:

    "? ${title}"
    tags: []
    parent: [[${parentName}]]
    sr: [[flashcards/${srNote}]]
    moc: [[${mocNote}]]
    next:
    prev:

Навигация

    Карточки для повторения: [[flashcards/${srNote}]]

    Карта темы: [[${mocNote}]]

${tp.file.cursor(0)}`;
-%>