const { _electron: electron } = require("playwright")
const { test, expect } = require("@playwright/test")

test("EXAMPLE", async () => {
  const electronApp = await electron.launch({ args: ["source/local/app.js"] })
  const window = await electronApp.firstWindow()
  await window.screenshot({ path: "e2e-tests/example.png" })
  // close app
  await electronApp.close()
})

test("Homepage has Team LitHub in the title", async () => {
  const electronApp = await electron.launch({ args: ["source/local/app.js"] })
  const window = await electronApp.firstWindow();
  await window.locator(".add-button").click();
  // close app
  await electronApp.close()
})


test("testing to click on add button", async () => {
  const electronApp = await electron.launch({ args: ["source/local/app.js"] })
  const window = await electronApp.firstWindow()
  await window.screenshot({ path: "e2e-tests/intro.png" })
  await window.locator()
  // close app
  await electronApp.close()
})
