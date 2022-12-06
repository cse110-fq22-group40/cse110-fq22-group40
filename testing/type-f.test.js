/**
 * Testing the File: type-f.js
 * 
 * File: TypeF.test.js
 * 
 * Description: This file is used to test the TypeF Class defined in type-f.js
 */

// Importing file to test
const functions = require("../source/local/classes/type-f.js");

/**
 * Test Case: Testing constructor to create new type F folder
 * 
 * Input: Type F folder name
 * Output: We checking for a pass because we should be able to create new 
 * type F folder 
 */
test("Test constructor typeF:", () => {
  const newTypeF = new functions.TypeF("test_typeF"); 
  expect(newTypeF).toEqual({"dict_typeA": {}});
});

/**
 * Test Case: Testing to add a type A folder to type F with no name
 * 
 * Input: empty string as type A folder name
 * Output: We checking for a error because we should not be able to add a 
 * no named type A folder into the type F folder
 */
test("Test adder typeA: invalid name - EMPTY STRING", () => {
  function getter() {
    const newTypeF = new functions.TypeF("test_typeF"); 
    newTypeF.add_typeA("");
  }

  expect(getter).toThrow("TypeA folder name cannot be empty");
});

/**
 * Test Case: Testing to add a type A folder to type F with repeat name
 * 
 * Input: type A folder name that already exist
 * Output: We checking for a error because we should not be able to add a 
 * repeat of existing type A folder that alredy a certain type F folder
 */
test("Test adder typeF: invalid name - REPEAT STRING", () => {
  const name = "test";

  function getter() {
    const newTypeF = new functions.TypeF("test_typeF"); 
    for (let i = 0; i < 20; i++) {
      newTypeF.add_typeA(name);
    }
  }

  expect(getter).toThrow(`TypeA folder with name "${name}" already exists`);
});

test("Test add new typeF: invalid name - EMPTY STRING", () => {
  const name = "";

  function getter() {
    functions.add_typeF(name);
  }

  expect(getter).toThrow("TypeF folder name cannot be empty");
});

test("Test add new typeF: invalid name - REPEAT STRING", () => {
  const name = "test";

  function getter() {
    for (let i = 0; i < 20; i++) {
      functions.add_typeF(name);
    }
  }

  expect(getter).toThrow(`TypeF folder with name "${name}" already exists`);
});

/**
 * Test Case: Testing to delete a type A folder within a type F folder
 * 
 * Input: type A folder we are trying to delete
 * Output: We checking for a pass because we should be able to delete a 
 * type A folder that exist within a type F folder
 */
test("Test delete typeF: correct delete - CORRECT STORAGE", () => {
  const name1 = "test1";
  const name2 = "test2";

  const newTypeF = new functions.TypeF("test_typeF"); 
  newTypeF.add_typeA(name1);
  newTypeF.add_typeA(name2);
  newTypeF.delete_typeA(name1);

  expect(newTypeF).toEqual({ "dict_typeA": { "test2": {"dict_audio": {} } } });
});

/**
 * Test Case: Testing to update Type A folder with empty name
 * 
 * Input: Type A folder name we updating, and empty string as new name
 * Output: We checking for a error because we should not be able to rename a 
 * type A folder to an empty name.
 */
test("Test update name: empty name - EMPTY STRING", () => {
  function getter() {
    const newTypeF = new functions.TypeF("test_typeF"); 
    newTypeF.add_typeA("test");
    newTypeF.update_typeA_name("test", "");
  }

  expect(getter).toThrow("TypeA folder name cannot be empty");
});

/**
 * Test Case: Testing to update a non existing Type A folder
 * 
 * Input: Type A folder supposed name we trying to update
 * Output: We checking for a error because we should not be able to rename 
 * a type A folder that does not even exist
 */
test("Test update name: typeA doesn't exist - NONEXISTANT FILE", () => {
  const name = "test";

  function getter() {
    const newTypeF = new functions.TypeF("test_typeF"); 
    newTypeF.update_typeA_name(name);
  }

  expect(getter).toThrow(`TypeA folder with name "${name}" doesn't exist`);
});

/**
 * Test Case: Testing to update a type A folder to a repeat name
 * 
 * Input: type A folder old name, and the repeat name we trying to update it to
 * Output: We checking for a error because we should not be able to rename a 
 * type A folder to a name that already exist
 */
test("Test update name: typeA same name - REPEATED NAME FILE", () => {
  const name = "test";
  
  function getter() {
    const newTypeF = new functions.TypeF("test_typeF"); 
    newTypeF.add_typeA(name);
    newTypeF.update_typeA_name(name, name);
  }

  expect(getter).toThrow(`TypeA folder with name "${name}" already exists`);
});

/**
 * Test Case: Testing to clear a out a typeF folder
 * 
 * Input: None
 * Output: We checking for a pass because we should be able to clear out a 
 * entire type F folder of all its type A folders
 */
