// Importing file to test
const utils = require("../source/local/scripts/utils.js");
const { folder_utils, audio_utils, notes_utils} = require("../source/local/imports.js");
const { resolve } = require("path");

// Constants
const TESTING_ABS_PATH = resolve(__dirname, "testFiles");
const TESTING_REL_PATH = "../../../testing/testFiles";

const MP3 = "/moonlight-sonata.mp3";
const NON_EXISTENT_MP3 = "/fake.mp3";
const TESTFILE = TESTING_REL_PATH + MP3;

const TEST_REL_PATH_REAL = TESTING_REL_PATH + MP3;
const TEST_ABS_PATH_REAL = TESTING_ABS_PATH + MP3;
const TEST_REL_PATH_FAKE = TESTING_REL_PATH + NON_EXISTENT_MP3;
const TEST_ABS_PATH_FAKE = TESTING_ABS_PATH + NON_EXISTENT_MP3;

const TIMESTAMP_EX1 = 1;
const TIMESTAMP_EX2 = 5;

const NOTE_EX1 = "This needs more dynamics!";
const NOTE_EX2 = "More crescendo!";


/**
 * Test Case: Testing correctness of log function
 * 
 * Input: Inputting a message to log
 * Output: Expect the message to console log
 */
test("Log message: correct implementation", () => {
  console.log = jest.fn();
  utils._log("error message");
  expect(console.log).toHaveBeenCalledWith("error message");
});

/**
 * Test Case: Testing correctness of updating typeF name
 * 
 * Input: Inputting a typeF folder
 * Output: Expect the typeF folder to be renamed
 */
 test("Update name typeF: Correct implementation", () => {
  folder_utils.add_typeF("testTypeF");
  utils.update_name("testTypeF2", "testTypeF");
  const names = folder_utils.get_all_typeF_names();
  expect(names).toEqual(["testTypeF2"]);
  folder_utils.clear_typeF("testTypeF2");
  folder_utils.delete_typeF("testTypeF2");
});

/**
 * Test Case: Testing correctness of updating typeA name
 * 
 * Input: Inputting a typeA folder
 * Output: Expect the typeA folder to be renamed
 */
 test("Update name typeA: Correct implementation", () => {
  folder_utils.add_typeF("testTypeF");
  folder_utils.add_typeA("testTypeF", "testTypeA");
  utils.update_name("testTypeA2", "testTypeF", "testTypeA");
  const names = folder_utils.get_all_typeA_names("testTypeF");
  expect(names).toEqual(["testTypeA2"]);
  folder_utils.clear_typeF("testTypeF");
  folder_utils.delete_typeF('testTypeF');
});

/**
 * Test Case: Testing correctness of updating AudioObject name
 * 
 * Input: Inputting an AudioObject
 * Output: Expect the AudioObject to be renamed
 */
 test("Update name AudioObject: Correct implementation", () => {
  folder_utils.add_typeF("testTypeF");
  folder_utils.add_typeA("testTypeF", "testTypeA");
  audio_utils.add_audio("testTypeF", "testTypeA", "testAud", TESTFILE);
  utils.update_name("testAud2", "testTypeF", "testTypeA", "testAud");
  const names = audio_utils.get_all_audio_names("testTypeF", "testTypeA");
  expect(names).toEqual(["testAud2"]);
  folder_utils.clear_typeF("testTypeF");
  folder_utils.delete_typeF('testTypeF');
});

/**
 * Test Case: Testing updating typeF to empty string
 * 
 * Input: Inputting a typeF folder
 * Output: Expect the typeF folder to throw an error
 */
// TODO:
 test("Update name typeF: EMPTY STRING", () => {
  function getter() {
    folder_utils.add_typeF("testTypeF");
    utils.update_name("", "testTypeF");
  }
  expect(getter).toThrow("TypeF folder name cannot be empty");
  folder_utils.clear_typeF("testTypeF");
  folder_utils.delete_typeF("testTypeF");
});

/**
 * Test Case: Testing updating typeF to empty string
 * 
 * Input: Inputting a typeF folder
 * Output: Expect the typeF folder to throw an error
 */
 test("Update name typeF: OLD NAME DOESNT EXIST", () => {
  const fakeName = "fakeName";
  function getter() {
    folder_utils.add_typeF("testTypeF");
    utils.update_name("testTypeF", fakeName);
  }
  expect(getter).toThrow(`TypeF folder with name "${fakeName}" doesn't exist`);
  folder_utils.clear_typeF("testTypeF");
  folder_utils.delete_typeF("testTypeF");
});

