# **Data Scrapper ** 

This repository contains a Node.js script that uses the Playwright library to scrape the latest articles from Hacker News. The script collects, sorts, and saves the top 100 articles based on their publication time, making it a useful tool for tracking the most recent news in the tech community.

## **Features**

- **Automated Browser Navigation:** The script automatically opens a Chromium browser, navigates to the Hacker News 'Newest' page, and collects the latest articles.
- **Article Data Collection:** Extracts the rank, title, and age of each article from the Hacker News page.
- **Sorting:** The collected articles are sorted from newest to oldest based on their publication time.
- **Data Export:** The sorted articles are saved to a CSV file named `hacker_news_articles.csv` for easy access and further analysis.

## **Requirements**

To run this script, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or later)

## **Installation**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/hacker-news-article-scraper.git
   cd hacker-news-article-scraper
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## **Usage**

1. **Run the script:**
   ```bash
   node index.js
   ```

   - The script will open a Chromium browser, navigate to Hacker News, and start collecting articles.
   - It will continue to click the "More" button until it has collected at least 100 articles.

2. **Output:**
   - After the script finishes, it will display the collected and sorted articles in the console.
   - The results are saved in a CSV file named `hacker_news_articles.csv` in the project directory.

## **Code Overview**

- **`sortHackerNewsArticles` Function:** 
  - This function handles the entire process of launching the browser, navigating through the Hacker News pages, collecting article data, sorting them, and saving them to a CSV file.
  
- **Article Collection:**
  - The script gathers the article rank, title, and age and ensures that the collection continues until at least 100 articles are retrieved.
  
- **Sorting Mechanism:**
  - The articles are sorted by their age, from the newest to the oldest, before being saved to the CSV file.

## **Contributing**

If you have suggestions or improvements, feel free to fork the repository and submit a pull request. Contributions are welcome!


## **Contact**

If you have any questions or need further assistance, please open an issue in this repository or contact me at [pparitam@gmail.com](mailto:pparitam@gmail.com).

---

This README provides a clear overview of the project, how to set it up, and what it does. Feel free to adjust it based on your preferences or specific details related to your project.
