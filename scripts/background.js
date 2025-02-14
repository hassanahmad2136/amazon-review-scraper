chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "fetch_reviews") {
        fetch(request.url, {
            method: "GET",
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        })
        .then(response => response.text())
        .then(html => sendResponse({ success: true, html }))
        .catch(error => sendResponse({ success: false, error: error.message }));

        return true; // Keeps the message channel open for async response
    }
});
