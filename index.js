const { chromium } = require("playwright");
const fs = require("fs"); // Import the file system module

async function sortHackerNewsArticles() {
  // launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  const articles = []; //An array to store article data.
  let articleRank = 0; //A variable to track the highest rank of article collected so far

  while (articleRank < 100) {
    // Fetch all articles on the current page with its rank and publish time
    const newArticles = await page.$$eval(".athing", articlesOnPage => {
      return articlesOnPage.map(article => {
        const rankElement = article.querySelector(".rank");
        if (!rankElement) return null;

        const rank = parseInt(rankElement.innerText.replace(".", ""));
        const titleElement = article.querySelector(".title a");
        const ageElement = article.nextElementSibling?.querySelector(".age");
        const title = titleElement ? titleElement.innerText : "No title";
        const ageText = ageElement ? ageElement.innerText : "No age";

        return { rank, title, ageText };
      }).filter(Boolean); // Filter out any null entries
    });

    // Add new articles to the main list and update articleRank
    for (let article of newArticles) {
      if (article.rank > 100) break;
      articles.push(article);
      articleRank = article.rank;
    }

    // If article rank is still less than 100, click "More" to load more articles
    if (articleRank < 100) {
      await page.click(".morelink");
      await page.waitForLoadState("networkidle"); // Wait for the next page to load
    }
  }

  // Show articles in the Table format
  console.table(articles);

  // Convert age text to a comparable format
  const parseAge = (ageText) => {
    const [amount, unit] = ageText.split(" ");
    const multiplier = { "minute": 1, "minutes": 1, "hour": 60, "hours": 60, "day": 1440, "days": 1440 };
    return parseInt(amount) * (multiplier[unit] || 0);
  };

  // Sort articles from newest to oldest
  const sorted = articles.slice().sort((a, b) => parseAge(a.ageText) - parseAge(b.ageText));
  const isSorted = JSON.stringify(articles) === JSON.stringify(sorted);

  // Log a message once all 100 articles sorted
  console.log(`The first 100 articles are ${isSorted ? "" : "not "}sorted from newest to oldest.`);

  // Store articles in a CSV file
  const csvData = [
    ["Rank", "Title", "Age"].join(","),
    ...sorted.map(article => [article.rank, `"${article.title}"`, article.ageText].join(","))
  ].join("\n");

  fs.writeFileSync("hacker_news_articles.csv", csvData, "utf8");
  console.log("Articles have been saved to hacker_news_articles.csv");

  await browser.close();
}

(async () => {
  await sortHackerNewsArticles();
})();