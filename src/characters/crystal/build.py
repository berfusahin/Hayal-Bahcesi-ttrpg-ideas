"""Crystal sitesini notlardan yeniden üretir.

Kullanım (Crystal klasöründen):  python site/build.py

- bölümler/*.md      -> site/bolumler.html  (bölümlerin tam metni)
- Tanıtım.md "Tanıdıklar" bölümü -> site/tanidiklar.html
Yeni bir "Bölüm N - Başlık.md" eklediğinde ya da tanıdık tablolarını
güncellediğinde bu komutu tekrar çalıştırman yeterli.
"""
import html
import re
import shutil
from pathlib import Path

SITE = Path(__file__).resolve().parent
ROOT = SITE.parent
CHAPTERS = ROOT / "bölümler"
ASSETS = ROOT / "assets"
INTRO = ROOT / "Tanıtım.md"

# Notlardaki görsellerin sitedeki küçültülmüş kopyaları.
# Burada olmayan bir görsel bölümde geçerse, assets'ten olduğu gibi kopyalanır.
IMAGE_MAP = {
    "Pasted image 20261015195710.png": "img/asiklar-tepesi.jpg",
    "Bölüm 1.png": "img/asiklar-tepesi.jpg",
    "Pasted image 20261015201602.png": "img/crystal.jpg",
    "Pasted image 20261015201609.png": "img/crystal-kan.jpg",
    "Pasted image 20261015201617.png": "img/kardesler.jpg",
    "Pasted image 20261015200615.png": "img/warrior.jpg",
    "Sylvia Taelin.png": "img/sylvia.jpg",
    "Epoch Taelin.png": "img/epoch.jpg",
    "Kaelor.png": "img/kaelor.jpg",
}

# Tanıdıklar tablosunda portresi olan kişiler (isimde geçen parça -> görsel)
AVATARS = {
    "Crystal Taelin": "img/crystal.jpg",
    "Sylvia Taelin": "img/sylvia.jpg",
    "Epoch": "img/epoch.jpg",
    "Kaelor": "img/kaelor.jpg",
    "Warrior": "img/warrior.jpg",
}

# Bölümlerde tanıdıklara link verilen isimler (isimde geçen parça -> metinde geçen hâlleri).
# Burada olmayan bir tanıdık, tablodaki tam adıyla (parantezler hariç) aranır.
ALIASES = {
    "Crystal Taelin": ["Crystal"],
    "Sylvia Taelin": ["Sylvia", "Maya"],
    "Epoch": ["Epoch", "Ephraim"],
    "Riddley": ["Riddley", "Ridley"],
    "Elvar Taelin": ["Elvar Taelin", "Elvar"],
    "Juspen Taelin": ["Juspen Taelin", "Juspen"],
    "Kaelor": ["Kaelor Montgomery", "Kaelor"],
    "Charionet": ["Charionet Montgomery", "Charionet"],
    "Marianna": ["Marianna Montgomery", "Marianna"],
    "Alderfen": ["Alderfen"],
    "Cevval Marcus": ["Cevval Marcus", "Marcus"],
    "Kate Whistledown": ["Kate Whistledown", "Kate"],
    "Cafer": ["Cafer"],
    "Hazineci Alfric": ["Hazineci Alfric", "Alfric"],
    "Alves": ["Alves Marverun", "Alves"],
    "Hector": ["Hector Yundeltolf", "Hector"],
    "Samuel Belight": ["Samuel Belight", "Samuel"],
    "Ollyvan": ["Ollyvan Polentus", "Ollyvan"],
    "Olivar": ["Olivar Polentus", "Olivar"],
    "Descartes": ["Descartes"],
    "Bracken": ["Bracken"],
}

FONTS = ('<link rel="preconnect" href="https://fonts.googleapis.com">\n'
         '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
         '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&amp;family=Marcellus+SC&amp;family=Spectral:ital,wght@0,400;0,500;0,600;1,400;1,500&amp;display=swap">\n'
         '<link rel="stylesheet" href="style.css">')