/**
 * Test Case: Testing updating typeF to a name that already exists
 * 
 * Input: Inputting a typeF folder
 * Output: Expect the typeF folder to throw an error
 */
 test("Update name typeF: NAME ALREADY EXISTS", () => {
  const typeFname = "testTypeF";
  function getter() {
    folder_utils.add_typeF("testTypeF");
    utils.update_name("testTypeF", typeFname);
  }
  expect(getter).toThrow(`TypeF folder with name "${typeFname}" already exists`);
  folder_utils.clear_typeF("testTypeF");
  folder_utils.delete_typeF("testTypeF");
});

/**
 * Test Case: Testing updating typeA to empty string
 * 
 * Input: Inputting a typeA folder
 * Output: Expect the typeA folder to throw an error
 */
 test("Update name typeA: EMPTY STRING", () => {
  function getter() {
    folder_utils.add_typeF("testTypeF");
    folder_utils.add_typeA("testTypeF", "testTypeA");
    utils.update_name("", "testTypeF", "testTypeA");
  }
  expect(getter).toThrow("TypeA folder name cannot be empty");
  folder_utils.clear_typeF("testTypeF");
  folder_utils.delete_typeF("testTypeF");
});

/**
 * Test Case: Testing updating typeA that doesnt exist
 * 
 * Input: Inputting a typeA folder
 * Output: Expect the typeA folder to throw an error
 */
 test("Update name typeA: OLD NAME DOESNT EXIST", () => {
  const fakeName = "fakeName";
  function getter() {
    folder_utils.add_typeF("testTypeF");
    folder_utils.add_typeA("testTypeF", "testTypeA");
    utils.update_name("testTypeA", "testTypeF", fakeName);
  }
  expect(getter).toThrow(`TypeA folder with name "${fakeName}" doesn't exist`);
  folder_utils.clear_typeF("testTypeF");
  folder_utils.delete_typeF("testTypeF");
});

/**
 * Test Case: Testing updating typeA to a name that already exists
 * 
 * Input: Inputting a typeA folder
 * Output: Expect the typeA folder to throw an error
 */
 test("Update name typeA: NAME ALREADY EXISTS", () => {
  const typeAname = "testTypeA";
  function getter() {
    folder_utils.add_typeF("testTypeF");
    folder_utils.add_typeA("testTypeF", "testTypeA");
    utils.update_name(typeAname, "testTypeF", "testTypeA");
  }
  expect(getter).toThrow(`TypeA folder with name "${typeAname}" already exists`);
  folder_utils.clear_typeF("testTypeF");
  folder_utils.delete_typeF("testTypeF");
});

/**
 * Test Case: Testing updating AudioObject to empty string
 * 
 * Input: Inputting an AudioObject folder
 * Output: Expect the AudioObject to throw an error
 */
 test("Update name AudioObject: EMPTY STRING", () => {
  function getter() {
    folder_utils.add_typeF("testTypeF");
    folder_utils.add_typeA("testTypeF", "testTypeA");
    audio_utils.add_audio("testTypeF", "testTypeA", "testAud", TESTFILE);
    utils.update_name("", "testTypeF", "testTypeA", "testAud");
  }
  expect(getter).toThrow("Audio file name cannot be empty");
  folder_utils.clear_typeF("testTypeF");
  folder_utils.delete_typeF("testTypeF");
});

/**
 * Test Case: Testing updating typeA that doesnt exist
 * 
 * Input: Inputting an AudioObject folder
 * Output: Expect the AudioObject to throw an error
 */
 test("Update name AudioObject: OLD NAME DOESNT EXIST", () => {
  const fakeName = "fakeName";
  function getter() {
    folder_utils.add_typeF("testTypeF");
    folder_utils.add_typeA("testTypeF", "testTypeA");
    audio_utils.add_audio("testTypeF", "testTypeA", "testAud", TESTFILE);
    utils.update_name("testAud", "testTypeF", "testTypeA", fakeName);
  }
  expect(getter).toThrow(`Audio file with name "${fakeName}" doesn't exist`);
  folder_utils.clear_typeF("testTypeF");
  folder_utils.delete_typeF("testTypeF");
});

