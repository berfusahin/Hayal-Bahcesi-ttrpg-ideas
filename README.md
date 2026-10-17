# Hayal Bahçesi

My TTRPG characters, their lore and session stories, built with [Eleventy](https://www.11ty.dev/).

## Running it

You need [Node.js](https://nodejs.org/) (the LTS version) installed once.

```
npm install      ← only the first time
npm start        ← while writing
```

`npm start` prints a link (usually http://localhost:8080). Open it in your browser. Every time you
save a file, the page updates by itself. Press `Ctrl + C` in the terminal to stop.

`npm install` may say something like "x high severity vulnerabilities". Those are in the tools
used for building and they don't end up in your site. Don't run `npm audit fix --force`, because it
downgrades Eleventy and breaks things.

## Where things live

```
src/
  characters/
    claween/
      index.md          ← profile: card info, stats, colours, lore
      theme.css         ← optional extra styling just for this character
      assets/           ← her pictures
      bolumler/         ← one file per chapter / session
        01-zindandan-kacis.md
      siirler/          ← one file per poem
  _data/
    site.js             ← site title, menu, main page texts
    upcomingCharacters.js ← the "yakında" cards
  assets/               ← site-wide CSS, scripts, logo
```

Everything outside `src/` is setup; you won't need to touch it. The finished site is built into
`_site/`. Don't edit that folder, because it's overwritten on every build.

## Adding a session or chapter

Make a new file in the category folder, e.g. `src/characters/claween/bolumler/02-ormanda.md`:

```markdown
---
title: "Bölüm 2: Ormanda"
---

Claween gözlerini açtığında **zindan** çoktan arkada kalmıştı.

Barathur yine şarkı söylüyordu...
```

- The number at the start of the file name sets the order (01, 02, ... 10 sorts correctly).
- If you skip `title`, the file name is used: `02-ormanda.md` → "ormanda".
- Turkish letters and spaces in file names are fine; the web address is cleaned up automatically.
- The menu, the Hikâyeler page and the "Önceki / Sonraki" links update by themselves.

A new folder (e.g. `src/characters/claween/notlar/`) becomes a new menu category. To give it a
nice name and position, add it to `categories:` in the character's `index.md`.

## Markdown cheat sheet

| You write              | You get                         |
|------------------------|---------------------------------|
| `*italik*`             | *italik*                        |
| `**kalın**`            | **kalın**                       |
| Enter once             | new line (good for poems)       |
| Enter twice            | new paragraph                   |
| `## Başlık`            | big heading (shows in "Bu sayfada" on profiles) |
| `### Alt başlık`       | smaller heading                 |
| `---`                  | the ······ 🐾 ······ separator  |
| `![Sunara](assets/Sunara.png)` | a picture from the character's assets folder |

Plain HTML still works inside any `.md` file if you ever need something special.

## Profile blocks (only in index.md)

```
{% panel %}
Text in a paper box.
{% endpanel %}

{% panel "assets/Sunara.png" %}
### 🌞Sunara🌞
Picture on the left, text on the right.
{% endpanel %}

{% note %}
**A highlighted note, like the "peki neden?" boxes.**

Text...
{% endnote %}
```

Every picture on a character page can be clicked to see it bigger.

## Adding a new character

1. Create `src/characters/<name>/index.md`. Copying Claween's and changing it is the easiest start.
   The top part (between the `---` lines) holds name, subtitle, portrait, stats, story categories
   and colours (`theme:`).
2. Put pictures in `src/characters/<name>/assets/`. Name the main picture `portrait.png`
   (or .jpg, etc.).
3. Optional: `theme.css` in the same folder for character-only styling.
4. Remove the name from `src/_data/upcomingCharacters.js`. (If you forget, it's fine: the card
   switches to the real page as soon as `index.md` exists.)

## Hand-made character pages

Anu, Crystal, Ekin, Robin and Samantha have their own fully designed pages instead of an
`index.md` profile: plain `.html`, `.css` and `.js` files in `src/characters/<name>/`. They are
copied to the site exactly as they are (no shared layout), and their Characters card links to
`index.html` automatically. Edit them like normal web pages. Every page has a "← Bahçe" link back.

Pictures they expect but that aren't in the folder yet (drop them into that character's `assets/`):
Ekin `Zehra.png`; Robin `Billy.png`, `Asiel.png`, `Hamath.png`; Samantha `Muhammed.png`,
`Zaynab.png`, `Leila.png`.

## Putting it online later

`npm run build` creates the finished site in `_site/`. Those files can go to any static host
(Netlify, GitHub Pages, Cloudflare Pages...). If the site will live in a sub-folder, such as
`username.github.io/hayal-bahcesi/`, build it with that folder name so links keep working:

```
$env:PATH_PREFIX="/hayal-bahcesi/"; npm run build     ← in PowerShell (Windows)
```

Note: posts on the main page are saved only in the browser you wrote them in. Friends visiting
the online site won't see them.
