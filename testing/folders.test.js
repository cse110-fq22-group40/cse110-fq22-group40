/**
 * Testing the File: folders.js
 * 
 * File: folders.test.js
 * 
 * Description: This file is used to test the TypeF related functions defined
 * in the file folders.js
 */
const functions = require("../source/local/scripts/folders.js");
const { resolve } = require("path");
const { TypeF, utils } = require("../source/local/imports.js");

const TESTING_ABS_PATH = resolve(__dirname, "testFiles");
const TESTING_REL_PATH = "../../../testing/testFiles";

const MP3 = "/moonlight-sonata.mp3";

const TESTFILE_REL = TESTING_REL_PATH + MP3;
const TESTFILE_ABS = TESTING_ABS_PATH + MP3;

/**
 * Test Case: Test adding a typeA folder to the typeFObj
 * 
 * Input: A name for type A folder
 * Output: We check for a pass because we just added a new typeA folder to a 
 * typeF folder. TypeF folder should contain the typeA folder.
 */
test("Test add_typeA: correct name - CORRECT USAGE", () => { 
	const newTypeF = new TypeF("test_typeFFF");
	functions.save_typeF_in_local_storage("test_typeFFF");
	functions.add_typeA("test_typeFFF", "test_typeAAA");

	console.log(newTypeF);
	expect(newTypeF).toEqual({"dict_audio": {"dict_typeA": {}}});
});


  
