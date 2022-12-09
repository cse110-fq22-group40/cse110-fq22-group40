/**
 * Testing the File: type-a.js
 * 
 * File: TypeA.test.js
 * 
 * Description: This file is used to test the TypeA Class defined in type-a.js
 */

// Constants
const functions = require("../source/local/classes/type-a.js");
const { resolve } = require("path");

const TESTING_ABS_PATH = resolve(__dirname, "testFiles");
const TESTING_REL_PATH = "../../../testing/testFiles";

const MP3 = "/moonlight-sonata.mp3";
// const FAKE_MP3 = "/fake-mp3.mp3";

const TESTFILE_REL = TESTING_REL_PATH + MP3;
const TESTFILE_ABS = TESTING_ABS_PATH + MP3;

// const FAKEFILE_REL = TESTING_REL_PATH + FAKE_MP3;
// const FAKEFILE_ABS = TESTING_ABS_PATH + FAKE_MP3;

/**
 * Test Case: Testing the constructor of creating type A 
 * 
 * Input: A name for type A folder
 * Output: We check for true because we just created a new folder 
 * with no audios in it
 */
test("Test constructor typeA:", () => {
  const newTypeA = new functions.TypeA("test_typeA"); 
  expect(newTypeA).toEqual({"dict_audio": {}});
});

/**
 * Test Case: Testing adding invalid name of audio file to a type A folder
 * 
 * Input: empty string to represent name of audio file relative path
 * Output: We check for error because we can not add a empty name for 
 * a audio file 
 */ 
test("Test add_audio: invalid name relative path - EMPTY STRING", () => {
  function getter() {
    const newTypeA = new functions.TypeA("test_typeA"); 
    newTypeA.add_audio("", TESTFILE_REL);
  }

  expect(getter).toThrow("Audio file name cannot be empty");
});

/**
 * Test Case: Testing adding invalid name of audio file to a type A folder
 * 
 * Input: empty string to represent name of audio file absolute path
 * Output: We check for error because we can not add a empty name for 
 * a audio file 
 */ 
test("Test add_audio: invalid name absolute path - EMPTY STRING", () => {
  function getter() {
    const newTypeA = new functions.TypeA("test_typeA"); 
    newTypeA.add_audio("", TESTFILE_ABS);
  }

  expect(getter).toThrow("Audio file name cannot be empty");
});

/**
 * Test Case: Testing adding existing name of audio file to a type A folder
 * 
 * Input: an already existing name of audio file relative path
 * Output: We check for error because we can not same named audio files in
 * the same type A folder
 */ 
test("Test add_audio: invalid name relative path - REPEAT STRING", () => {
  const name = "test";
   function getter() {
    const newTypeA = new functions.TypeA("test_typeA"); 
    for (let i = 0; i < 20; i++) {
      newTypeA.add_audio(name, TESTFILE_REL);
    }
  }

  expect(getter).toThrow(`Audio file with name "${name}" already exists`);
});

/**
 * Test Case: Testing adding existing name of audio file to a type A folder
 * 
 * Input: an already existing name of audio file absolute path
 * Output: We check for error because we can not same named audio files in
 * the same type A folder
 */ 
test("Test add_audio: invalid name absolute path - REPEAT STRING", () => {
  const name = "test";
   function getter() {
    const newTypeA = new functions.TypeA("test_typeA"); 
    for (let i = 0; i < 20; i++) {
      newTypeA.add_audio(name, TESTFILE_ABS);
    }
  }

  expect(getter).toThrow(`Audio file with name "${name}" already exists`);
});

/**
 * Test Case: Testing trying to add invalid path  of audio file to a type A 
 * folder
 * 
 * Input: a invalid path to a supposed "audio file"
 * Output: We check for error because we should have an error showing that 
 * that path is invalid and can not be used to create a audio file
 */ 
test("Test add_audio: invalid address - NO PATH", () => {
  function getter() {
    const newTypeA = new functions.TypeA("test_typeA");
    newTypeA.add_audio("test", "");
  }

  expect(getter).toThrow("Invalid audio file path");
});

/**
 * Test Case: Testing trying to get the audioObj with the correct name
 * 
 * Input: name of the audioObj
 * Output: We check for a pass because we should have the correct 
 * audioObj returned with the corresponding name of the audioObj
 */ 
test("Test get_audio: correct return - CORRECT NAME", () => {
  const newTypeA = new functions.TypeA("test_typeA");
  newTypeA.add_audio("test", TESTFILE_REL);
  const testAudioObj = newTypeA.get_audio("test");

  expect(testAudioObj).toEqual({ "path": TESTFILE_REL, "notes": {} });
});

/**
 * Test Case: Testing trying to get all audioObjs' names 
 * Input: None
 * Output: We check for a pass because we should have all the audioObjs'
 * name returned from the typeA folder
 */ 
