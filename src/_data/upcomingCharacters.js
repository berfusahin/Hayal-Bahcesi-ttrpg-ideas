import fs from "node:fs";

// Characters that don't have an index.md profile. They show on the Characters page as
// "yakında" cards. When characters/<folder>/index.html exists (a hand-made page), the card
// links to it. When you create characters/<folder>/index.md, the card turns into a real
// profile by itself; you can then delete the line here.
// `portrait` is only needed when the picture isn't assets/portrait.<png, jpg...>.
// `tagline`, `tags` and `accent` (the card's tape colour) are optional and show on the cards.
const list = [
    { name: "Crystal Taelin", folder: "crystal", portrait: "img/crystal.jpg",
      tagline: "Taelin hanesinin en büyük çocuğu", tags: ["Güç Enerjisti", "Kafası Karışık"], accent: "#5e3596" },
    { name: "Robin", folder: "robin",
      tagline: "Pembe Panter", tags: ["Dövüşçü", "Ağır Abi"], accent: "#ff4f9a" },
    { name: "Samantha Oakley", folder: "samantha",
      tagline: "lağımdaki sinyal", tags: ["Nosferatu", "Hacker", "Müslüman"], accent: "#a8862e" },
    { name: "Ekin Gece - Dilruba Ovalı", folder: "ekin",
      tagline: "Işıksız Bahçe'nin Bahçıvanı", tags: ["Malkav", "Bahari"], accent: "#a3172b" },
    { name: "Anu Mukhtar", folder: "anu",
      tagline: "rüzgârla konuşan", tags: ["Hava Enerjisti", "Eğitmen Asker"], accent: "#1d6a4d" },
    { name: "Merredith Tumbleid", folder: "merredith" },
    { name: "Maruk", folder: "maruk" },
    { name: "Spunky", folder: "spunky" },
    { name: "Bee", folder: "bee" },
    { name: "Goraath", folder: "goraath" },
    { name: "Kongo River", folder: "kongo" },
    { name: "Monchuc Worbarum", folder: "monchuc" },
    { name: "Lliadia", folder: "lliadia" }
];

// Finds characters/<folder>/assets/portrait.<any picture type>
function findPortrait(folder) {
    const dir = `src/characters/${folder}/assets`;
    if (!fs.existsSync(dir)) return null;
    const file = fs.readdirSync(dir).find((name) => /^portrait\.(png|jpe?g|jfif|webp|gif|avif)$/i.test(name));
    return file ? `/characters/${folder}/assets/${file}` : null;
}

// Characters that already have a page come first, in the order above.
export default list
    .map(({ portrait, ...character }) => ({
        ...character,
        image: portrait ? `/characters/${character.folder}/${portrait}` : findPortrait(character.folder),
        url: fs.existsSync(`src/characters/${character.folder}/index.html`) ? `/characters/${character.folder}/` : null
    }))
    .sort((a, b) => Boolean(b.url) - Boolean(a.url));
