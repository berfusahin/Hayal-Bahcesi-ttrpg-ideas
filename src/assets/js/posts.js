(() => {
    const config = window.HayalBahcesiConfig;
    const form = document.getElementById("post-form");
    const input = document.getElementById("post-content");
    const submitButton = form.querySelector("button[type='submit']");
    const list = document.getElementById("post-list");
    const status = document.getElementById("post-status");
    const dateFormatter = new Intl.DateTimeFormat(config.dateLocale, config.dateFormat);
    let posts = [];
    let persistenceReady = false;

    input.maxLength = config.postMaxLength;

    function renderPosts() {
        list.replaceChildren();

        if (posts.length === 0) {
            const emptyMessage = document.createElement("p");
            emptyMessage.textContent = config.messages.emptyPosts;
            list.append(emptyMessage);
            return;
        }

        const postElements = posts.map((post) => {
            const article = document.createElement("article");
            article.className = "post-item";

            const time = document.createElement("time");
            time.dateTime = post.createdAt;
            time.textContent = dateFormatter.format(new Date(post.createdAt));

            const content = document.createElement("p");
            content.textContent = post.content;

            const deleteButton = document.createElement("button");
            deleteButton.className = "post-delete";
            deleteButton.type = "button";
            deleteButton.textContent = config.messages.deleteButton;
            deleteButton.setAttribute("aria-label", config.messages.deleteLabel);
            deleteButton.addEventListener("click", () => deletePost(post));

            article.append(time, content, deleteButton);
            return article;
        });

        list.replaceChildren(...postElements);
    }

    function deletePost(post) {
        const updatedPosts = posts.filter((savedPost) => savedPost !== post);
        try {
            localStorage.setItem(config.postsStorageKey, JSON.stringify(updatedPosts));
        } catch (error) {
            console.error("Could not delete the post.", error);
            status.textContent = config.messages.deleteError;
            return;
        }

        posts = updatedPosts;
        renderPosts();
        status.textContent = config.messages.deleted;
    }

    try {
        const savedPosts = localStorage.getItem(config.postsStorageKey);
        if (savedPosts !== null) {
            const parsedPosts = JSON.parse(savedPosts);
            if (!Array.isArray(parsedPosts) || !parsedPosts.every((post) =>
                post !== null &&
                typeof post.content === "string" &&
                typeof post.createdAt === "string" &&
                Number.isFinite(Date.parse(post.createdAt))
            )) {
                throw new Error("Saved posts have an invalid format.");
            }
            posts = parsedPosts.sort((a, b) =>
                Date.parse(b.createdAt) - Date.parse(a.createdAt)
            );
        }
        renderPosts();
        persistenceReady = true;
    } catch (error) {
        console.error("Could not load saved posts.", error);
        status.textContent = config.messages.loadError;
        list.textContent = config.messages.loadError;
        submitButton.disabled = true;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        if (!persistenceReady) {
            return;
        }

        const content = input.value.trim();
        if (!content) {
            input.setCustomValidity(config.messages.invalidPost);
            input.reportValidity();
            input.setCustomValidity("");
            return;
        }

        const post = {
            content,
            createdAt: new Date().toISOString()
        };
        const updatedPosts = [post, ...posts];

        try {
            localStorage.setItem(config.postsStorageKey, JSON.stringify(updatedPosts));
        } catch (error) {
            console.error("Could not save the post.", error);
            status.textContent = config.messages.saveError;
            return;
        }

        posts = updatedPosts;
        renderPosts();
        form.reset();
        status.textContent = config.messages.published;
    });
})();
