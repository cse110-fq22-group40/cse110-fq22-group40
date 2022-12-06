/*
beforeAll(() => {
  utils.add_typeF("testProject_Obj");
  utils.add_typeA("testProject_Obj", "testAudio_Obj");
  return utils.add_audio("testProject_Obj", "testAudio_Obj", "testObject_Obj");
});

beforeAll(() => {
  utils.add_typeF("testProject_A");
  return utils.add_typeA("testProject_A", "testProject_A");
});

beforeAll(() => {
  return utils.add_typeF("testProject_F");
});

afterAll(() => {
  return utils.remove_typeF_from_local_storage("testProject_Obj");
});

afterAll(() => {
  return utils.remove_typeF_from_local_storage("testProject_A");
});

afterAll(() => {
  return utils.remove_typeF_from_local_storage("testProject_F");
});

test('Delete type A folder named testAudio', () => {
  expect(utils.delete_typeA("testProject_A", "testAudio_A")).toBe(null);
});

test("Delete type F folder named testProject", () => {
  expect(utils.delete_typeF("testProject_F")).toBe(null);
});

test('Delete audio object named testObject', () => {
  expect(utils.delete_audio("testProject_Obj", "testAudio_Obj", "testObject_Obj")).toBe(null);
});
*/

const utils = require("../source/local/scripts/utils");

/**
 * Test Case: Testing correctness of log function
 * 
 * Input: Inputting a message to log
 * Output: Expect the message to console log
 */
// test("Log message: correct implementation", () => {
//   console.log = jest.fn();
//   utils._log("error message");
//   expect(console.log).toHaveBeenCalledWith("error message");
// });

/**
 * Test Case: Testing correctness of time formatting function
 * 
 * Input: Inputting a time to format in seconds
 * Output: Expect a time in hours:minutes:seconds
 */
 test("Format time: correct implementation - less than an hour", () => {
   const timeInSeconds = 300;
   const timeFormatted = utils.format_time(timeInSeconds);
   expect(timeFormatted).toEqual("5:00");
});

/**
 * Test Case: Testing correctness of time formatting function
 * 
 * Input: Inputting a time to format in seconds
 * Output: Expect a time in hours:minutes:seconds
 */
 test("Format time: correct implementation - more than an hour", () => {
  const timeInSeconds = 4200;
  const timeFormatted = utils.format_time(timeInSeconds);
  expect(timeFormatted).toEqual("1:10:00");
});