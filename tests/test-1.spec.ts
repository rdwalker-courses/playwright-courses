import { test, expect } from "@playwright/test";

test("add to cart", async ({ page }) => {
  await page.goto("https://coffee-cart.app/");
  await expect(page.locator('[data-test="checkout"]')).toBeVisible();
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Espresso_Macchiato"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await expect(page.getByText("It's your lucky day! Get an")).toBeVisible();
  await page.getByRole("button", { name: "Nah, I'll skip." }).click();
  await expect(page.locator('[data-test="checkout"]')).toContainText("$41.00");
});

test("checkout with user", async ({ page }) => {
  await page.goto("https://coffee-cart.app/");
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.getByRole("textbox", { name: "Name" }).click();
  await expect(
    page.getByRole("heading", { name: "Payment details" })
  ).toBeVisible();
  await page.getByRole("textbox", { name: "Name" }).click();
  await page.getByRole("textbox", { name: "Name" }).fill("roman");
  await page.getByRole("textbox", { name: "Name" }).press("Tab");
  await page.getByRole("textbox", { name: "Email" }).fill("roman@test.io");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(
    page.getByRole("button", { name: "Thanks for your purchase." })
  ).toBeVisible();
});

test("cart edit", async ({ page }) => {
  await page.goto("https://coffee-cart.app/");
  await page.goto("https://coffee-cart.app/");
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[data-test="Cappuccino"]').click();
  await page.locator('[data-test="Flat_White"]').click();
  await page.getByRole("button", { name: "Nah, I'll skip." }).click();
  await page.getByRole("link", { name: "Cart page" }).click();
});
