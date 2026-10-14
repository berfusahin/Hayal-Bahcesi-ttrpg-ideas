import slugify from "@sindresorhus/slugify";

// Turkish-aware URL slugs: "Zindandan Kaçış" -> "zindandan-kacis", "Maztica'nın" -> "mazticanin"
const turkish = [["ü", "u"], ["Ü", "u"], ["ö", "o"], ["Ö", "o"], ["'", ""], ["’", ""]];

export const slug = (text) => slugify(String(text), { decamelize: false, customReplacements: turkish });