SUN = ('<svg width="0" height="0" style="position:absolute" aria-hidden="true"><symbol id="sun" viewBox="0 0 32 32">'
       '<g fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="16" cy="16" r="6.5"/>'
       '<path d="M16 2v6M16 24v6M2 16h6M24 16h6M6.1 6.1l4.2 4.2M21.7 21.7l4.2 4.2M6.1 25.9l4.2-4.2M21.7 10.3l4.2-4.2"/></g>'
       '<path d="M17.5 10.2a6 6 0 1 1 0 11.6 5 5 0 0 0 0-11.6z" fill="currentColor"/></symbol></svg>')

PAGES = [("index.html", "Karakter"), ("bolumler.html", "Bölümler"), ("tanidiklar.html", "Tanıdıklar")]


def header(active):
    links = "\n".join(
        f'      <a href="{href}"{" aria-current=\"page\"" if href == active else ""}>{label}</a>'
        for href, label in PAGES)
    return f"""{SUN}
<header class="bar">
  <div class="wrap">
    <a class="sigil" href="index.html"><svg aria-hidden="true"><use href="#sun"/></svg>TAELIN HANESİ</a>
    <nav aria-label="Sayfalar">
      <a href="../">← Bahçe</a>
{links}
    </nav>
  </div>
</header>"""


def footer():
    links = " · ".join(f'<a href="{h}">{l}</a>' for h, l in PAGES)
    return f"""<footer class="foot">
  <div class="wrap">
    <span>Crystal Taelin · Fate oyunu karakteri · hikâye devam ediyor</span>
    <span>{links}</span>
  </div>
</footer>"""


def page(title, active, style, body, script=""):
    return f"""<!doctype html>
<html lang="tr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{title}</title>
{FONTS}
<style>
  :root {{ padding-top: env(safe-area-inset-top, 0px); padding-bottom: env(safe-area-inset-bottom, 0px); }}
{style}
</style>
</head>
<body>
{header(active)}
{body}
{footer()}
{script}
</body>
</html>
"""


# ---------------------------------------------------------------- markdown

def resolve_image(name):
    if name in IMAGE_MAP:
        return IMAGE_MAP[name]
    src = ASSETS / name
    if not src.exists():
        return None
    dest = SITE / "img" / "notlar" / name
    dest.parent.mkdir(parents=True, exist_ok=True)
    if not dest.exists():
        shutil.copyfile(src, dest)
    return "img/notlar/" + name


def inline(text):
    t = html.escape(text, quote=False)
    t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)
    t = re.sub(r"(?<![\w])_(?=\S)(.+?)(?<=\S)_(?![\w])", r"<em>\1</em>", t)
    t = re.sub(r"(?<![\w*])\*(?=\S)(.+?)(?<=\S)\*(?![\w*])", r"<em>\1</em>", t)
    return t.replace("_", "")


TR_ASCII = str.maketrans("İıŞşÇçĞğÖöÜü", "iissccggoouu")


def clean_name(name):
    """Tablodaki ismin yaş/boy parantezleri olmadan hâli: 'Sylvia Taelin (22)' -> 'Sylvia Taelin'."""
    return re.sub(r"\s*\(.*?\)", "", name).strip()


def person_id(name):
    """Tanıdıklar sayfasındaki satırın adresi: 'Ephraim “Epoch” Taelin (18)' -> 'ephraim-epoch-taelin'."""
    return re.sub(r"[^a-z0-9]+", "-", clean_name(name).translate(TR_ASCII).lower()).strip("-")


def people_index(names):
    """Metinde aranacak her isim hâli -> o kişinin satır adresi."""
    index = {}
    for name in names:
        aliases = next((a for part, a in ALIASES.items() if part in name), [clean_name(name)])
        for alias in aliases:
            index.setdefault(alias, person_id(name))
    return index


def link_people(text_html, index):
    """Bölüm metnindeki tanıdık isimlerini tanidiklar.html'deki satırlarına bağlar (etiketlerin içine dokunmaz)."""
    if not index:
        return text_html
    names = sorted(index, key=len, reverse=True)
    pattern = re.compile(r"(?<!\w)(" + "|".join(re.escape(n) for n in names) + r")(?!\w)")
    parts = re.split(r"(<[^>]+>)", text_html)
    return "".join(
        part if part.startswith("<") else
        pattern.sub(lambda m: f'<a class="person" href="tanidiklar.html#{index[m.group(1)]}">{m.group(1)}</a>', part)
        for part in parts)


