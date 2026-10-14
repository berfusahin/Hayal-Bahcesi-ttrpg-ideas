import fs from "node:fs";
import { slug } from "../../lib/slug.js";

// Works out, from where a file sits, which character it belongs to and what kind of page it is:
//   characters/claween/index.md               → profile
//   characters/claween/bolumler/01-x.md       → story in the "bolumler" category
const parts = (data) => data.page.inputPath.split("/src/characters/")[1]?.split("/") ?? [];

export default {
    layout: "character.njk",
    eleventyComputed: {
        characterId: (data) => parts(data)[0],
        pageKind: (data) => (parts(data).length === 2 ? "profile" : "story"),
        storyCategory: (data) => (parts(data).length === 3 ? parts(data)[1] : undefined),
        hasThemeCss: (data) => fs.existsSync(`src/characters/${parts(data)[0]}/theme.css`),
        title: (data) => data.title || data.name || data.page.fileSlug.replace(/^\d+[-_ ]*/, "").replace(/[-_]/g, " "),
        permalink: (data) => {
            const p = parts(data);
            if (p.length !== 3) return data.permalink;
            return `/characters/${p[0]}/${slug(p[1])}/${slug(data.page.fileSlug)}/`;
        }
    }
};
