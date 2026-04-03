<%*
let sel = tp.file.selection() || "";
const lang = "python";

sel = sel.replace(/\r\n/g, "\n");
sel = sel.replace(/\n\n+/g, "\n\n");
sel = sel.trim();

tR = "```" + lang + "\n" + sel + "\n```";
%>