def md_to_html(md):
    out = []
    blocks = re.split(r"\n\s*\n", md.replace("\r\n", "\n").strip())
    for block in blocks:
        lines = [l.rstrip() for l in block.split("\n") if l.strip()]
        if not lines:
            continue
        first = lines[0].strip()
        m = re.fullmatch(r"!\[\[([^|\]]+)(?:\|[^\]]*)?\]\]", first)
        if m and len(lines) == 1:
            src = resolve_image(m.group(1))
            if src:
                out.append(f'<figure class="art"><img src="{src}" alt="" loading="lazy"></figure>')
            continue
        h = re.match(r"(#{1,4})\s+(.*)", first)
        if h and len(lines) == 1:
            out.append(f"<h3>{inline(h.group(2))}</h3>")
            continue
        if re.fullmatch(r"[-*_]{3,}", first):
            out.append('<hr class="scene">')
            continue
        if first.startswith(">"):
            inner = "<br>".join(inline(re.sub(r"^>\s?", "", l)) for l in lines)
            out.append(f"<blockquote>{inner}</blockquote>")
            continue
        text = "<br>".join(inline(l.strip()) for l in lines)
        cls = ""
        # Tamamı italik+kalın paragraflar: görüler / rüyalar
        if re.fullmatch(r"\s*<em>\s*<strong>.*</strong>\s*</em>\s*", text, re.S) or \
           re.fullmatch(r"\s*<strong>\s*<em>.*</em>\s*</strong>\s*", text, re.S):
            cls = ' class="vision"'
        elif re.fullmatch(r"\s*<em>.*</em>\s*", text, re.S) and text.count("<em>") == 1:
            cls = ' class="aside"'
        out.append(f"<p{cls}>{text}</p>")
    return "\n".join(out)


# ---------------------------------------------------------------- bölümler

def load_chapters():
    chapters = []
    for f in CHAPTERS.glob("*.md"):
        m = re.match(r"Bölüm\s+(\d+)\s*[-–—]\s*(.+)\.md$", f.name)
        if not m:
            continue
        text = f.read_text(encoding="utf-8")
        words = len(re.findall(r"\w+", re.sub(r"!\[\[.*?\]\]", "", text)))
        chapters.append({"n": int(m.group(1)), "title": m.group(2).strip(),
                         "html": md_to_html(text), "words": words})
    return sorted(chapters, key=lambda c: c["n"])


