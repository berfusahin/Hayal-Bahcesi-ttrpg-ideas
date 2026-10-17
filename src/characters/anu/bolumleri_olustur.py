# Builds bolumler.html from the notes in ../bölümler.
# Add a new chapter note ("Bölüm 5 - Başlık.md"), optionally add its summary and purse lines below, then run:
#   python bolumleri_olustur.py
import html
import re
from pathlib import Path

HERE = Path(__file__).resolve().parent
NOTES = HERE.parent / "bölümler"
TEMPLATE = HERE / "bolumler_sablon.html"
OUT = HERE / "bolumler.html"

# Short summary and gold ledger per chapter number. Both are optional.
EXTRA = {
    1: {
        "ozet": "Lord Ares kayıp. Lord Dura'nın ihaneti ortaya çıkıyor, John'un öldüğü haberi geliyor ve Ares'in kılıcının yanında Veritas beliriyor.",
        "kese": [("Balon kirası", -15), ("Balon depozitosu", -10)],
    },
    2: {
        "ozet": "Anu, Glorin Thirst'ün gizli görüşmesini rüzgârla dinliyor. Arenada ve Lord Tion'un sarayında işler kızışıyor, Veritas yaralanıyor.",
        "kese": [("Sungurlar Oteli'nde oda", -1), ("Arena bileti", -1), ("Depozito iadesi", 10)],
    },
    3: {
        "ozet": "Pharm'da Ares'le buluşma. Öğrencilerin ölüm haberi, Kishore'la yıllar sonra kavuşma ve Noles'in kibirli dayatması.",
        "kese": [("Lord Raymond'dan", 50), ("Üç günlük hızlı balon", -40)],
    },
    4: {
        "ozet": "Kuşatma, Kishore'la omuz omuza savaş ve Noles'in ölümü. Anu, yıllar önce kaçırıldığı topraklara dönüyor.",
        "kese": [],
    },
}


def inline(text: str) -> str:
    text = html.escape(text, quote=False)
    text = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<![\w*])_(.+?)_(?!\w)", r"<em>\1</em>", text)
    return text


def chapter_files():
    found = []
    for f in NOTES.glob("*.md"):
        m = re.match(r"Bölüm\s+(\d+)\s*-\s*(.+)$", f.stem)
        if m:
            found.append((int(m.group(1)), m.group(2).strip(), f))
    return sorted(found)


def build():
    chapters = chapter_files()
    toc, body = [], []
    for i, (num, title, path) in enumerate(chapters):
        cid = f"bolum-{num}"
        extra = EXTRA.get(num, {})
        paras = [p.strip() for p in re.split(r"\n\s*\n", path.read_text(encoding="utf-8")) if p.strip()]
        text = "\n".join(f"      <p>{inline(p)}</p>" for p in paras)

        toc.append(f'      <li><a href="#{cid}"><span class="n">{num}</span><span>{html.escape(title)}</span></a></li>')

        aside = []
        if extra.get("ozet"):
            aside.append(f'        <p class="ozet">{html.escape(extra["ozet"])}</p>')
        if extra.get("kese"):
            rows = "".join(
                f'<li><span>{html.escape(name)}</span><span class="{"plus" if amt > 0 else "minus"}">{amt:+d}</span></li>'
                for name, amt in extra["kese"]
            )
            total = sum(a for _, a in extra["kese"])
            aside.append(
                f'        <div class="kese"><div class="label">Kese</div><ul>{rows}</ul>'
                f'<div class="total"><span>Bölüm toplamı</span><span>{total:+d} altın</span></div></div>'
            )

        prev_link = (
            f'<a href="#bolum-{chapters[i-1][0]}">← Bölüm {chapters[i-1][0]}</a>' if i > 0 else '<a href="index.html">← Karakter</a>'
        )
        next_link = (
            f'<a href="#bolum-{chapters[i+1][0]}">Bölüm {chapters[i+1][0]} →</a>' if i + 1 < len(chapters) else '<a href="index.html">Anu\'ya dön →</a>'
        )

        body.append(
            f'''  <article class="chapter" id="{cid}">
    <header class="ch-head">
      <div class="label">Bölüm {num}</div>
      <h2>{html.escape(title)}</h2>
    </header>
    <div class="ch-grid">
      <aside class="ch-aside">
{chr(10).join(aside)}
      </aside>
      <div class="ch-text">
{text}
      </div>
    </div>
    <nav class="ch-nav" aria-label="Bölümler arası">{prev_link}{next_link}</nav>
  </article>'''
        )

    out = TEMPLATE.read_text(encoding="utf-8")
    out = out.replace("<!--ICINDEKILER-->", "\n".join(toc))
    out = out.replace("<!--BOLUMLER-->", "\n".join(body))
    out = out.replace("<!--SAYI-->", str(len(chapters)))
    OUT.write_text(out, encoding="utf-8")
    print(f"{len(chapters)} bölüm yazıldı: {OUT}")


if __name__ == "__main__":
    build()
