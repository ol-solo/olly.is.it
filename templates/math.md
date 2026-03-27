<%*
let sel = tp.file.selection() || "";

// убираем переносы по краям
sel = sel.trim();

// если строка выглядит как XX (две одинаковые половины) — оставляем одну
// пример: "f(n)=n2f(n)=n2" → "f(n)=n2"
if (sel.length % 2 === 0) {
  const half = sel.length / 2;
  const first = sel.slice(0, half);
  const second = sel.slice(half);
  if (first === second) sel = first;
}

// итог: оборачиваем в $...$
tR = `$${sel}$`;
%>