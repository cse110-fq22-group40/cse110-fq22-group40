/**
 * Testing the File: folders.js
 * 
 * File: folders.test.js
 * 
 * Description: This file is used to test the TypeF related functions defined
 * in the file folders.js. Note that some of the test relay on the test before 
 * it so, please be carefully when editing/deleting test cases. 
 */
const functions = require("../source/local/scripts/folders.js");

const { dict_typeFs } = require("../source/local/imports.js");

//Emmanuel Adding audio to typeA
const audFunctions = require("../source/local/scripts/audio.js");
const TESTING_REL_PATH = "../../../testing/testFiles";
const MP3 = "/moonlight-sonata.mp3";
const TESTFILE = TESTING_REL_PATH + MP3;

/**
 * Test Case: Test adding a typeA folder to the typeFObj
 * 
 * Input: A name for type A folder
 * Output: We check for a pass because we just added a new typeA folder to a 
 * typeF folder. TypeF folder should contain the typeA folder.
 */
test("Test add_typeA: correct name - CORRECT USAGE", () => { 
  functions.add_typeF("test_typeF");
  functions.add_typeA("test_typeF", "test_typeA");

  expect(dict_typeFs["test_typeF"]).toEqual({
    "dict_typeA": {"test_typeA": {"dict_audio":{}}}
  });
});

/**
 * Test Case: Test adding a typeA folder with empty name to the typeFObj
 * 
 * Input: An empty name for the type A folder
 * Output: We check for an error because we shouldn't be able to add a new typeA 
 * folder with no name to the typeF folder.
 */
test("Test add_typeA: empty name - EMPTY STRING",() => {
  function getter(){
    functions.add_typeA("test_typeF","");
  }

  expect(getter).toThrow("TypeA folder name cannot be empty");
});

/**
 * Test Case: Test adding a typeA folder with existing name to the typeFObj
 * 
 * Input: An exisiting name for the type A folder
 * Output: We check for an error because we shouldn't be able to add a new typeA 
 * folder with existed name to the typeF folder.
 */
test("Test add_typeA: existed name - REPEATED STRING",() => {
  const typeAName = "test_typeA";
  function getter() {
    functions.add_typeA("test_typeF","test_typeA");
  }

  expect(getter).toThrow(
    `TypeA folder with name "${typeAName}" already exists`
  );
});


/**
 * Test Case: Test getting all typeA names in the typeF obj
 * 
 * Input: 20 Extra typeAObjs' names
 * Output: We check for a pass because we should be able to get all the added
 * typeA folders' names from the typeFObj using this typeFObj's name
 */
test("Test get_all_typeA_names: correct objects - CORRECT USAGE",() => {
  for(let i = 0 ; i < 20 ; i++) {
    functions.add_typeA("test_typeF",`test_typeA${i}`);
  }
  const names=functions.get_all_typeA_names("test_typeF");

  expect(names).toEqual([
    "test_typeA",
    "test_typeA0",
    "test_typeA1",
    "test_typeA2",
    "test_typeA3",
    "test_typeA4",
    "test_typeA5",
    "test_typeA6",
    "test_typeA7",
    "test_typeA8",
    "test_typeA9",
    "test_typeA10",
    "test_typeA11",
    "test_typeA12",
    "test_typeA13",
    "test_typeA14",
    "test_typeA15",
    "test_typeA16",
    "test_typeA17",
    "test_typeA18",
    "test_typeA19"
  ]);
});

//Emmanuel Test
/**
 * Test Case: Test adding a typeF folder with same name
 * 
 * Input: Name of existing file
 * Output: We check for a error because we just trying to add a folder that 
 * would have an same name of an existing file which our program should not 
 * allow.
 */
test("Test add_typeF: same name exists- ERROR", () => {
  const typeFName = "test_typeF";
  function getter() {
    functions.add_typeF(typeFName);
  }
  expect(getter).toThrow(
    `TypeF folder with name "${typeFName}" already exists`
    );
});
/**
 * Test Case: Test adding a typeF folder with empty name
 * 
 * Input: Empty Name
 * Output: We check for a error because we just trying to add a folder that 
 * would have an empty name which our program should not allow.
 */
test("Test add_typeF: empty name - ERROR", () => {
  function getter() {
    functions.add_typeF("");
  }
  expect(getter).toThrow(
    "TypeF folder name cannot be empty"
  );
});
/**
 * Test Case: Test getting typeA names for a nonexisting typeF folder
 * 
 * Input: Non existing typeF folder
 * Output: We check for a error because we just trying to get all type A
 * folders for a non exisitng typeF folder which our program should not allow.
 */
test("Test get_all_typeA_names: typeF name doesn't exists - ERROR", () => {
  const typeFName = "test_non_existing_typeF"; 
  function getter() {
    functions.get_all_typeA_names(typeFName);
  }

  expect(getter).toThrow(
    `TypeF folder with name "${typeFName}" doesn't exist`
    );
});
/**
 * Test Case: Testing clearing typeF folder 
 * 
 * Input: type F folder
 * Output: We check for a pass because we should be able to correctly clear a 
 * existing type F folder of its content.
 */