CHAPTER_STYLE = """
  .head { padding-block: clamp(2rem, 5vw, 3.2rem) 1.5rem; display: grid; gap: .9rem; }
  .head h1 { font-size: clamp(2.8rem, 7vw, 4.8rem); line-height: .92; }
  .head h1 em { color: var(--violet); font-weight: 500; }

  .reader { display: grid; grid-template-columns: 15rem minmax(0, 1fr); gap: clamp(1.5rem, 5vw, 4rem); padding-block: 1rem 4rem; align-items: start; }
  .toc { position: sticky; top: calc(env(safe-area-inset-top, 0px) + 4.5rem); display: grid; gap: .2rem; }
  .toc .eyebrow { margin-bottom: .5rem; }
  .toc a {
    display: grid; grid-template-columns: 2rem minmax(0, 1fr); gap: .4rem; align-items: baseline;
    text-decoration: none; color: var(--muted); padding: .45rem .6rem; border-radius: 4px; line-height: 1.25;
  }
  .toc a b { font-family: var(--f-display); font-size: 1.3rem; font-weight: 600; font-variant-numeric: tabular-nums; }
  .toc a span { font-size: .95rem; }
  .toc a:hover { color: var(--ink); }
  .toc a[aria-current="true"] { background: var(--violet-soft); color: var(--violet); }
  .toc .next-note { margin-top: .8rem; padding: .6rem; border: 1px dashed var(--line); border-radius: 4px; font-size: .85rem; color: var(--muted); }

  .chapter { min-width: 0; display: grid; gap: 2rem; scroll-margin-top: 4.5rem; }
  .chapter + .chapter { border-top: 1px solid var(--line); padding-top: 3rem; margin-top: 3rem; }
  .js .chapter + .chapter { border-top: 0; padding-top: 0; margin-top: 0; }
  .ch-head { display: grid; gap: .5rem; border-bottom: 1px solid var(--line); padding-bottom: 1.4rem; max-width: 40rem; }
  .ch-head h2 { font-size: clamp(2.3rem, 5vw, 3.4rem); }
  .ch-head .meta { font-family: var(--f-label); font-size: .78rem; letter-spacing: .1em; color: var(--muted); font-variant-numeric: tabular-nums; }

  .text { max-width: 40rem; font-size: 1.1rem; line-height: 1.78; display: grid; gap: 1.05em; }
  .text p { hyphens: auto; }
  .text strong { font-weight: 600; }
  .text p.vision { color: var(--violet); font-family: var(--f-display); font-size: 1.28rem; line-height: 1.5; padding-left: 1.2rem; border-left: 2px solid var(--violet); }
  .text p.vision strong { font-weight: 500; }
  .text p.aside { color: var(--muted); }
  .text blockquote { margin: .5rem 0 0; padding: 1.3rem 1.4rem; background: var(--surface); border: 1px solid var(--line); border-radius: 6px; font-size: 1rem; line-height: 1.7; }
  .text blockquote strong:first-child { font-family: var(--f-label); letter-spacing: .1em; color: var(--ember); font-weight: 400; }
  .text figure.art { margin: 0 0 .5rem; }
  .text figure.art img { border-radius: 6px; border: 1px solid var(--line); }
  .text h3 { font-size: 1.7rem; margin-top: 1rem; }
  .text hr.scene { border: 0; height: 1px; background: var(--line); width: 30%; margin: 1rem auto; }
  .text a.person { color: inherit; text-decoration: underline dotted color-mix(in srgb, var(--violet) 55%, transparent); text-decoration-thickness: 1px; text-underline-offset: 3px; }
  .text a.person:hover { color: var(--violet); text-decoration-style: solid; }

  .pager { display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; max-width: 40rem; border-top: 1px solid var(--line); padding-top: 1.5rem; }
  .pager a { display: grid; gap: .15rem; text-decoration: none; max-width: 48%; }
  .pager a small { font-family: var(--f-label); font-size: .72rem; letter-spacing: .12em; color: var(--muted); }
  .pager a span { font-family: var(--f-display); font-size: 1.35rem; font-weight: 600; }
  .pager a.next { text-align: right; margin-left: auto; }

  @media (max-width: 820px) {
    .reader { grid-template-columns: minmax(0, 1fr); }
    .toc { position: static; grid-template-columns: repeat(auto-fill, minmax(10.5rem, 1fr)); }
    .toc .eyebrow, .toc .next-note { grid-column: 1 / -1; }
    .text { font-size: 1.05rem; }
  }
"""

CHAPTER_SCRIPT = """<script>
(function () {
  document.documentElement.classList.add('js');
  var chapters = Array.prototype.slice.call(document.querySelectorAll('.chapter'));
  var links = Array.prototype.slice.call(document.querySelectorAll('.toc a'));
  if (!chapters.length) return;
  function show(id, scroll) {
    var target = document.getElementById(id) || chapters[0];
    chapters.forEach(function (c) { c.hidden = c !== target; });
    links.forEach(function (a) { a.setAttribute('aria-current', a.getAttribute('href') === '#' + target.id); });
    try { localStorage.setItem('crystal-son-bolum', target.id); } catch (e) {}
    if (scroll) target.scrollIntoView();
  }
  var start = location.hash.slice(1);
  if (!document.getElementById(start)) { try { start = localStorage.getItem('crystal-son-bolum') || ''; } catch (e) { start = ''; } }
  show(start, false);
  window.addEventListener('hashchange', function () { show(location.hash.slice(1), true); });
})();
</script>"""


