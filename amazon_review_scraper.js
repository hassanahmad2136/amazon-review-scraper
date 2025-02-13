function extractReviews() {
    let liNodes = document.evaluate(
        "/html/body/div[1]/div[2]/div/div[1]/div/div[1]/div[5]/div[3]/div/ul[1]/li",
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
    );

    let reviews = [];

    for (let i = 0; i < liNodes.snapshotLength; i++) {
        let li = liNodes.snapshotItem(i);
        let aTags = li.querySelectorAll("a");

        if (aTags.length < 4) continue; // Ensure there are at least four <a> tags

        // Extract review date
        let reviewDateTag = li.querySelector("span > div > div > span");
        let reviewDate = reviewDateTag ? reviewDateTag.innerText.trim() : null;

        // Extract review data
        let reviewDataTag = li.querySelector("span > span:nth-of-type(1)");
        let reviewDataAltTag = li.querySelector("span > div > div > div:nth-of-type(4) > span > span:nth-of-type(1)");

        let reviewData = reviewDataTag && reviewDataTag.innerText.trim()
            ? reviewDataTag.innerText.trim()
            : (reviewDataAltTag ? reviewDataAltTag.innerText.trim() : null);

        // Extract helpful vote count
        let helpfulVotesTag = li.querySelector("span > div > div > div:nth-of-type(5) > div > span:nth-of-type(1) > div:nth-of-type(1) > span");
        let helpfulVoteCount = 0;

        if (helpfulVotesTag) {
            let text = helpfulVotesTag.innerText.trim();
            if (text.includes("One person")) {
                helpfulVoteCount = 1;
            } else {
                let match = text.match(/\d+/); // Extract numbers
                helpfulVoteCount = match ? parseInt(match[0], 10) : 0;
            }
        }

        // a1 - Reviewer Profile Info
        let a1 = aTags[0];
        let reviewerProfileURL = a1.href;
        let reviewerName = a1.innerText.trim();

        // a2 - Review Info
        let a2 = aTags[1];
        let reviewURL = a2.href;
        let ratingTag = a2.querySelector("i > span");
        let reviewTitleTag = a2.querySelectorAll("span")[2]; // Third <span>

        let rating = ratingTag ? ratingTag.innerText.trim() : null;
        let reviewTitle = reviewTitleTag ? reviewTitleTag.innerText.trim() : null;

        // a3 - variant
        let a3 = aTags[2];
        let variant = a3.innerText.trim();

        // a4 - Purchase Status
        let a4 = aTags[3];
        let purchaseStatus = a4.innerText.trim();

        reviews.push({
            review_date: reviewDate,
            review_data: reviewData,
            reviewer_profile_url: reviewerProfileURL,
            reviewer_name: reviewerName,
            review_url: reviewURL,
            rating: rating,
            review_title: reviewTitle,
            variant: variant,
            purchase_status: purchaseStatus,
            helpful_vote_count: helpfulVoteCount
        });
    }

    console.log(reviews);
    return reviews;
}

// Function to go to the next page and repeat
function scrapeAllPages() {
    let allReviews = [];
    
    function scrapePage() {
        let pageReviews = extractReviews();
        allReviews.push(...pageReviews);

        let nextPageButton = document.querySelector(".a-pagination .a-last a");

        if (nextPageButton) {
            console.log("Moving to the next page...");
            nextPageButton.click();
            setTimeout(scrapePage, 3000); // Wait for the page to load, then repeat
        } else {
            console.log("No more pages. Scraping finished.");
            console.log(allReviews);
        }
    }

    scrapePage();
}

scrapeAllPages();
