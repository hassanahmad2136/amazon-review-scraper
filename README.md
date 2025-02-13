# Amazon Review Scraper

This JavaScript script scrapes customer reviews from Amazon product pages using the browser console. It extracts review details such as reviewer name, review text, rating, purchase status, and helpful votes.

## 📌 Features
- Extracts multiple review attributes (reviewer name, rating, review text, color, etc.).
- Supports pagination to scrape all reviews from multiple pages.
- Outputs data in JSON format for easy processing.

## 🚀 How to Use
1. Open **Amazon** and navigate to the product’s customer review section.
2. Open the **Developer Console** (Press `F12` or `Ctrl + Shift + J` in Chrome).
3. Copy and paste the following script into the console and press **Enter**:

   ```js
   // Paste the amazon_scraper.js script here
   ```

   The script will automatically collect all reviews and log them in the console.

## 📚 Example Output
```json
[
  {
    "review_date": "January 10, 2024",
    "review_data": "Great product! Highly recommend.",
    "reviewer_profile_url": "https://www.amazon.com/gp/profile/amzn1.account...",
    "reviewer_name": "John Doe",
    "review_url": "https://www.amazon.com/review/...",
    "rating": "5 out of 5 stars",
    "review_title": "Awesome Purchase!",
    "variant": "color: Black",
    "purchase_status": "Verified Purchase",
    "helpful_vote_count": 3
  }
]
```

## 🔧 Requirements
- Works in Google Chrome and other modern browsers.
- No additional dependencies required.

## ⚠️ Disclaimer
This script is for educational purposes only.
Scraping Amazon may violate their Terms of Service. Use responsibly.

## 📛 License
This project is licensed under the MIT License.

---

### **Next Steps**
1. In your GitHub repository, click **"Add file" → "Create new file"**.  
2. Name it `README.md`.  
3. Paste the content above.  
4. Click **"Commit new file"**.

Let me know if you need further modifications! 🚀
