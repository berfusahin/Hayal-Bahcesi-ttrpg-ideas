// The posting form. Only included while `npm start` runs: it saves each post as a file in
// src/posts/ (through lib/posts-api.js), and the page reloads by itself to show it.
(() => {
    const config = window.HayalBahcesiConfig;
    const form = document.getElementById("post-form");
    const input = document.getElementById("post-content");
    const submitButton = form.querySelector("button[type='submit']");
    const list = document.getElementById("post-list");
    const status = document.getElementById("post-status");
    const headers = { "Content-Type": "application/json", "X-Hayal-Bahcesi": "1" };

    input.maxLength = config.postMaxLength;

    // The dev server reloads the page after the file is written; this is only a fallback.
    function reloadSoon() {
        setTimeout(() => location.reload(), 2500);
    }

    async function savePost(content, createdAt) {
        const response = await fetch("/__posts", {
            method: "POST",
            headers,
            body: JSON.stringify({ content, createdAt })
        });
        if (!response.ok) throw new Error(`Saving failed: ${response.status}`);
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const content = input.value.trim();
        if (!content) {
            input.setCustomValidity(config.messages.invalidPost);
            input.reportValidity();
            input.setCustomValidity("");
            return;
        }

        submitButton.disabled = true;
        try {
            await savePost(content);
            form.reset();
            status.textContent = config.messages.published;
            reloadSoon();
        } catch (error) {
            console.error("Could not save the post.", error);
            status.textContent = config.messages.saveError;
            submitButton.disabled = false;
        }
    });

    list.addEventListener("click", async (event) => {
        const button = event.target.closest(".post-delete");
        if (!button || !confirm(config.messages.deleteConfirm)) return;

        button.disabled = true;
        try {
            const response = await fetch(`/__posts/${encodeURIComponent(button.dataset.post)}`, { method: "DELETE", headers });
            if (!response.ok) throw new Error(`Deleting failed: ${response.status}`);
            button.closest(".post-item").remove();
            status.textContent = config.messages.deleted;
            reloadSoon();
        } catch (error) {
            console.error("Could not delete the post.", error);
            status.textContent = config.messages.deleteError;
            button.disabled = false;
        }
    });

    // Posts written before they were files lived in this browser only: move them into files once.
    (async () => {
        let saved;
        try {
            saved = JSON.parse(localStorage.getItem(config.postsStorageKey) || "[]");
        } catch (error) {
            return;
        }
        if (!Array.isArray(saved) || saved.length === 0) return;

        const remaining = saved.filter((post) => post && typeof post.content === "string" && post.content.trim());
        try {
            while (remaining.length) {
                await savePost(remaining[0].content, remaining[0].createdAt);
                remaining.shift();
                localStorage.setItem(config.postsStorageKey, JSON.stringify(remaining));
            }
            localStorage.removeItem(config.postsStorageKey);
            status.textContent = config.messages.migrated;
            reloadSoon();
        } catch (error) {
            // Keep them in the browser and try again next time.
            console.error("Could not move the old posts into files.", error);
        }
    })();
})();
