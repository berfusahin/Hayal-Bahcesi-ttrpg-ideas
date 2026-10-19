import fs from "node:fs";
import path from "node:path";
import markdownIt from "markdown-it";

// The posts on the main page: every .md file in src/posts/, newest first.
// The form (npm start) writes them for you, but you can also make one by hand:
//
//   src/posts/2026-10-19-214000.md
//   ---
//   date: 2026-10-19T21:40:00+03:00
//   ---
//
//   What you want to say. *Markdown* works, a single Enter is a new line.
//
// Without a `date:` line the file's last-change time is used.
const DIR = "src/posts";
const md = markdownIt({ html: true, breaks: true, linkify: true });

function readPost(file) {
    const full = path.join(DIR, file);
    const text = fs.readFileSync(full, "utf8").replace(/^﻿/, "").replace(/\r\n/g, "\n");
    const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    const frontMatter = match ? match[1] : "";
    const body = (match ? match[2] : text).trim();
    const dateLine = frontMatter.match(/^date:\s*["']?(.+?)["']?\s*$/m);
    const date = dateLine && Number.isFinite(Date.parse(dateLine[1])) ? new Date(dateLine[1]) : fs.statSync(full).mtime;
    return { id: file.replace(/\.md$/, ""), date, iso: date.toISOString(), html: md.render(body) };
}

// A function, so the folder is read again on every rebuild (new posts show up right away).
export default function () {
    if (!fs.existsSync(DIR)) return [];
    return fs.readdirSync(DIR)
        .filter((file) => file.endsWith(".md"))
        .map(readPost)
        .filter((post) => post.html.trim())
        .sort((a, b) => b.date - a.date);
}
