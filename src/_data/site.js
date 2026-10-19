// Site-wide texts and settings. Change anything here and every page follows.
export default {
    title: "Hayal Bahçesi",
    subtitle: "stories, sketches and forgotten ideas",
    language: "tr",
    footer: "made with ♡",

    // Top menu. To add a page, add a line here (and the page itself in src/).
    nav: [
        { label: "Main", url: "/" },
        { label: "Characters", url: "/characters/" }
        // { label: "Ideas", url: "/ideas/" }
    ],

    // Posts on the main page. They are files in src/posts/; the form that writes them
    // only shows on your computer while `npm start` runs.
    posts: {
        // Where older versions kept posts in the browser; they're moved into files once.
        postsStorageKey: "hayal-bahcesi-posts",
        postMaxLength: 5000,
        dateLocale: "tr-TR",
        dateFormat: { dateStyle: "long", timeStyle: "short", timeZone: "Europe/Istanbul" },
        messages: {
            emptyPosts: "OMG dry as my vagina!",
            invalidPost: "Write something first bitch!",
            saveError: "Yazı kaydedilemedi. npm start hâlâ açık mı?",
            deleteError: "Yazı silinemedi. npm start hâlâ açık mı?",
            deleteConfirm: "Bu yazı silinsin mi? Dosyası da silinecek.",
            migrated: "Tarayıcıdaki eski yazılar dosyalara taşındı.",
            published: "Posted!",
            deleted: "Sent to hell!",
            deleteButton: "Delete",
            deleteLabel: "Delete post"
        }
    }
};
