// file: Templater/scripts/update_course_nav.js
module.exports = async function (tp) {
  const app = tp.app;
  const course = tp.file.find_tfile(tp.file.path(true));   // текущая заметка — это курс

  // 1. читаем содержимое курса и вытаскиваем список всех [[уроков]]
  const courseContent = await app.vault.read(course);
  const linkRegex = /\[\[([^\]]+)\]\]/g;
  let match;
  const children = [];
  while ((match = linkRegex.exec(courseContent)) !== null) {
    children.push(match[1]);
  }
  if (!children.length) return;

  // 2. для каждой дочерней заметки вычисляем prev/next и пишем во фронтматтер
  for (let i = 0; i < children.length; i++) {
    const name = children[i];
    const prevName = i > 0 ? children[i - 1] : null;
    const nextName = i < children.length - 1 ? children[i + 1] : null;

    const childFile = app.metadataCache.getFirstLinkpathDest(name, course.path);
    if (!childFile) continue;

    await app.fileManager.processFrontMatter(childFile, fm => {
      if (prevName) fm["prev"] = `[[${prevName}]]`; else delete fm["prev"];
      if (nextName) fm["next"] = `[[${nextName}]]`; else delete fm["next"];
    });
  }
};
