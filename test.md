---
type: note
aliases:
  - "<% tp.file.title %>"
status: todo
tags:
parent:
  - <% tp.system.suggester(app.vault.getMarkdownFiles().map(f => f.basename), "Выбери курс") %>
url:
next:
prev:
---

<%*
const file = tp.file.find_tfile(tp.file.path(true));

// 1. Читаем parent из фронтматтера текущей заметки
let parent = tp.frontmatter?.parent;
if (Array.isArray(parent)) parent = parent[0];
if (!parent) return;

// parent может быть вида "- Имя курса" или "[[Имя курса]]"
parent = String(parent)
  .replace(/^\-\s*/, "")
  .replace(/^\[\[/, "")
  .replace(/\]\]$/, "");

// 2. Находим файл курса
const course = app.metadataCache.getFirstLinkpathDest(parent, file.path);
if (!course) return;

// 3. Читаем содержимое курса и строим список уроков по ссылкам [[...]]
const courseContent = await app.vault.read(course);
const linkRegex = /\[\[([^\]]+)\]\]/g;
let match;
const children = [];
while ((match = linkRegex.exec(courseContent)) !== null) {
  children.push(match[1]);
}

// 4. Находим позицию текущей заметки
const thisName = file.basename;
const idx = children.findIndex(n => n === thisName || n.endsWith("/" + thisName));
if (idx === -1) return;

// 5. Определяем prev/next
const prevName = idx > 0 ? children[idx-1] : null;
const nextName = idx < children.length-1 ? children[idx+1] : null;

// 6. Записываем во фронтматтер текущей заметки
await app.fileManager.processFrontMatter(file, fm => {
  if (prevName) fm["prev"] = `[[${prevName}]]`;
  if (nextName) fm["next"] = `[[${nextName}]]`;
});
%>