def build_chapters(chapters, index):
    toc = "\n".join(
        f'    <a href="#bolum-{c["n"]}"><b>{c["n"]}</b><span>{html.escape(c["title"])}</span></a>'
        for c in chapters)
    arts = []
    for i, c in enumerate(chapters):
        minutes = max(1, round(c["words"] / 200))
        prev_link = next_link = ""
        if i > 0:
            p = chapters[i - 1]
            prev_link = f'<a class="prev" href="#bolum-{p["n"]}"><small>← Önceki bölüm</small><span>{html.escape(p["title"])}</span></a>'
        if i < len(chapters) - 1:
            q = chapters[i + 1]
            next_link = f'<a class="next" href="#bolum-{q["n"]}"><small>Sonraki bölüm →</small><span>{html.escape(q["title"])}</span></a>'
        else:
            next_link = '<a class="next" href="index.html"><small>Hikâye devam ediyor</small><span>Crystal\'a dön</span></a>'
        arts.append(f"""  <article class="chapter" id="bolum-{c["n"]}">
    <header class="ch-head">
      <p class="eyebrow">Bölüm {c["n"]}</p>
      <h2>{html.escape(c["title"])}</h2>
      <p class="meta">{format(c["words"], ",").replace(",", ".")} kelime · yaklaşık {minutes} dakikalık okuma</p>
    </header>
    <div class="text">
{link_people(c["html"], index)}
    </div>
    <nav class="pager" aria-label="Bölümler arası">{prev_link}{next_link}</nav>
  </article>""")

    body = f"""<main>
<div class="wrap">
  <div class="head">
    <p class="eyebrow">Crystal'ın gözünden · AH 2587 · hikâye devam ediyor</p>
    <h1>Ay, bulutlu denizlerde <em>hayalet bir kalyon gibidir</em></h1>
    <p class="lede">Oyunda yaşananlar, Crystal'ın anlatımıyla. Her oturumdan sonra yeni bölümler eklenir.</p>
  </div>
  <div class="reader">
  <nav class="toc" aria-label="Bölüm listesi">
    <p class="eyebrow">Bölümler</p>
{toc}
    <p class="next-note">Sıradaki bölüm bir sonraki oturumdan sonra.</p>
  </nav>
  <div>
{chr(10).join(arts)}
  </div>
  </div>
</div>
</main>"""
    return page("Crystal Taelin · Bölümler", "bolumler.html", CHAPTER_STYLE, body, CHAPTER_SCRIPT)


# ---------------------------------------------------------------- tanıdıklar

STATUS = [("💀", "dead", "Ölü"), ("❔", "unknown", "Durumu bilinmiyor"), ("💘", "love", "Aşık")]


def load_people():
    text = INTRO.read_text(encoding="utf-8").replace("\r\n", "\n")
    m = re.search(r"^# Tanıdıklar\s*$(.*?)(?=^# |\Z)", text, re.M | re.S)
    section = m.group(1) if m else ""
    groups = []
    for g in re.finditer(r"^## (.+?)\s*$(.*?)(?=^## |\Z)", section, re.M | re.S):
        title = g.group(1).strip()
        rows = []
        for line in g.group(2).split("\n"):
            line = line.strip()
            if not line.startswith("|"):
                continue
            cells = [c.strip() for c in line.strip("|").split("|")]
            if len(cells) < 2 or re.fullmatch(r":?-{2,}:?", cells[0]) or cells[0] == "İsim":
                continue
            raw = cells[0]
            status = next(((k, l) for e, k, l in STATUS if e in raw), ("", ""))
            horse = "🐴" in raw
            name = re.sub(r"[💀❔💘🐴]", "", raw).strip()
            rows.append({"name": name, "desc": " | ".join(cells[1:]), "status": status, "horse": horse})
        if rows:
            groups.append({"title": "Bilinmeyenler" if title == "?" else title, "rows": rows})
    return groups


