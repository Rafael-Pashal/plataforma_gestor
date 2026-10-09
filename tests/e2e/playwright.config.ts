import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".",
  use: { baseURL: "http://localhost:8081" },
  webServer: {
    command: "npm --prefix ../../src/frontend run dev",
    url: "http://localhost:8081",
    reuseExistingServer: true,
  },
});
