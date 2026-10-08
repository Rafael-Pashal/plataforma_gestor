import { expect, test } from "@playwright/test";
test("carrega o shell gerencial", async ({ page }) => { await page.goto("/"); await expect(page.getByRole("heading", { name: /visão gerencial centralizada/i })).toBeVisible(); });