test("Test get_all_audio: correct return - CORRECT USAGE", () => {
  const newTypeA = new functions.TypeA("test_typeA");
  for(let i = 0; i < 20; i++){
    newTypeA.add_audio(`test ${i}`, TESTFILE_REL);
  }
  const names = newTypeA.get_all_audio_names();

  expect(names).toEqual([
    'test 0',  'test 1',  'test 2',
    'test 3',  'test 4',  'test 5',
    'test 6',  'test 7',  'test 8',
    'test 9',  'test 10', 'test 11',
    'test 12', 'test 13', 'test 14',
    'test 15', 'test 16', 'test 17',
    'test 18', 'test 19'
  ]);
});

/**
 * Test Case: Testing trying to get all audioObjs' names 
 * Input: None
 * Output: We check for a pass because we should have all the audioObjs'
 * name returned from the typeA folder
 */ 
test("Test get_all_audio: correct empty return - CORRECT USAGE", () => {
  const newTypeA = new functions.TypeA("test_typeA");
  const names = newTypeA.get_all_audio_names();

  expect(names).toEqual([]);
});


/**
 * Test Case: Testing trying to update audio file name with correct name
 * 
 * Input: old name of relative path audio file and a new name that has never 
 * been used
 * Output: We check for a pass because we should be able to update an audioObj's
 * name with a new name that's not empty and has not been used before.
 */ 
test("Test update_audio_name: correct update - CORRECT USAGE", () => {
  const newTypeA = new functions.TypeA("test_typeA"); 
  newTypeA.add_audio("test", TESTFILE_REL);
  newTypeA.update_audio_name("test", "newTest");

  expect(newTypeA.get_audio("newTest")).toEqual({ 
    "path": TESTFILE_REL, "notes": {} 
  });
});

/**
 * Test Case: Testing trying to update audio file name with empty name
 * 
 * Input: old name of relative path audio file and empty string as new name
 * Output: We check for error because we can not an empty string as audio 
 * file name
 */ 
test("Test update_audio_name: empty newName relative path - EMPTY STRING", () => {
  function getter() {
    const newTypeA = new functions.TypeA("test_typeA"); 
    newTypeA.add_audio("test", TESTFILE_REL);
    newTypeA.update_audio_name("test", "");
  }

  expect(getter).toThrow("Audio file name cannot be empty");
});

/**
 * Test Case: Testing trying to update audio file name with empty name
 * 
 * Input: old name of absolute path audio file and empty string as new name
 * Output: We check for error because we can not have a empty string as 
 * audio file name
 */ 
test("Test update_audio_name: empty newName absolute path - EMPTY STRING", () => {
  function getter() {
    const newTypeA = new functions.TypeA("test_typeA"); 
    newTypeA.add_audio("test", TESTFILE_ABS);
    newTypeA.update_audio_name("test", "");
  }

  expect(getter).toThrow("Audio file name cannot be empty");
});

/**
 * Test Case: Testing trying to update empty audio file name with new name 
 * 
 * Input: old name being empty string and new name of relative path audio file
 * Output: We check for error because we can not have a empty string as
 * audio file name
 */ 
test("Test update_audio_name: empty oldName relative path - EMPTY STRING", () => {
  function getter() {
    const newTypeA = new functions.TypeA("test_typeA"); 
    newTypeA.add_audio("test", TESTFILE_REL);
    newTypeA.update_audio_name("", "test");
  }

  expect(getter).toThrow("Audio file with name \"\" doesn't exist");
});

/**
 * Test Case: Testing trying to update empty audio file name with new name
 * 
 * Input: old name being empty string and new name of absolute path audio file
 * Output: We check for error because we can not an empty string as audio 
 * file name
 */ 
test("Test update_audio_name: empty oldName absolute path - EMPTY STRING", () => {
  function getter() {
    const newTypeA = new functions.TypeA("test_typeA"); 
    newTypeA.add_audio("test", TESTFILE_ABS);
    newTypeA.update_audio_name("", "test");
  }

  expect(getter).toThrow("Audio file with name \"\" doesn't exist");
});

/**
 * Test Case: Testing the updating a non existing audio file
 * 
 * Input: a audio file that does not exist
 * Output: We check for error because we can not find a audio file
 * that exist with the name that came in as a input
 */
test("Test update_audio_name: invalid name - DOES NOT EXIST", () => {
  const name = "test";

  function getter() {
    const newTypeA = new functions.TypeA("test_typeA"); 
    newTypeA.update_audio_name(name);
  }

  expect(getter).toThrow(`Audio file with name "${name}" doesn't exist`);
});

/**
 * Test Case: Testing updating audio file to something with same name
 * 
 * Input: old name that it audio file which was a relative path and new
 * repeat name we are trying to use
 * Output: We check for error because we can not have two audio files that
 * are of the same name
 */