// Testing clear
test("Testing clear typeF:", () => {
  const newTypeF = new functions.TypeF("test_typeF"); 
  let name = "test";

  for (let i = 0; i < 100; i++) {
    newTypeF.add_typeA(name);
    const addOne = i + 1;
    const mod = addOne.toString();
    name += mod;
  }

  newTypeF.clear_folder();
  expect(newTypeF).toEqual({"dict_typeA": {}});
});

/**
 * Test Case: Testing to get contents of Type A folder
 * 
 * Input: Name of type A folder inside of type F folder
 * Output: We checking for an empty type A folder since we don't
 * add audio inside the typeA folder.
 */
// get_typeA(typeAName)
test("Test get_typeA: correct get", () => {
  const name = "test_typeA";
  const newTypeF = new functions.TypeF("test_typeF");
  newTypeF.add_typeA(name);
  expect(newTypeF.get_typeA(name)).toEqual({"dict_audio": {}});
});

/**
 * Test Case: Testing to get all contents of Type F folder
 * 
 * Input: None
 * Output: We checking for the names of the type A folders we added
 */
// get_all_typeA_names()
test("Test get_all_typeA_names: correct get", () => {
  const name1 = "test_typeA1";
  const name2 = "test_typeA2";
  const newTypeF = new functions.TypeF("test_typeF");
  newTypeF.add_typeA(name1);
  newTypeF.add_typeA(name2);
  expect(newTypeF.get_all_typeA_names()).toEqual(["test_typeA1", "test_typeA2"]);
});

/**
 * Test Case: Testing to update contents of Type F folder
 * 
 * Input: name of current folder that exists, name of new folder
 * Output: We checking for the names of the type A folders we modified
 */
test("Test update_typeA_name: correct update", () => {
  const name1 = "test_typeA1";
  const name2 = "test_typeA2";
  const newTypeF = new functions.TypeF("test_typeF");
  newTypeF.add_typeA(name1);
  newTypeF.update_typeA_name(name1, name2);
  expect(newTypeF.get_all_typeA_names()).toEqual(["test_typeA2"]);
});

/**
 * Test Case: Testing to get all contents of Type F folder
 * 
 * Input: None
 * Output: We checking for the names of the type A folders we added
 */
test("Testing delete_typeA: incorrect deletion - NONEXISTANT TYPEA", () => {
  const name1 = "test_typeA1";
  function getter(){
    const newTypeF = new functions.TypeF("test_typeF");
    newTypeF.delete_typeA(name1);
  }
  expect(getter).toThrow(`TypeA folder with name "${name1} doesn't exist`);
});

/**
 * Test Case: Testing to add a type F folder with no name
 * 
 * Input: empty string as type F folder name
 * Output: We checking for a error because we should not be able to add a 
 * no named type F folder
 */
 test("Test adder typeF: invalid name - EMPTY STRING", () => {
  function getter() {
    functions.add_typeF("");
  }
  expect(getter).toThrow("TypeF folder name cannot be empty");
});

/**
 * Test Case: Testing to add a type F folder to type F with repeat name
 * 
 * Input: type F folder name that already exist
 * Output: We checking for a error because we should not be able to add a 
 * repeat of existing type F folder that already exists
 */
test("Test adder typeF: invalid name - REPEAT STRING", () => {
  let name = "test";
  function getter() { 
    for(let i = 0; i < 20; i++){
      functions.add_typeF(name);
    }
  }
  expect(getter).toThrow(`TypeF folder with name "${name}" already exists`);
});

/**
 * Test Case: Testing correctness of getting all TypeF names
 * 
 * Input: Inputting a list of TypeF folders to create
 * Output: Expect a list of all the TypeF folders
 */
 test("Test getting all typeF names: correct implementation", () => {
    for(let i = 0; i < 5; i++){
      functions.add_typeF(i.toString());
    }
    expect(functions.get_all_typeF_names()).toEqual(['0','1','2','3','4',
      'test']);
});

/**
 * Test Case: Testing correctness of deleting a TypeF folders
 * 
 * Input: Inputting a TypeF folders
 * Output: Expect the TypeF folder to not exist because its deleted
 */
 test("Test deleting all typeF names: correct implementation", () => {
   functions.add_typeF("test_typeF");
   functions.delete_typeF("test_typeF");
   expect(typeof functions.dict_typeFs["test_typeF"]).toEqual("undefined");
});


/**
 * Test Case: Testing correctness of clearing the TypeF folder content
 * 
 * Input: Inputting a TypeF folder and TypeA folder
 * Output: Expect a the TypeA folder to not exist
 */
 test("Test clearing a typeF folder: correct implementation", () => {
  functions.add_typeF("test_typeF");
  const newTypeF = functions.dict_typeFs["test_typeF"];
  newTypeF.add_typeA("test_typeA");
  functions.clear_typeF("test_typeF");
  expect(typeof newTypeF.dict_typeA["test_typeA"]).toEqual("undefined");
});
