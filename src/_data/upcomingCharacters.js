import fs from "node:fs";

// Characters that don't have an index.md profile. They show on the Characters page as
// "yakında" cards. When characters/<folder>/index.html exists (a hand-made page), the card
// links to it. When you create characters/<folder>/index.md, the card turns into a real
// profile by itself; you can then delete the line here.
// `portrait` is only needed when the picture isn't assets/portrait.<png, jpg...>.
const list = [
    { name: "Crystal Taelin", folder: "crystal", portrait: "img/crystal.jpg" },
    { name: "Robin", folder: "robin" },
    { name: "Merredith Tumbleid", folder: "merredith" },
    { name: "Samantha Oakley", folder: "samantha" },
    { name: "Ekin Gece - Dilruba Ovalı", folder: "ekin" },
    { name: "Maruk", folder: "maruk" },
    { name: "Anu Mukhtar", folder: "anu" },
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
