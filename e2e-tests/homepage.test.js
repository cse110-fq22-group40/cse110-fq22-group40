const { _electron: electron } = require("playwright")
const { test, expect } = require("@playwright/test")

let window;
let electronApp;

test.beforeAll(async () => {
  electronApp = await electron.launch({ args: ["source/local/app.js"] })
  window = await electronApp.firstWindow();
});

test("Homepage has Team LitHub in the title", async () => {
  await window.screenshot({ path: "e2e-tests/example.png" });
  const title = await window.innerText("title");
  expect(title).toBe("LitHub Front Page");
});

test("Create a new project button and deleting a project", async () => {
  // click on "Create a New Project" button
  await window.locator(".add-button").click();
  // take screenshot
  await window.screenshot({ path: "e2e-tests/add.png" });
  // type in input text box to name project
  const message = window.locator("input.name");
  // type Classical
  await message.type("Classical");
  // clicking on the submit button
  const submit = window.locator("input.create");
  await submit.click();
  // getting the text of the new project
  const text = await window.locator("h2.card-title").textContent();
  await expect(text).toBe("Classical");
  // checking the count of children
  let count = await window.locator("h2.card-title").count();
  expect(count).toBe(1);
  // getting rid of the new project for new tests
  await window.locator("button#delete-button").click();
  await window.locator("button.update-yes").click();
  // checking the count of updated children
  count = await window.locator("h2.card-title").count();
  expect(count).toBe(0);
});


// test("testing adding type A in type F folder", async () => {
//   //electronApp = await electron.launch({ args: ["source/local/app.js"] })
//   //window = await electronApp.firstWindow();
//   await window.locator(".add-button").click();
//   await window.screenshot({ path: "e2e-tests/add.png" });
//   const message = window.locator("input.name");
//   console.log(await message.inputValue());
//   await message.type("Classical");
// });

test.afterAll(async () => {
  await electronApp.close();
});
