const utils = require("../source/local/utils");
import puppeteer from "puppeteer";

// beforeAll(() => {
//     utils.add_typeF("testProject_Obj");
//     utils.add_typeA("testProject_Obj", "testAudio_Obj");
//     return utils.add_audio("testProject_Obj", "testAudio_Obj", "testObject_Obj");
// });

// beforeAll(() => {
//     utils.add_typeF("testProject_A");
//     return utils.add_typeA("testProject_A", "testProject_A");
// });

// beforeAll(() => {
//     return utils.add_typeF("testProject_F");
// });

// afterAll(() => {
//     return utils.delete_audio("testProject_F", "testProject_A", "testProject_Obj");
// });

// afterAll(() => {
//     return utils.clear_typeA("testProject_F", "testProject_A");
// });

// afterAll(() => {
//     return utils.remove_typeF_from_local_storage("testProject_F");
// });

// test('Delete type A folder named testAudio', () => {
//     expect(utils.delete_typeA("testProject_A", "testAudio_A")).toBe(null);
// });

// test('Delete type F folder named testProject', () => {
//     expect(utils.delete_typeF("testProject_F")).toBe(null);
// });

// test('Delete audio object named testObject', () => {
//     expect(utils.delete_audio("testProject_Obj", "testAudio_Obj", "testObject_Obj")).toBe(null);
// });

//dummy test
test("testJest", () =>{
    let result = 2*3;
    expect(result).toBe(6);
});


test("addTypeF", async()=>{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    const app = 'file:///Users/billysudirdja/Desktop/cse110-fq22-group40/source/client/index.html';
    await page.goto(app);
    
    await page.click("button");
    await page.type("button", "Classical");
    let nameInputClass = await page.$eval("button", (input) => input.className);
    //expect(nameInputClass).toBe("Classical");
    await browser.close();
});

//template test
test("", ()=>{

});