test("Test clear_typeF: existing file to clear - CORRECT USAGE", () => {
  functions.clear_typeF("test_typeF");

  expect(dict_typeFs["test_typeF"]).toEqual({
    "dict_typeA": {}
  });
});
/**
 * Test Case: Testing clearing a non existing typeF folder
 * 
 * Input: non existing typeF folder
 * Output: We check for a error because we just trying clear a type F folder 
 * that does not exist which our program does not allow for.
 */
test("Test clear_typeF: non existing file to clear - ERROR", () => {
  const typeFName = "test_non_existing_typeF";
  function getter() {
    functions.clear_typeF(typeFName);
  }
  expect(getter).toThrow(
    `TypeF folder with name "${typeFName}" doesn't exist`
  );
});
/**
 * Test Case: Testing clearing a existing TypeA folder
 * 
 * Input: Type A folder to clear
 * Output: We check for a pass because we should be able to correctly clear a 
 * typeA folder of its content if it exists. 
 */
test("Test clear_typeA: existing file to clear - CORRECT USAGE", () => {
  functions.add_typeA("test_typeF", "test_typeA");
  audFunctions.add_audio("test_typeF", "test_typeA", "test_audio", TESTFILE);
  functions.clear_typeA("test_typeF", "test_typeA");

  expect(dict_typeFs["test_typeF"]).toEqual({
    "dict_typeA": { "test_typeA": { "dict_audio": {} } }
  });
});
/**
 * Test Case: Testing clearing a non-existing typeA folder
 * 
 * Input: non-existing typeA folder
 * Output: We check for a error because we should not be able to clear a 
 * typeA folder if it does not even exist.
 */
test("Test clear_typeA: nonexisting file to clear - ERROR", () => {
  const typeFName = "test_non_existing_typeF"; 
  function getter() {
    functions.clear_typeA(typeFName, "test_typeA");
  }

  expect(getter).toThrow(
    `TypeF folder with name "${typeFName}" doesn't exist`
  );
});
/**
 * Test Case: Testing deleting typeA folder 
 * 
 * Input: typeA folder
 * Output: We check for a pass because we should be able to correctly
 * delete a typeA folder within a certain typeF folder if it does exists.
 */
test("Test delete_typeA: existing file to delete - CORRECT USAGE", () => {
  functions.delete_typeA("test_typeF", "test_typeA");

  expect(dict_typeFs["test_typeF"]).toEqual({
    "dict_typeA": {}
  });
});
/**
 * Test Case: Testing deleting non existing typeA folder 
 * 
 * Input: non existing typeA folder
 * Output: We check for a error because we should not be able to delete a 
 * typeA folder if it does not even exist.
 */ 
test("Test delete_typeA: non existing file to delete - ERROR", () => {
  const typeFName = "test_non_existing_typeF"; 
  function getter() {
    functions.delete_typeA(typeFName, "test_typeA");
  }
  
  expect(getter).toThrow(
    `TypeF folder with name "${typeFName}" doesn't exist`
    );
});
/**
 * Test Case: Testing getting all the names of our typeF folders
 * 
 * Input: none
 * Output: We check for a pass because we should be able to correctly get all 
 * the names of our current typeF folders.
 */
test("Test get_all_typeF_names: existing files to get names of - CORRECT USAGE", () => {
  for (let i = 1; i < 6; i++) {
    functions.add_typeF(`test_typeF${i}`);
  }
  const names = functions.get_all_typeF_names();
  expect(names).toEqual([
    "test_typeF",
    "test_typeF1",
    "test_typeF2",
    "test_typeF3",
    "test_typeF4",
    "test_typeF5"
  ]);
});
/**
 * Test Case: Testing deleting a type F folder 
 * 
 * Input: type F folder we are trying to delete
 * Output: We check for a pass because we should be able to correctly delete 
 * a typeF folder if it does exist.
 */
test("Test delete_typeF: existing file to delete - CORRECT USAGE", () => {
  functions.delete_typeF("test_typeF5");

  expect(dict_typeFs).toEqual({
    "test_typeF": { "dict_typeA": {} }, 
    "test_typeF1": { "dict_typeA": {} }, 
    "test_typeF2": { "dict_typeA": {} }, 
    "test_typeF3": { "dict_typeA": {} }, 
    "test_typeF4": { "dict_typeA": {} } 
  });
});
/**
 * Test Case: Testing deleting a non existing type F folder 
 * 
 * Input: non existing type F folder
 * Output: We check for a error because we should not be able to delete a type  
 * F folder if it does not even exist.
 */
test("Test delete_typeF: non existing file to delete - ERROR", () => {
  const typeFName = "test_non_existing_typeF";
  function getter(){
    functions.delete_typeF(typeFName);
  }

  expect(getter).toThrow(
    `TypeF folder with name "${typeFName}" doesn't exist`
    );
});




