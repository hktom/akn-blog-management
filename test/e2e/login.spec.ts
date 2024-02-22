import { test, expect } from "@playwright/test";

test("login", async ({ page }) => {
  await page.goto("http://localhost:3000/login");

  await page.getByLabel("Email").fill("Sincere@april.biz");
  await page.getByLabel("Password").fill("erTy3r4t");
  await page.getByRole("button", {name:"Login"}).click();

  await page.waitForURL("http://localhost:3000");

  await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();
});
