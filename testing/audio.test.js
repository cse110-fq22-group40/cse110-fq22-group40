/**
 * audio method Testing
 * 
 * Billy
 */
  
// Importing file to test
const aud_fun = require("../source/local/classes/audio-object.js");
const f_fun = require("../source/local/classes/type-f.js");
const a_fun = require("../source/local/classes/type-a.js");
const aud = require("../source/local/scripts/audio.js");
const { resolve } = require("path");

// Constants
const TESTING_ABS_PATH = resolve(__dirname, "testFiles");
const TESTING_REL_PATH = "../../../testing/testFiles";

const MP3 = "/moonlight-sonata.mp3";
const NON_EXISTENT_MP3 = "/fake.mp3";
const TESTFILE = TESTING_REL_PATH + MP3;

const TEST_REL_PATH_EX1 = TESTING_REL_PATH + MP3;
const TEST_ABS_PATH_EX1 = TESTING_ABS_PATH + MP3;
const TEST_REL_PATH_EX2 = TESTING_REL_PATH + NON_EXISTENT_MP3;
const TEST_ABS_PATH_EX2 = TESTING_ABS_PATH + NON_EXISTENT_MP3;

// test("Testing getting names", () => {
//   const newTypeF = new f_fun.TypeF("test_typeF"); 
//   const newTypeA = new a_fun.TypeA("test_typeA");
//   f_fun.add_typeF("test_typeF");
//   newTypeF.add_typeA("test_typeA");
//   newTypeA.add_audio("test_aud", TESTFILE);
//   console.log(aud.get_all_audio_names("test_typeF", "test_typeA"));
// });

/**
 * Test Case: Adding an audio object without giving a name
 * 
 * Input: The audio object we want to add
 * Output: Checking for an error because the name is invalid
 */
test("Test add_audio: invalid name - EMPTY STRING", () => {
  function getter() {
    const newTypeF = new f_fun.TypeF("test_typeF"); 
    const newTypeA = new a_fun.TypeA("test_typeA");
    const newAudio = new aud_fun.AudioObject(TESTFILE);
    f_fun.dict_typeFs["test_typeF"] = newTypeF;
    newTypeF.add_typeA("test_typeA");
    newTypeA.add_audio("test_aud", TESTFILE);
    aud.add_audio("test_typeF", "test_typeA", "", TESTFILE);
  }

  expect(getter).toThrow("AudioObj name cannot be empty");
});