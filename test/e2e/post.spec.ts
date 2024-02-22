import { test, expect, Page } from "@playwright/test";

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
  await page.goto("http://localhost:3000/login");
  await page.getByLabel("Email").fill("Sincere@april.biz");
  await page.getByLabel("Password").fill("erTy3r4t");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForURL("http://localhost:3000");
});

test.afterAll(async () => {
  await page.close();
});

test("render all post", async () => {
  await expect(page.getByRole("heading", { name: "Posts" })).toBeVisible();
});

test("show post", async () => {
  const row = await page.getByRole("row").nth(4);
  const title = await row.getByRole("cell").textContent();

  await row.click();
  await page.waitForURL("http://localhost:3000/97");

  await expect(
    page.getByRole("heading", { name: title as string })
  ).toBeVisible();

  await expect(page.getByText("Author")).toBeVisible();
  await expect(page.getByText("Comments")).toBeVisible();
});
