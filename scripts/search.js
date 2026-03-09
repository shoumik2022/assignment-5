const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", async (e) => {
    const searchText = e.target.value.trim();
    showLoader();
    if (!searchText) {
        await loadAllIssue();
        return;
    }
    try {
        const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${encodeURIComponent(searchText)}`);
        const data = await res.json();
        hideLoader();
        displayAllIssue(data.data);
    } catch (err) {
        hideLoader();
        console.error("Search error:", err);
    }
});