import fs from "node:fs";
import path from "node:path";

// Lets the "Paylaşım Yap!" form on your own computer (npm start) save posts as files in
// src/posts/. It only exists in the dev server; the built site has no form and no way to post.
//   POST   /__posts          {"content": "...", "createdAt": "<optional ISO date>"} → new file
//   DELETE /__posts/<name>   → deletes src/posts/<name>.md
export const POSTS_DIR = "src/posts";
const POSTS_DATA_FILE = "src/_data/posts.js";
const MAX_LENGTH = 5000;
const LOOPBACK = new Set(["127.0.0.1", "::1", "::ffff:127.0.0.1"]);

function send(res, status, body) {
    res.statusCode = status;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(JSON.stringify(body));
}

function readBody(req) {
    return new Promise((resolve, reject) => {
        let data = "";
        req.setEncoding("utf8");
        req.on("data", (chunk) => {
            data += chunk;
            if (data.length > MAX_LENGTH * 4) reject(new Error("too large"));
        });
        req.on("end", () => resolve(data));
        req.on("error", reject);
    });
}

// 2026-10-19T21:40:05.123Z → 2026-10-19-214005 (one file per second, a suffix if it's taken)
function newFileName(date) {
    const base = date.toISOString().slice(0, 19).replace(/[-:]/g, "").replace(/^(\d{4})(\d{2})(\d{2})T/, "$1-$2-$3-");
    let name = base;
    for (let i = 2; fs.existsSync(path.join(POSTS_DIR, `${name}.md`)); i++) name = `${base}-${i}`;
    return name;
}

export async function postsApi(req, res, next) {
    const url = new URL(req.url, "http://localhost");
    if (!url.pathname.startsWith("/__posts")) return next();

    // Only your own browser on this computer, and only from the site's own pages: the custom
    // header can't be sent by other websites without a CORS permission this server never gives.
    if (!LOOPBACK.has(req.socket.remoteAddress) || req.headers["x-hayal-bahcesi"] !== "1") {
        return send(res, 403, { error: "forbidden" });
    }

    try {
        if (req.method === "POST" && url.pathname === "/__posts") {
            const { content, createdAt } = JSON.parse(await readBody(req));
            const text = typeof content === "string" ? content.replace(/\r\n/g, "\n").trim() : "";
            if (!text || text.length > MAX_LENGTH) return send(res, 400, { error: "invalid content" });
            const date = createdAt && Number.isFinite(Date.parse(createdAt)) ? new Date(createdAt) : new Date();

            fs.mkdirSync(POSTS_DIR, { recursive: true });
            const name = newFileName(date);
            fs.writeFileSync(path.join(POSTS_DIR, `${name}.md`), `---\ndate: ${date.toISOString()}\n---\n\n${text}\n`, "utf8");
            return send(res, 201, { name });
        }

        const match = url.pathname.match(/^\/__posts\/([\w-]+)$/);
        if (req.method === "DELETE" && match) {
            const file = path.join(POSTS_DIR, `${match[1]}.md`);
            if (!fs.existsSync(file)) return send(res, 404, { error: "not found" });
            fs.unlinkSync(file);
            // Eleventy doesn't rebuild when a file is deleted; touching the posts data file does it.
            const now = new Date();
            fs.utimesSync(POSTS_DATA_FILE, now, now);
            return send(res, 200, { deleted: match[1] });
        }

        return send(res, 405, { error: "method not allowed" });
    } catch (error) {
        console.error("[posts]", error);
        return send(res, 400, { error: "bad request" });
    }
}