PEOPLE_STYLE = """
  .head { padding-block: clamp(2rem, 5vw, 3.2rem) 1.5rem; display: grid; gap: .9rem; }
  .head h1 { font-size: clamp(2.8rem, 7vw, 4.8rem); line-height: .92; }

  .tools { display: flex; flex-wrap: wrap; gap: .8rem 1.2rem; align-items: center; padding-block: 1rem 2rem; border-bottom: 1px solid var(--line); position: sticky; top: calc(env(safe-area-inset-top, 0px) + 3.3rem); background: var(--bg); z-index: 5; }
  .search { flex: 1 1 16rem; min-width: 0; display: grid; gap: .3rem; }
  .search label { font-family: var(--f-label); font-size: .72rem; letter-spacing: .14em; color: var(--muted); }
  .search input {
    font: inherit; font-size: 1rem; padding: .6rem .9rem; border-radius: 6px; border: 1px solid var(--line);
    background: var(--surface); color: var(--ink); width: 100%;
  }
  .search input:focus { outline: 2px solid var(--violet); outline-offset: 1px; }
  .chips { display: flex; flex-wrap: wrap; gap: .4rem; }
  .chips button {
    font: inherit; font-family: var(--f-label); font-size: .78rem; letter-spacing: .08em; cursor: pointer;
    padding: .4rem .85rem; border-radius: 999px; border: 1px solid var(--line); background: transparent; color: var(--muted);
    font-variant-numeric: tabular-nums;
  }
  .chips button[aria-pressed="true"] { background: var(--violet); border-color: var(--violet); color: var(--bg); }

  .group { padding-block: 2.2rem 1rem; display: grid; gap: 1rem; }
  .group h2 { font-size: clamp(1.8rem, 4vw, 2.4rem); display: flex; align-items: baseline; gap: .8rem; flex-wrap: wrap; }
  .group h2 small { font-family: var(--f-label); font-size: .78rem; letter-spacing: .12em; color: var(--muted); font-weight: 400; }
  .table-wrap { overflow-x: auto; }
  table { width: 100%; border-collapse: collapse; }
  th { text-align: left; font-family: var(--f-label); font-weight: 400; font-size: .72rem; letter-spacing: .14em; color: var(--muted); padding: .5rem .8rem .5rem 0; border-bottom: 1px solid var(--line); }
  td { padding: .9rem .8rem .9rem 0; border-bottom: 1px solid var(--line); vertical-align: top; }
  td.who { width: 17rem; }
  .who-in { display: flex; gap: .7rem; align-items: center; }
  .avatar { width: 2.6rem; height: 2.6rem; border-radius: 50%; object-fit: cover; object-position: 50% 15%; border: 1px solid var(--line); flex: none; }
  .initial { width: 2.6rem; height: 2.6rem; border-radius: 50%; display: grid; place-items: center; flex: none; background: var(--violet-soft); color: var(--violet); font-family: var(--f-display); font-size: 1.3rem; font-weight: 600; }
  .name { font-family: var(--f-display); font-size: 1.3rem; font-weight: 600; line-height: 1.15; }
  td.desc { line-height: 1.6; }
  td.desc strong { font-weight: 600; color: var(--ember); }
  td.st { width: 9.5rem; }
  tbody tr { scroll-margin-top: 9rem; }
  tbody tr:target td { background: var(--violet-soft); }
  tr.dead .name { color: var(--dead); text-decoration: line-through; text-decoration-thickness: 1px; }
  tr.dead .avatar { filter: grayscale(1); opacity: .7; }
  tr.love .initial { background: color-mix(in srgb, var(--ember) 15%, transparent); color: var(--ember); }
  .tag.dead-tag { color: var(--dead); }
  .tag.unknown-tag { color: var(--gold); border-color: color-mix(in srgb, var(--gold) 45%, transparent); }
  .tag.love-tag { color: var(--ember); border-color: color-mix(in srgb, var(--ember) 45%, transparent); }
  .empty { padding-block: 3rem; color: var(--muted); }

  @media (max-width: 680px) {
    thead { display: none; }
    table, tbody, tr, td { display: block; width: 100%; }
    tr { padding-block: 1rem; border-bottom: 1px solid var(--line); display: grid; gap: .5rem; }
    td { padding: 0; border: 0; }
    td.who, td.st { width: auto; }
    .tools { position: static; }
  }
"""

