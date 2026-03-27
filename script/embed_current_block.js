// embed_current_block.js
module.exports = async function (tp) {
  const app = tp.app;
  const file = tp.file.find_tfile(tp.file.path(true));
  if (!file) return;

  // читаем весь текст файла
  const content = await app.vault.read(file);

  // ищем строку под курсором, Templater даёт её как tp.file.cursor()
  const cur = tp.file.cursor(); // объект { line, ch } в последней версии
  const lines = content.split("\n");
  const lineIndex = cur.line ?? 0;
  let line = lines[lineIndex];

  // если строки нет (например, курсор в конце файла) — выходим
  if (line == null) return;

  // ищем существующий блок‑id
  let m = line.match(/\^([a-zA-Z0-9\-]+)\s*$/);
  let id;
  if (m) {
    id = m[1];
  } else {
    id = "blk-" + Date.now().toString(36);
    line = line.replace(/\s*$/, "") + " ^" + id;
    lines[lineIndex] = line;
  }

  // вставляем embed‑ссылку строкой ниже
  const link = `![[${file.basename}#^${id}]]`;
  lines.splice(lineIndex + 1, 0, link, ""); // пустая строка после embed

  const newContent = lines.join("\n");
  await app.vault.modify(file, newContent);
};
