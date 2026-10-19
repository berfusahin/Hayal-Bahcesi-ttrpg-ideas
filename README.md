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
    characterCards.js   ← every character card: order, tagline, tags, tape colour
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

{% realm "ay", "Ayın sürüsü" %}
## Anukai Tanrıları
...headings, panels and notes...
{% endrealm %}
```

A `realm` turns a whole section into a full-width colour band. The name ("gunes", "ay", "kan" for
Claween) picks its colours in the character's `theme.css`; the second text is an optional small
line above the heading. `quote` and `quoteSource` at the top of `index.md` add a line under the
name.

In chapters, a paragraph that is entirely in italics (`*Yazar burada...*`) is shown as an aside
(in Claween's handwriting).

Every picture on a character page can be clicked to see it bigger.

## Adding a new character

1. Create `src/characters/<name>/index.md`. Copying Claween's and changing it is the easiest start.
   The top part (between the `---` lines) holds name, subtitle, portrait, stats, story categories
   and colours (`theme:`).
2. Put pictures in `src/characters/<name>/assets/`. Name the main picture `portrait.png`
   (or .jpg, etc.).
3. Optional: `theme.css` in the same folder for character-only styling.
4. Add (or keep) the character's line in `src/_data/characterCards.js`: it sets the card's place,
   tagline, tags and tape colour. The card links to the page as soon as `index.md` exists.

## Hand-made character pages

Anu, Crystal, Ekin, Robin and Samantha have their own fully designed pages instead of an
`index.md` profile: plain `.html`, `.css` and `.js` files in `src/characters/<name>/`. They are
copied to the site exactly as they are (no shared layout), and their card in
`src/_data/characterCards.js` links to `index.html` automatically. Edit them like normal web pages. Every page has a "← Bahçe" link back.

Pictures they expect but that aren't in the folder yet (drop them into that character's `assets/`):
Ekin `Zehra.png`; Robin `Billy.png`, `Asiel.png`, `Hamath.png`; Samantha `Muhammed.png`,
`Zaynab.png`, `Leila.png`.

## Posts on the main page

Posts are files in `src/posts/`, one `.md` file per post, so they're part of your code: they go
into git and everyone who visits the site sees them.

- While `npm start` runs, the main page shows the "Paylaşım Yap!" form and a Delete button on
  each post. Publishing writes a new file into `src/posts/`, Delete removes it, and the page
  refreshes by itself. Commit the files like any other change.
- The built site (`npm run build`, the online version) has no form and no Delete buttons, so only
  you can post.
- You can also write a post by hand: make a file like `src/posts/2026-10-19-214000.md`:

```markdown
---
date: 2026-10-19T21:40:00+03:00
---

What you want to say. *Markdown* works, and a single Enter is a new line.
```

Posts written before this lived only in your browser. The first time you open the main page with
`npm start`, they're moved into `src/posts/` files automatically.

## The online site

The site is published at **https://berfusahin.github.io/Hayal-Bahcesi-ttrpg-ideas/**. Every push to
`main` rebuilds it by itself (`.github/workflows/pages.yml`, watch it under the "Actions" tab on
GitHub); it's updated a minute or two later.

## Building it by hand

`npm run build` creates the finished site in `_site/`. Those files can go to any static host
(Netlify, GitHub Pages, Cloudflare Pages...). If the site will live in a sub-folder, such as
`username.github.io/hayal-bahcesi/`, build it with that folder name so links keep working:

```
$env:PATH_PREFIX="/hayal-bahcesi/"; npm run build     ← in PowerShell (Windows)
```

