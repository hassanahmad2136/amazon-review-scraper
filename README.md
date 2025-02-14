# 🌆 Amazon Review Scraper

Amazon Review Scraper is a **Chrome Extension** that extracts customer reviews from Amazon product pages. It automates the process of navigating pages and collecting structured review data, which can be exported as a CSV file.

## 🚀 Features
- ✅ **Scrape Amazon Reviews**: Automatically extract review details, including reviewer name, rating, review text, date, helpful votes, and more.
- ✅ **Pagination Support**: Fetch reviews from multiple pages using URL-based pagination.
- ✅ **CSV Export**: Download scraped reviews in a structured CSV format.
- ✅ **Simple UI**: Easy-to-use interface with a scrape button and export option.
- ✅ **Lightweight**: Runs efficiently within the browser without external dependencies.

---

## 📂 Folder Structure
```
amazon-review-scraper/
│── manifest.json               # Chrome Extension Manifest
│── icons/
│   └── icon.png                # Extension Icon
│── scripts/
│   ├── popup.js                # Main Script (Handles Scraping & Export)
│   ├── background.js           # Background Script (if needed for permissions)
│── frontend/
│   ├── popup.html              # UI Structure
│   ├── popup.css               # UI Styling
```

---

## 🔧 Installation Guide
1. **Download or Clone** this repository:
   ```sh
   git clone https://github.com/hassanahmad2136/amazon-review-scraper.git
   ```
2. Open **Google Chrome** and navigate to:
   ```
   chrome://extensions/
   ```
3. **Enable Developer Mode** (toggle in the top-right corner).
4. Click **Load Unpacked** and select the `amazon-review-scraper/` folder.
5. The extension is now installed and ready to use!

---

## 💪 Usage Instructions
1. Navigate to an Amazon product page.
2. Click on the **Amazon Review Scraper** extension icon.
3. Press **Scrape Reviews** to begin extracting reviews.
4. Once scraping is complete, click **Export CSV** to download the data.

---

## ✨ Contributing
Contributions are welcome! Feel free to submit a Pull Request or open an Issue if you encounter any problems.

---

## 💎 License
This project is licensed under the **MIT License**.

---

## 👤 Author
Developed by **Hassan Ahmad**.
For queries, contact: [hassanahmad2136@gmail.com].

