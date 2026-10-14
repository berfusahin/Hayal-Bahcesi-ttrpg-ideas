import fs from "node:fs";
import { HtmlBasePlugin } from "@11ty/eleventy";
import markdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import { slug } from "./lib/slug.js";

export default function (eleventyConfig) {
    // ── Markdown ─────────────────────────────────────────────
    // breaks: a single Enter becomes a line break (useful for poems).
    // html: plain HTML is still allowed inside .md files when you need it.
    const md = markdownIt({ html: true, breaks: true, linkify: false })
        .use(markdownItAnchor, { slugify: slug, level: [2, 3] });
    eleventyConfig.setLibrary("md", md);

    // Turns markdown into HTML without blank lines, so the outer markdown
    // pass leaves the shortcode output alone.
    const renderBlock = (content) => md.render(content.trim()).replace(/\n\s*\n/g, "\n");

    // ── Lore shortcodes ──────────────────────────────────────
    // {% panel %} ... {% endpanel %}                      → paper panel
    // {% panel "assets/Sunara.png" %} ... {% endpanel %}  → picture on the left, text on the right
    eleventyConfig.addPairedShortcode("panel", (content, image, alt) => {
        const body = `<div class="lore-panel">${renderBlock(content)}</div>`;
        if (!image) return body;
        const altText = alt || image.split("/").pop().replace(/\.[^.]+$/, "");
        return `<div class="lore-split"><figure class="lore-figure"><img src="${image}" alt="${altText}" class="zoomable"></figure>${body}</div>`;
    });
    // {% note %} ... {% endnote %} → highlighted side note
    eleventyConfig.addPairedShortcode("note", (content) =>
        `<aside class="lore-note">${renderBlock(content)}</aside>`);

    // ── Files copied as they are ─────────────────────────────
    eleventyConfig.addPassthroughCopy("src/assets");
    // Character pictures and theme.css. (Copied as a folder with a filter rather than a
    // "src/characters/**/*.png" pattern: that pattern stops the dev server from noticing
    // edits to .md files in the same folders.)
    eleventyConfig.addPassthroughCopy("src/characters", {
        filter: ["**/*.{png,jpg,jpeg,jfif,webp,gif,svg,avif,css}", "**/*.{PNG,JPG,JPEG,JFIF,WEBP,GIF,SVG,AVIF,CSS}"]
    });

    // ── Collections ──────────────────────────────────────────
    const byPath = (a, b) => a.inputPath.localeCompare(b.inputPath, "tr", { numeric: true });

    // Every src/characters/<name>/index.md is a character profile.
    eleventyConfig.addCollection("characters", (api) =>
        api.getFilteredByGlob("src/characters/*/index.md").sort((a, b) =>
            (a.data.order ?? 999) - (b.data.order ?? 999) || a.data.name.localeCompare(b.data.name, "tr")));

    // Every src/characters/<name>/<folder>/<file>.md is a story (chapter, poem, session...).
    eleventyConfig.addCollection("stories", (api) =>
        api.getFilteredByGlob("src/characters/*/*/*.md")
            .filter((item) => !item.inputPath.includes("/assets/"))
            .sort(byPath));

    // ── Filters ──────────────────────────────────────────────
    eleventyConfig.addFilter("profileFor", (profiles, id) =>
        profiles.find((item) => item.data.characterId === id));

    // Groups a character's stories by folder, in the order given in the profile's `categories`.
    eleventyConfig.addFilter("storyGroups", (stories, id, labels = {}) => {
        const groups = new Map(Object.keys(labels).map((key) => [key, []]));
        for (const story of stories) {
            if (story.data.characterId !== id) continue;
            const key = story.data.storyCategory;
            if (!groups.has(key)) groups.set(key, []);
            groups.get(key).push(story);
        }
        return [...groups]
            .filter(([, items]) => items.length)
            .map(([key, items]) => ({ key, label: labels[key] || key, stories: items }));
    });

    eleventyConfig.addFilter("findBy", (items = [], key, value) =>
        items.find((item) => item[key] === value));

    eleventyConfig.addFilter("neighbours", (items, url) => {
        const index = items.findIndex((item) => item.url === url);
        return { previous: items[index - 1], next: items[index + 1] };
    });

    eleventyConfig.addFilter("readingMinutes", (html = "") =>
        Math.max(1, Math.round(html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length / 180)));

    // Builds the "Bu sayfada" list from the h2 headings of a rendered page.
    eleventyConfig.addFilter("tableOfContents", (html = "") =>
        [...html.matchAll(/<h2[^>]*\bid="([^"]+)"[^>]*>([\s\S]*?)<\/h2>/g)].map(([, id, label]) => ({
            id,
            label: label.replace(/<[^>]+>/g, "").replace(/✨/g, "").trim()
        })));

    eleventyConfig.addFilter("fileExists", (path) => fs.existsSync(path));

    // ── Small HTML fixes after every page is built ───────────
    eleventyConfig.addTransform("character-assets", function (content) {
        if (!(this.page.outputPath || "").endsWith(".html")) return content;

        // Inside a character folder, "assets/..." always means that character's assets
        // folder, even on chapter pages that live deeper in the site.
        const match = this.page.inputPath.match(/src\/characters\/([^/]+)\//);
        if (match && this.page.url) {
            const root = `/characters/${match[1]}/`;
            const depth = this.page.url.split("/").filter(Boolean).length - root.split("/").filter(Boolean).length;
            if (depth > 0) {
                content = content.replace(/(src|href)="assets\//g, `$1="${"../".repeat(depth)}assets/`);
            }
        }

        // Pictures load only when you scroll to them.
        return content.replace(/<img(?![^>]*\bloading=)/g, '<img loading="lazy" decoding="async"');
    });

    // Lets the site live in a sub-folder later (e.g. GitHub Pages): PATH_PREFIX=/hayal-bahcesi/
    eleventyConfig.addPlugin(HtmlBasePlugin);

    return {
        dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
        markdownTemplateEngine: "njk",
        htmlTemplateEngine: "njk",
        pathPrefix: process.env.PATH_PREFIX || "/"
    };
}
