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
test("Test get_all_audio: CORRECT USEAGE", () => {
  const newTypeF = new f_fun.TypeF("test_typeF"); 
  const newTypeA = new a_fun.TypeA("test_typeA");
  f_fun.dict_typeFs["test_typeF"] = newTypeF;
  newTypeF.add_typeA("test_typeA");
  newTypeA.add_audio("test_aud1", TESTFILE);
  newTypeA.add_audio("test_aud2", TESTFILE);
  newTypeA.add_audio("test_aud3", TESTFILE);

  const audioNames = aud.get_all_audio_names("test_typeF", "test_typeA");

  expect(audioNames).toBeInstanceOf(Array);
  expect(audioNames.length).toBe(3);
  expect(audioNames).toContain("test_aud1");
  expect(audioNames).toContain("test_aud2");
})

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
    f_fun.dict_typeFs["test_typeF"] = newTypeF;
    newTypeF.add_typeA("test_typeA");
    newTypeA.add_audio("test_aud", TESTFILE);
    aud.add_audio("test_typeF", "test_typeA", "", TESTFILE);
  }

  expect(getter).toThrow("AudioObj name cannot be empty");
});

/**
 * Test Case: Adding an audio object with a name that already exists
 * 
 * Input: The audio object we want to add
 * Output: Checking for an error because the name is invalid
 */
//TODO: why doesnt it work?
// test("Test add_audio: invalid name - ALREADY EXISTS", () => {
//   function getter() {
//     const newTypeF = new f_fun.TypeF("test_typeF"); 
//     const newTypeA = new a_fun.TypeA("test_typeA");
//     f_fun.dict_typeFs["test_typeF"] = newTypeF;
//     newTypeF.add_typeA("test_typeA");
//     newTypeA.add_audio("test_aud", TESTFILE);
//     aud.add_audio("test_typeF", "test_typeA", "test_aud", TESTFILE);
//   }

//   expect(getter).toThrow('AudioObj with name "test_aud" already exists');
// });

/**
 * Test Case: Adding an audio object withan incorrect path
 * 
 * Input: The audio object we want to add
 * Output: Checking for an error because the name is invalid
 */
test("Test add_audio: invalid name - PATH INCORRECT", () => {
  function getter() {
    const newTypeF = new f_fun.TypeF("test_typeF"); 
    const newTypeA = new a_fun.TypeA("test_typeA");
    f_fun.dict_typeFs["test_typeF"] = newTypeF;
    newTypeF.add_typeA("test_typeA");
    newTypeA.add_audio("test_aud", TEST_REL_PATH_FAKE);
    aud.add_audio("test_typeF", "test_typeA", "", TEST_REL_PATH_FAKE);
  }

  expect(getter).toThrow("Invalid audio file path");
});

