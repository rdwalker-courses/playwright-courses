import { test, expect, chromium, Locator } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://playwright.dev/");
});

test("RD-1209 documentation 'getting started' section order", async ({
  page,
}) => {
  await page.getByRole("link", { name: "Docs" }).click();
  await expect(page).toHaveURL(/docs/);
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();

  const expectedListItems: string[] = [
    "Installation",
    "Writing tests",
    "Generating tests",
    "Running and debugging tests",
    "Trace viewer",
    "Setting up CI",
  ];

  const listItems = page.locator(
    "xpath=//a[text()='Getting Started']/../following-sibling::ul/li"
  );
  await expect(listItems).toHaveText(expectedListItems, { ignoreCase: false });
});

test("RD-1210 logo should redirect to the main page", async ({ page }) => {
  await page.getByRole("link", { name: "Docs" }).click();

  await expect(page).toHaveURL(/docs/);
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
  await page.getByRole("link", { name: "Playwright logo Playwright" }).click();

  await expect(page).toHaveURL("https://playwright.dev/");
});

test("RD-1211 search should return at least one item", async ({ page }) => {
  await page.goto("https://playwright.dev/");
  await page.getByRole("button", { name: "Search (Command+K)" }).click();
  await expect(page.getByRole("searchbox", { name: "Search" })).toBeVisible();

  await page.getByRole("searchbox", { name: "Search" }).click();
  await page.getByRole("searchbox", { name: "Search" }).fill("emulation");

  const searchResult: Locator = page
    .getByRole("option", { name: "Emulation", exact: true })
    .getByRole("link");

  await expect(searchResult).toBeVisible();
  await searchResult.click();
  await expect(page.getByRole("heading", { name: "Emulation" })).toBeVisible();
});