PEOPLE_SCRIPT = """<script>
(function () {
  var q = document.getElementById('ara');
  var chips = Array.prototype.slice.call(document.querySelectorAll('.chips button'));
  var rows = Array.prototype.slice.call(document.querySelectorAll('tbody tr'));
  var groups = Array.prototype.slice.call(document.querySelectorAll('.group'));
  var empty = document.getElementById('bos');
  var filter = 'all';
  function norm(s) { return s.toLocaleLowerCase('tr'); }
  function apply() {
    var term = norm(q.value.trim()), shown = 0;
    rows.forEach(function (r) {
      var ok = (filter === 'all' || r.dataset.status === filter) && (!term || norm(r.textContent).indexOf(term) !== -1);
      r.hidden = !ok; if (ok) shown++;
    });
    groups.forEach(function (g) { g.hidden = !g.querySelector('tbody tr:not([hidden])'); });
    empty.hidden = shown > 0;
  }
  chips.forEach(function (b) {
    b.addEventListener('click', function () {
      filter = b.dataset.filter;
      chips.forEach(function (c) { c.setAttribute('aria-pressed', c === b); });
      apply();
    });
  });
  q.addEventListener('input', apply);
})();
</script>"""


def build_people(groups):
    all_rows = [r for g in groups for r in g["rows"]]
    counts = {k: sum(1 for r in all_rows if r["status"][0] == k) for _, k, _ in STATUS}
    chips = [f'<button type="button" data-filter="all" aria-pressed="true">Hepsi · {len(all_rows)}</button>']
    chips += [f'<button type="button" data-filter="{k}" aria-pressed="false">{e} {l} · {counts[k]}</button>'
              for e, k, l in STATUS]

    sections = []
    for g in groups:
        trs = []
        for r in g["rows"]:
            key, label = r["status"]
            avatar = next((src for part, src in AVATARS.items() if part in r["name"]), None)
            face = (f'<img class="avatar" src="{avatar}" alt="" loading="lazy">' if avatar
                    else f'<span class="initial" aria-hidden="true">{html.escape(r["name"][:1])}</span>')
            tag = f'<span class="tag {key}-tag">{label}</span>' if key else ""
            if r["horse"]:
                tag += ' <span class="tag">At</span>'
            trs.append(f"""      <tr id="{person_id(r['name'])}" class="{key}" data-status="{key or 'none'}">
        <td class="who"><div class="who-in">{face}<span class="name">{inline(r["name"])}</span></div></td>
        <td class="desc">{inline(r["desc"])}</td>
        <td class="st">{tag}</td>
      </tr>""")
        sections.append(f"""  <section class="group">
    <h2>{html.escape(g["title"])} <small>{len(g["rows"])} kişi</small></h2>
    <div class="table-wrap">
    <table>
      <thead><tr><th>İsim</th><th>Açıklama</th><th>Durum</th></tr></thead>
      <tbody>
{chr(10).join(trs)}
      </tbody>
    </table>
    </div>
  </section>""")

    body = f"""<main>
<div class="wrap">
  <div class="head">
    <p class="eyebrow">Tanıdıklar · Crystal'ın notlarından</p>
    <h1>Tanıdıklar</h1>
    <p class="lede">Crystal'ın yolunun kesiştiği herkes. 💀 ölü, ❔ durumu bilinmiyor, 💘 in love.</p>
  </div>
  <div class="tools">
    <div class="search"><label for="ara">İsim ya da açıklamada ara</label><input id="ara" type="search" placeholder="ör. enerjist, Lonca, Hars" autocomplete="off"></div>
    <div class="chips" role="group" aria-label="Duruma göre süz">{"".join(chips)}</div>
  </div>
{chr(10).join(sections)}
  <p class="empty" id="bos" hidden>Bu aramayla eşleşen kimse yok. Aramayı temizle ya da “Hepsi”ni seç.</p>
</div>
</main>"""
    return page("Crystal Taelin · Tanıdıklar", "tanidiklar.html", PEOPLE_STYLE, body, PEOPLE_SCRIPT)


if __name__ == "__main__":
    groups = load_people()
    index = people_index(r["name"] for g in groups for r in g["rows"])
    chapters = load_chapters()
    (SITE / "bolumler.html").write_text(build_chapters(chapters, index), encoding="utf-8")
    (SITE / "tanidiklar.html").write_text(build_people(groups), encoding="utf-8")
    print(f"OK: {len(chapters)} chapters, {sum(len(g['rows']) for g in groups)} people in {len(groups)} groups")
