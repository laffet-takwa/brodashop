import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const BASE = "http://localhost:4173";
const OUT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "screenshots");

const PAGES = [
  { route: "/", file: "home.jpg" },
  { route: "/shop", file: "shop.jpg" },
  { route: "/products/premium-oversized-shirt", file: "product-detail.jpg" },
  { route: "/story", file: "story.jpg" },
  { route: "/journal", file: "journal.jpg" },
  { route: "/journal/the-autumn-edit", file: "journal-post.jpg" },
  { route: "/lookbook", file: "lookbook.jpg" },
  { route: "/wishlist", file: "wishlist.jpg" },
  { route: "/account", file: "account.jpg" },
  { route: "/contact", file: "contact.jpg" },
  { route: "/size-guide", file: "size-guide.jpg" },
  { route: "/checkout", file: "checkout.jpg" },
  { route: "/does-not-exist", file: "404.jpg" },
];

async function main() {
  fs.mkdirSync(OUT, { recursive: true });
  const browser = await chromium.launch({ channel: "chrome" });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  for (const { route, file } of PAGES) {
    await page.goto(`${BASE}${route}`, { waitUntil: "networkidle" });
    // first load shows the 2.6s preloader; later loads settle reveals
    await page.waitForTimeout(3500);
    await page.screenshot({
      path: path.join(OUT, file),
      type: "jpeg",
      quality: 85,
    });
    console.log(`saved ${file}`);
  }

  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
