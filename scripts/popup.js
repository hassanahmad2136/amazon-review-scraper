document.addEventListener("DOMContentLoaded", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
        let url = tabs[0].url;
        let match = url.match(/(https?:\/\/www\.amazon\..*?\/product-reviews\/[A-Z0-9]+)/);

        if (match) {
            document.getElementById("reviews").innerHTML = `
            `;
            fetchReviewsSequentially(match[1], 1, 10);
        } else {
            document.getElementById("reviews").innerText = "Not a valid Amazon review page.";
        }
    });
});

function fetchReviewsSequentially(baseUrl, startPage, endPage) {
    let currentPage = startPage;
    let totalPages = endPage - startPage + 1;
    
    function fetchNextPage() {
        if (currentPage > endPage) {
            document.getElementById("loading-status").innerText = "All reviews loaded!";
            document.getElementById("progress-bar").style.width = "100%";
            return;
        }

        let reviewPageUrl = `${baseUrl}/?pageNumber=${currentPage}`;
        document.getElementById("loading-status").innerText = `Loading page ${currentPage}...`;

        chrome.runtime.sendMessage({ action: "fetch_reviews", url: reviewPageUrl }, response => {
            if (response.success) {
                let reviews = parseAmazonReviews(response.html);
                appendReviewsToUI(reviews);
                
                // Update progress bar
                let progressPercent = ((currentPage - startPage + 1) / totalPages) * 100;
                document.getElementById("progress-bar").style.width = `${progressPercent}%`;
            }

            currentPage++;
            fetchNextPage();
        });
    }

    fetchNextPage();
}

// Function to parse Amazon reviews from response HTML
function parseAmazonReviews(htmlString) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(htmlString, "text/html");

    let liNodes = doc.evaluate(
        "/html/body/div[1]/div[2]/div/div[1]/div/div[1]/div[5]/div[3]/div/ul[1]/li",
        doc,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );

    let reviews = [];

    for (let i = 0; i < liNodes.snapshotLength; i++) {
        let li = liNodes.snapshotItem(i);
        let aTags = li.querySelectorAll("a");

        if (aTags.length < 4) continue;

        let reviewDate = li.querySelector("span > div > div > span")?.innerText.trim() || null;
        let reviewData = li.querySelector("span > span:nth-of-type(1)")?.innerText.trim() || 
                         li.querySelector("span > div > div > div:nth-of-type(4) > span > span:nth-of-type(1)")?.innerText.trim() || 
                         null;

        let helpfulVotesTag = li.querySelector("span > div > div > div:nth-of-type(5) > div > span:nth-of-type(1) > div:nth-of-type(1) > span");
        let helpfulVoteCount = 0;
        if (helpfulVotesTag) {
            let text = helpfulVotesTag.innerText.trim();
            if (text.includes("One person")) {
                helpfulVoteCount = 1;
            } else {
                let match = text.match(/\d+/);
                helpfulVoteCount = match ? parseInt(match[0], 10) : 0;
            }
        }

        let reviewerProfileURL = aTags[0]?.getAttribute("href") || "";
        let reviewerName = aTags[0]?.innerText.trim() || "";
        let reviewURL = aTags[1]?.getAttribute("href") || "";
        let rating = aTags[1]?.querySelector("i > span")?.innerText.trim() || null;
        let reviewTitle = aTags[1]?.querySelectorAll("span")[2]?.innerText.trim() || null;
        let variant = aTags[2]?.innerText.trim() || null;
        let purchaseStatus = aTags[3]?.innerText.trim() || null;

        if (reviewerProfileURL && !reviewerProfileURL.startsWith("http")) {
            reviewerProfileURL = "https://www.amazon.com" + reviewerProfileURL;
        }
        if (reviewURL && !reviewURL.startsWith("http")) {
            reviewURL = "https://www.amazon.com" + reviewURL;
        }

        reviews.push({
            review_date: reviewDate,
            review_data: reviewData,
            reviewer_name: reviewerName,
            reviewer_profile_url: reviewerProfileURL,
            review_url: reviewURL,
            rating: rating,
            review_title: reviewTitle,
            variant: variant,
            purchase_status: purchaseStatus,
            helpful_vote_count: helpfulVoteCount
        });
    }
    console.log(reviews)
    return reviews;
}

// Function to append reviews dynamically while loading
function appendReviewsToUI(reviews) {
    let container = document.getElementById("reviews");

    reviews.forEach(review => {
        let div = document.createElement("div");
        div.classList.add("review");

        div.innerHTML = `
            <p><strong>${review.reviewer_name}</strong> (${review.review_date})</p>
            <p>⭐ ${review.rating}</p>
            <p>${review.review_data}</p>
            <a href="${review.review_url}" target="_blank">View Review</a>
            <hr>
        `;

        container.appendChild(div);
    });
}
