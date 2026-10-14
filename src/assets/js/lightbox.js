// Click a picture marked "zoomable" to see it big; click anywhere or press Esc to close.
(() => {
    const dialog = document.querySelector("dialog.lightbox");
    if (!dialog) return;
    const big = dialog.querySelector("img");

    document.addEventListener("click", (event) => {
        const picture = event.target.closest("img.zoomable");
        if (picture) {
            big.src = picture.currentSrc || picture.src;
            big.alt = picture.alt;
            dialog.showModal();
        } else if (dialog.open) {
            dialog.close();
        }
    });
})();
