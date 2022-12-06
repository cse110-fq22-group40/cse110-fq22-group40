/**
 * Testing the File: folders.js
 * 
 * File: folders.test.js
 * 
 * Description: This file is used to test the TypeF related functions defined
 * in the file folders.js
 */
const functions = require("../source/local/scripts/folders.js");
const { dict_typeFs } = require("../source/local/imports.js");

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