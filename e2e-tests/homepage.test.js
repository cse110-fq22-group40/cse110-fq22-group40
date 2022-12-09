const { _electron: electron } = require("playwright")
const { test, expect } = require("@playwright/test")
const path = require("path");


let window;
let electronApp;
//const filePath = "e2e-tests/moonlight-sonata.mp3"

test.beforeAll(async () => {
  electronApp = await electron.launch({ args: ["source/local/app.js"] })
  window = await electronApp.firstWindow();
  const localStorage = await window.evaluate(() => {
    return localStorage.clear();// return Object.keys(localStorage).map(name => ({ name, value: localStorage.getItem(name) }));
  });
});

test("Homepage has Team LitHub in the title", async () => {
  await window.screenshot({ path: "e2e-tests/example.png" });
  const title = await window.innerText("title");
  expect(title).toBe("LitHub Front Page");
});

test("Create Type F", async () => {
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
});

test("Rename Type F", async () => {
  await window.locator("button#rename-button").click();
  const message = window.locator("input.new-name");
  await message.type("Pop");
  await window.locator("input.rename-submit").click();
  // getting the text of the new project
  const text = await window.locator("h2.card-title").textContent();
  await expect(text).toBe("Pop");
});

test("Create Type A", async () => {
  // click on "Create a New Project" button
  await window.locator("div.card.type-f-background").click();
  await window.locator("button.add-button.type-a-background").click();
  const message = window.locator("input.name");
  await message.type("Practice 1");
  await window.locator("input.create").click();
  // getting the text of the new project
  const text = await window.locator("h2.card-title").textContent();
  await expect(text).toBe("Practice 1");
});

test("Rename Type A", async () => {
  await window.locator("button#rename-button").click();
  const message = window.locator("input.new-name");
  await message.type("Practice 2");
  await window.locator("input.rename-submit").click();
  // getting the text of the new project
  const text = await window.locator("h2.card-title").textContent();
  await expect(text).toBe("Practice 2");
});

// Playwright currently has an issue with uploading files in electron where
// the path of the file is not being saved due to electron methods for 
// playwright still being "experimental". 
//(See here: https://github.com/microsoft/playwright/issues/10527)
/*
test("Create Audio", async () => {
  // click on "Create a New Project" button
  await window.locator("div.card.type-a-background").click();
  await window.locator("button.add-button.audio-object-background").click();
  const message = window.locator("input.name");
  await message.type("Sonata");

  await window.setInputFiles('input[type="file"]', filePath);

  await window.locator("input.create").click();
});


test("Rename Audio", async () => {
  await window.locator("button#rename-button").click();
  const message = window.locator("input.new-name");
  await message.type("Practice 2");
  await window.locator("input.rename-submit").click();
  // getting the text of the new project
  const text = await window.locator("h2.card-title").textContent();
  await expect(text).toBe("Practice 2");
});

test("Delete Audio", async () => {
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
*/

test("Delete Type A", async () => {
  // checking the count of children
  let count = await window.locator("h2.card-title").count();
  await window.screenshot({ path: "e2e-tests/deleteA.png" });
  expect(count).toBe(1);
  // getting rid of the new project for new tests
  await window.locator("button#delete-button").click();
  await window.locator("button.update-yes").click();
  // checking the count of updated children
  count = await window.locator("h2.card-title").count();
  expect(count).toBe(0);
});

test("Delete Type F", async () => {
  // checking the count of children
  await window.locator("id=back").click();
  await window.screenshot({ path: "e2e-tests/deleteF.png" });
  let count = await window.locator("h2.card-title").count();
  expect(count).toBe(1);
  // getting rid of the new project for new tests
  await window.locator("button#delete-button").click();
  await window.locator("button.update-yes").click();
  // checking the count of updated children
  count = await window.locator("h2.card-title").count();
  expect(count).toBe(0);
});


test.afterAll(async () => {
  await electronApp.close();
});
