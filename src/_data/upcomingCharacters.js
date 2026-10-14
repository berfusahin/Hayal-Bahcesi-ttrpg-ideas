import fs from "node:fs";

// Characters that don't have a page yet. They show on the Characters page as
// "yakında" cards. When you create characters/<folder>/index.md, the card
// turns into a real link by itself; you can then delete the line here.
const list = [
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

export default list.map((character) => ({ ...character, image: findPortrait(character.folder) }));
