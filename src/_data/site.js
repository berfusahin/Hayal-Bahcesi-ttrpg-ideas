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

    // The "Post an Update" box on the main page.
    posts: {
        postsStorageKey: "hayal-bahcesi-posts",
        postMaxLength: 5000,
        dateLocale: "tr-TR",
        dateFormat: { dateStyle: "long", timeStyle: "short" },
        messages: {
            emptyPosts: "OMG dry as my vagina!",
            invalidPost: "Write something first bitch!",
            loadError: "Yazılar yüklenemedi. Tarayıcı depolama alanını kontrol edin.",
            saveError: "Yazı kaydedilemedi. Tarayıcı depolama alanını kontrol edin.",
            deleteError: "Yazı silinemedi. Tarayıcı depolama alanını kontrol edin.",
            published: "Posted!",
            deleted: "Sent to hell!",
            deleteButton: "Delete",
            deleteLabel: "Delete post"
        }
    }
};