test("Test update_audio_name: Audio same name relative path - REPEATED NAME FILE", () => {
  const name1 = "test";
  const name2 = "test2";

  function getter() {
    const newTypeA = new functions.TypeA("test_typeA"); 
    newTypeA.add_audio(name1, TESTFILE_REL);
    newTypeA.add_audio(name2, TESTFILE_REL);
    newTypeA.update_audio_name(name2, name1);
  }

  expect(getter).toThrow(`Audio file with name "${name1}" already exists`);
});

/**
 * Test Case: Testing updating audio file to something with same name
 * 
 * Input: old name that it audio file which was a absolute path and new
 * repeat name we are trying to use
 * Output: We check for error because we can not have two audio files that
 * are of the same name
 */
test("Test update_audio_name: Audio same name absolute path - REPEATED NAME FILE", () => {
  const name1 = "test";
  const name2 = "test2";

  function getter() {
    const newTypeA = new functions.TypeA("test_typeA"); 
    newTypeA.add_audio(name1, TESTFILE_ABS);
    newTypeA.add_audio(name2, TESTFILE_ABS);
    newTypeA.update_audio_name(name2, name1);
  }

  expect(getter).toThrow(`Audio file with name "${name1}" already exists`);
});

/**
 * Test Case: Testing deleting audio file from type A folder
 * 
 * Input: audio file name and relative path audio file
 * Output: We check for pass because we should be able to delete an existing
 * audio file in our program
 */
//Test delete_audio(audioName)
test("Test delete_audio: correct delete relative path - CORRECT STORAGE", () => {
  const name1 = "test1";
  const name2 = "test2";

  const newTypeA = new functions.TypeA("test_typeA"); 
  newTypeA.add_audio(name1, TESTFILE_REL);
  newTypeA.add_audio(name2, TESTFILE_REL);
  newTypeA.delete_audio(name1, TESTFILE_REL);

  expect(newTypeA).toEqual({ "dict_audio": { "test2": { "path": TESTFILE_REL, "notes": {} } } });
});

/**
 * Test Case: Testing deleting a non existing audio file in type A folder
 * 
 * Input: Non existing name of audio file
 * Output: We check for an error because we should not be able to delete 
 * a audio file that does not exist
 */
test("Test delete_audio: invalid name relative path - DOES NOT EXIST", () => {
  const name1 = "test1";
  const name2 = "test2";
  const name3 = "test3";

  function getter() {
    const newTypeA = new functions.TypeA("test_typeA"); 
    newTypeA.add_audio(name1, TESTFILE_REL);
    newTypeA.add_audio(name2, TESTFILE_REL);
    newTypeA.delete_audio(name3);
  }

  expect(getter).toThrow(`Audio file with name "${name3}" doesn't exist`);
});

/**
 * Test Case: Testing deleting a non existing audio file in type A folder
 * 
 * Input: Non existing name of audio file
 * Output: We check for an error because we should not be able to delete 
 * a audio file that does not exist
 */
test("Test delete_audio: invalid name absolute path- DOES NOT EXIST", () => {
  const name1 = "test1";
  const name2 = "test2";
  const name3 = "test3";

  function getter() {
    const newTypeA = new functions.TypeA("test_typeA"); 
    newTypeA.add_audio(name1, TESTFILE_ABS);
    newTypeA.add_audio(name2, TESTFILE_ABS);
    newTypeA.delete_audio(name3);
  }

  expect(getter).toThrow(`Audio file with name "${name3}" doesn't exist`);
});

/**
 *  Test Case: Testing clearing a type A folder which used relative path audios
 * 
 * Input: none
 * Output: We check for a pass because we should be able to delete all the 
 * audio files within a Type A folder
 */
test("Testing clear_folder: relative path", () => {
  const newTypeA = new functions.TypeA("test_typeA"); 
  let name = "test";

  for (let i = 0; i < 100; i++) {
    newTypeA.add_audio(name, TESTFILE_REL);
    const addOne = i + 1;
    const mod = addOne.toString();
    name += mod;
  }

  newTypeA.clear_folder();
  expect(newTypeA).toEqual({ "dict_audio": {} });
});

/**
 * Test Case: Testing clearing a type A folder which used absolute path audios
 * 
 * Input: none
 * Output: We check for a pass because we should be able to delete all the 
 * audio files within a Type A folder
 */
test("Testing clear_folder: absolute path", () => {
  const newTypeA = new functions.TypeA("test_typeA"); 
  let name = "test";

  for (let i = 0; i < 100; i++) {
    newTypeA.add_audio(name, TESTFILE_ABS);
    const addOne = i + 1;
    const mod = addOne.toString();
    name += mod;
  }

  newTypeA.clear_folder();
  expect(newTypeA).toEqual({ "dict_audio": {} });
});