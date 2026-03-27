<%*
let title = tp.file.title;
if (title.startsWith("Untitled")) {
  title = await tp.system.prompt("Title");
}
await tp.file.rename(title);

// получаем файлы проектов
const files = app.vault.getMarkdownFiles();
const projectFiles = files.filter(f => {
  const cache = app.metadataCache.getFileCache(f);
  const fm = cache && cache.frontmatter ? cache.frontmatter : {};
  return ["course", "book", "movie", "article"].includes(fm.type);
});

const names = projectFiles.map(f => f.basename);
const paths = projectFiles.map(f => f.path);

// выбираем родителя
const chosenPath = await tp.system.suggester(names, paths, false, "Выбери родителя");
const parentFile = tp.file.find_tfile(chosenPath);
const parentName = parentFile.basename;
-%>---
type: note
aliases:
  - "? <%* tR += title %>"
tags: []
parent: [[<%* tR += parentName %>]]
next:
prev:
---

<% tp.file.cursor(0) %>

<%*
/**
 * Дописываем ссылку в родительский курс в КОНЕЦ списка NOTES
 */
let parentContent = await app.vault.read(parentFile);

// ищем заголовок NOTES
const notesHeader = "NOTES";
const notesIndex = parentContent.indexOf(notesHeader);

if (notesIndex !== -1) {
  // всё после заголовка NOTES
  const afterNotes = parentContent.slice(notesIndex);

  // регэксп всех строк списка вида "- [[...]]"
  const listRegex = /^- \[\[.*\]\].*$/gm;
  let match;
  let lastMatchEnd = null;

  while ((match = listRegex.exec(afterNotes)) !== null) {
    // позиция конца последнего совпадения относительно afterNotes
    lastMatchEnd = match.index + match[0].length;
  }

  let insertPos;
  if (lastMatchEnd !== null) {
    // есть хотя бы один пункт — вставляем после него
    insertPos = notesIndex + lastMatchEnd;
  } else {
    // пунктов нет — вставляем сразу после заголовка NOTES
    const nlIdx = parentContent.indexOf("\n", notesIndex);
    insertPos = nlIdx === -1 ? parentContent.length : nlIdx + 1;
  }

  const prefix = parentContent.slice(0, insertPos);
  const suffix = parentContent.slice(insertPos);

  const needsNewline = prefix.endsWith("\n") ? "" : "\n";
  const linkLine = `${needsNewline}- [[${title}]]\n`;

  parentContent = prefix + linkLine + suffix;

  await app.vault.modify(parentFile, parentContent);
}
-%>
