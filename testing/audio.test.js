/**
 * Testing the file: audio.js
 * 
 * File: audio.test.js
 * 
 * Description: This file is used to test the notes related functions defined
 * in the file audio.js
 */
  
// Importing file to test
// const aud_fun = require("../source/local/classes/audio-object.js");
// const f_fun = require("../source/local/classes/type-f.js");
// const a_fun = require("../source/local/classes/type-a.js");
// const aud = require("../source/local/scripts/audio.js");

const functions = require("../source/local/scripts/audio.js");
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
 * Test Case: Gets all the audio
 * 
 * Input: The audio objects we want to add
 * Output: The added audio objects
 */
test("Test get_all_audio: correct usage TESTING", () => {
  folder_utils.add_typeF("testTypeF");
  folder_utils.add_typeA("testTypeF", "testTypeA");
  for(let i = 0; i < 20; i++){
    audio_utils.add_audio("testTypeF", "testTypeA", `test ${i}`, TESTFILE);
  }
  //console.log(functions.get_all_audio_names("testTypeF", "testTypeA"));
  const names = functions.get_all_audio_names("testTypeF", "testTypeA");
  expect(names).toEqual([                                                                                                                                                                                                                                                                                                                       
    'test 0',  'test 1',  'test 2',
    'test 3',  'test 4',  'test 5',
    'test 6',  'test 7',  'test 8',
    'test 9',  'test 10', 'test 11',
    'test 12', 'test 13', 'test 14',
    'test 15', 'test 16', 'test 17',
    'test 18', 'test 19'
  ]);
  folder_utils.clear_typeF("testTypeF");
  folder_utils.delete_typeF('testTypeF');
});

/**
 * Test Case: Adding an audio object without giving a name
 * 
 * Input: The audio object we want to add
 * Output: Checking for an error because the name is invalid
 */
test("Test add_audio: invalid name - EMPTY STRING", () => {
  function getter() {
    folder_utils.add_typeF("testTypeF");
    folder_utils.add_typeA("testTypeF", "testTypeA");
    functions.add_audio("testTypeF", "testTypeA", "", TESTFILE);
  }
  
  expect(getter).toThrow("AudioObj name cannot be empty");
  folder_utils.clear_typeF("testTypeF");
  folder_utils.delete_typeF('testTypeF');
});

/**
 * Test Case: Adding an audio object with a name that already exists
 * 
 * Input: The audio object we want to add
 * Output: Checking for an error because the name is invalid
 */
test("Test add_audio: invalid name - ALREADY EXISTS", () => {
  const audName = "test_Aud";
  function getter() {
    folder_utils.add_typeF("testTypeF");
    folder_utils.add_typeA("testTypeF", "testTypeA");
    functions.add_audio("testTypeF", "testTypeA", audName, TESTFILE);
    functions.add_audio("testTypeF", "testTypeA", audName, TESTFILE);
  }

  expect(getter).toThrow(`AudioObj with name "${audName}" already exists`);
  folder_utils.clear_typeF("testTypeF");
  folder_utils.delete_typeF('testTypeF');
});

/**
 * Test Case: Adding an audio object with an incorrect path
 * 
 * Input: The audio object we want to add
 * Output: Checking for an error because the name is invalid
 */
test("Test add_audio: invalid name - PATH INCORRECT", () => {
  function getter() {
    folder_utils.add_typeF("testTypeF");
    folder_utils.add_typeA("testTypeF", "testTypeA");
    functions.add_audio("testTypeF", "testTypeA", "test_Aud", TEST_REL_PATH_FAKE);
  }

  expect(getter).toThrow("Invalid audio file path");
  folder_utils.clear_typeF("testTypeF");
  folder_utils.delete_typeF('testTypeF');
});

/**
 * Test Case: Adding an audio object
 * 
 * Input: The audio object we want to add
 * Output: The name of the audio object
 */
test("Test add_audio: correct usage", () => {
  folder_utils.add_typeF("testTypeF");
  folder_utils.add_typeA("testTypeF", "testTypeA");
  audio_utils.add_audio("testTypeF", "testTypeA", "testAud", TESTFILE);
  //console.log(functions.get_all_audio_names("testTypeF", "testTypeA"));
  const names = functions.get_all_audio_names("testTypeF", "testTypeA");
  expect(names).toEqual(["testAud"]);
  folder_utils.clear_typeF("testTypeF");
  folder_utils.delete_typeF('testTypeF');
});

/**
 * Test Case: Getting a path to an audio object that doesnt exist
 * 
 * Input: The audio object we want to add
 * Output: Checking for error that object doenst exist
 */
 test("Test get_audio_path: invalid object - NO AUDIO OBJECT", () => {
  const fakeFile = "fakeFile";
  function getter() {
    folder_utils.add_typeF("testTypeF");
    folder_utils.add_typeA("testTypeF", "testTypeA");
    audio_utils.add_audio("testTypeF", "testTypeA", "testAud", TESTFILE);
    functions.get_audio_path("testTypeF", "testTypeA", fakeFile)
  }
  expect(getter).toThrow(`AudioObj with name "${fakeFile}" does not exist`);
  folder_utils.clear_typeF("testTypeF");
  folder_utils.delete_typeF('testTypeF');
});

/**
 * Test Case: Getting a path to an audio object
 * 
 * Input: The audio object we want to add
 * Output: The audio object's path
 */
test("Test get_audio_path: correct usage", () => {
  folder_utils.add_typeF("testTypeF");
  folder_utils.add_typeA("testTypeF", "testTypeA");
  audio_utils.add_audio("testTypeF", "testTypeA", "testAud", TESTFILE);
  const names = functions.get_audio_path("testTypeF", "testTypeA", "testAud");
  expect(names).toEqual(TESTFILE);
  folder_utils.clear_typeF("testTypeF");
  folder_utils.delete_typeF('testTypeF');
});

/**
 * Test Case: Delete and audio object
 * 
 * Input: The audio object we want to add
 * Output: The object is deleted
 */
 test("Test delete_audio: correct usage", () => {
  folder_utils.add_typeF("testTypeF");
  folder_utils.add_typeA("testTypeF", "testTypeA");
  audio_utils.add_audio("testTypeF", "testTypeA", "testAud", TESTFILE);
  audio_utils.delete_audio("testTypeF", "testTypeA", "testAud")
  const names = functions.get_all_audio_names("testTypeF", "testTypeA");
  expect(names).toEqual([]);
  folder_utils.clear_typeF("testTypeF");
  folder_utils.delete_typeF('testTypeF');
});

/**
 * Test Case: Updating an audio object that does not exist
 * 
 * Input: The audio object we want to add
 * Output: Checking for error that path doenst exist
 */
 test("Test update_audio_path: invalid object - NO AUDIO OBJECT", () => {
  const fakeFile = "fakeFile";
  function getter() {
    folder_utils.add_typeF("testTypeF");
    folder_utils.add_typeA("testTypeF", "testTypeA");
    functions.update_audio_path("testTypeF", "testTypeA", fakeFile, TESTFILE);
  }
  expect(getter).toThrow(`AudioObj with name "${fakeFile}" does not exist`);
  folder_utils.clear_typeF("testTypeF");
  folder_utils.delete_typeF('testTypeF');
});