/**
 * Test Case: Testing updating AudioObject to a name that already exists
 * 
 * Input: Inputting an AudioObject folder
 * Output: Expect the AudioObject to throw an error
 */

 test("Update name AudioObject: NAME ALREADY EXISTS", () => {
  const Audioname = "testAud";
  function getter() {
    folder_utils.add_typeF("testTypeF");
    folder_utils.add_typeA("testTypeF", "testTypeA");
    audio_utils.add_audio("testTypeF", "testTypeA", "testAud", TESTFILE);
    utils.update_name(Audioname, "testTypeF", "testTypeA", "testAud", TESTFILE);
  }
  expect(getter).toThrow(`Audio file with name "${Audioname}" already exists`);
  folder_utils.clear_typeF("testTypeF");
  folder_utils.delete_typeF("testTypeF");
});

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

/**
* Test Case: Testing correctness of time update timestamp
* 
* Input: Inputting a timestamp in seconds
* Output: Expect a new timestamp in seconds
*/
//TODO
test("Update Timestamp: Correct implementation", () => {
  folder_utils.add_typeF("testTypeF");
  folder_utils.add_typeA("testTypeF", "testTypeA");
  audio_utils.add_audio("testTypeF", "testTypeA", "testAud", TESTFILE);
  notes_utils.add_note("testTypeF", "testTypeA", "testAud", TIMESTAMP_EX1, NOTE_EX1);
  utils.update_timestamp("testTypeF", "testTypeA", "testAud", TIMESTAMP_EX1, TIMESTAMP_EX2);
  const names = notes_utils.get_note("testTypeF", "testTypeA", "testAud", TIMESTAMP_EX2);
  expect(names).toEqual("testTypeF", "testTypeA", "testAud", TIMESTAMP_EX2);
  folder_utils.clear_typeF("testTypeF");
  folder_utils.delete_typeF('testTypeF');
});

/**
* Test Case: Testing invalid update timestamp
* 
* Input: Inputting an invalid timestamp
* Output: Expect a thrown error
*/
//TODO
// test("Update Timestamp: OLD TIMESTAMP DOESNT EXIST", () => {
//   const fakeTime = 35;
//   function getter() {
//     folder_utils.add_typeF("testTypeF");
//     folder_utils.add_typeA("testTypeF", "testTypeA");
//     audio_utils.add_audio("testTypeF", "testTypeA", "testAud", TESTFILE);
//     notes_utils.add_note("testTypeF", "testTypeA", "testAud", TIMESTAMP_EX1, NOTE_EX1);
//     utils.update_timestamp("testTypeF", "testTypeA", "testAud", fakeTime, TIMESTAMP_EX2);
//   }
//   expect(getter).toThrow(`Note with the old timestamp "${fakeTime}" does not exist`);
//   folder_utils.clear_typeF("testTypeF");
//   folder_utils.delete_typeF('testTypeF');
// });

/**
* Test Case: Testing invalid update timestamp
* 
* Input: Inputting an invalid timestamp
* Output: Expect a thrown error
*/
//TODO
// test("Update Timestamp: NEW TIMESTAMP ALREADY EXISTS", () => {
//   const fakeTime = 35;
//   function getter() {
//     folder_utils.add_typeF("testTypeF");
//     folder_utils.add_typeA("testTypeF", "testTypeA");
//     audio_utils.add_audio("testTypeF", "testTypeA", "testAud", TESTFILE);
//     notes_utils.add_note("testTypeF", "testTypeA", "testAud", TIMESTAMP_EX1, NOTE_EX1);
//     utils.update_timestamp("testTypeF", "testTypeA", "testAud", TIMESTAMP_EX1, TIMESTAMP_EX1);
//   }
//   expect(getter).toThrow(`Note with the new timestamp "${TIMESTAMP_EX1}" already exists`);
//   folder_utils.clear_typeF("testTypeF");
//   folder_utils.delete_typeF('testTypeF');
// });

/**
* Test Case: Testing load_data correct usage
* 
* Input: Backend data
* Output: Expect the data to be loaded
*/
//TODO: how do you use this function?
// test("Load data: correct usage", () => {
//   folder_utils.add_typeF("testTypeF");
//   folder_utils.add_typeA("testTypeF", "testTypeA");
//   audio_utils.add_audio("testTypeF", "testTypeA", "testAud", TESTFILE);
//   folder_utils.clear_typeF("testTypeF");
//   folder_utils.delete_typeF('testTypeF');
// });