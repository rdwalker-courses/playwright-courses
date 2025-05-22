import { test, expect, chromium, Locator } from "@playwright/test";
import { title } from "process";

  test.beforeEach(async ({ page }) => {
    await page.goto("https://playwright.dev/");
  });


  test.describe("documentaion",()=>{

    test('test', async ({ page }) => {
      await page.getByRole('link', { name: 'Docs' }).click();
    
      
      await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
  
      await page.getByRole('link', { name: 'HTML Test Reports', exact: true }).click();
      await expect(page.getByRole('heading', { name: 'HTML Test ReportsDirect link' })).toBeVisible();
  
      await page.getByRole('link', { name: "What's next", exact: true }).click();
      await expect(page.getByRole('heading', { name: "What's nextDirect link to" })).toBeVisible();
      await expect(page.getByRole('link', { name: 'Next Writing tests »' })).toBeVisible();
    });
    
    test("getting started' section order",{tag:"@smoke"}, async ({ page }) => {
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
    
  })



test("logo should redirect to the main page",{tag:"@smoke"}, async ({ page }) => {
  await page.getByRole("link", { name: "Docs" }).click();

  await expect(page).toHaveURL(/docs/);
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
  await page.getByRole("link", { name: "Playwright logo Playwright" }).click();

  await expect(page).toHaveURL("https://playwright.dev/");
});

test("search should return at least one item", async ({ page }) => {
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


test("test", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  const switchModeButton = await page.locator("button[title*='Switch']");

  const initialTheme = await switchModeButton.getAttribute("title");
  console.log(`Initial theme ${initialTheme}`);

  await await switchModeButton.dblclick();

  const newTheme = await switchModeButton.getAttribute("title");
  console.log(`New theme ${newTheme?.substring(newTheme.lastIndexOf('currently '))}`)

  await expect(await switchModeButton).not.toHaveAttribute("title", `${initialTheme}`);


});
