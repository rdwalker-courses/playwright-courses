import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";


test.describe("Text box", () => {
  

  test("entered values should be printed out", async ({ page }) => {
    
    const headerLogo = page.locator("//header//img");

    const formTitle = page.locator('//h1[text()="Text Box"]');
    const fullNameInput = page.locator(getInputByLabel('Full Name'));
    const emailInput = page.locator(getInputByLabel('Email'));
    const currentAddressTextArea = page.locator(getInputByLabel('Current Address'));
    const permanentAddressTextArea = page.locator(getInputByLabel('Permanent Address'));

    const submitButton = page.locator('//button[@id="submit"]');
    const outputBannerValues = page.locator('//div[@id="output"]//p');

    const userEmail = faker.internet.email();
    const userFullName = "Roomio Folio";
    const userCurrentAddress = "Vesatmin St 1721";
    const userPermanentAddress = "Hawaii District";


    await page.goto("https://demoqa.com/text-box");
    await expect(headerLogo).toBeVisible();
    await expect(formTitle).toBeVisible();

    await fullNameInput.pressSequentially(userFullName);
    await emailInput.pressSequentially(userEmail);
    await currentAddressTextArea.pressSequentially(userCurrentAddress);
    await permanentAddressTextArea.pressSequentially(userPermanentAddress);

    await submitButton.click();

    await expect(outputBannerValues).toContainText([
      `Name:${userFullName}`,
      `Email:${userEmail}`,
      `Current Address :${userCurrentAddress}`,
      `Permananet Address :${userPermanentAddress}`,
    ]);
  });
});


function getInputByLabel(label){
  return `//label[text()='${label}']/ancestor::div[contains(@id,'wrapper')]/*[child::textarea|child::input]/*`;
}



