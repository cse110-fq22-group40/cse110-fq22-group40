/**
 * TypeF Class Testing
 * 
 * Billy
 */

// importing file to test
const functions = require('../source/local/classes.js');

// Basic Tests: constructor, adders, delete
test('Test constructor typeF:', () => {
    const newTypeF = new functions.TypeF("test_typeF"); 
    expect(newTypeF).toEqual({"dict_typeA": {}});
});

test('Test adder typeF: invalid name - EMPTY STRING', () => {
    function getter() {
        const newTypeF = new functions.TypeF("test_typeF"); 
        newTypeF.add_typeA("");
    }
    expect(getter).toThrow("TypeA folder name cannot be empty");
});

test('Test adder typeF: invalid name - REPEAT STRING', () => {
    let name = "test";
    function getter() {
        const newTypeF = new functions.TypeF("test_typeF"); 
        for(let i = 0; i < 20; i++){
            newTypeF.add_typeA(name);
        }
    }
    expect(getter).toThrow(`TypeA folder with name "${name}" already exists`);
});

test("Test delete typeF: correct delete - CORRECT STORAGE", () => {
    let name1 = "test1";
    let name2 = "test2";
    const newTypeF = new functions.TypeF("test_typeF"); 
    newTypeF.add_typeA(name1);
    newTypeF.add_typeA(name2);
    newTypeF.delete_typeA(name1);
    expect(newTypeF).toEqual({"dict_typeA": { "test2": {"dict_audio": {} } } } );
});

//testing updating name of files.
test("Test update name: empty name - EMPTY STRING", () => {
    function getter(){
        const newTypeF = new functions.TypeF("test_typeF"); 
        newTypeF.add_typeA("test");
        newTypeF.update_typeA_name("test", "");
    }
    expect(getter).toThrow("TypeA folder name cannot be empty");
});

test("Test update name: typeA doesn't exist - NONEXISTANT FILE", () => {
    let name = "test";
    function getter(){
        const newTypeF = new functions.TypeF("test_typeF"); 
        newTypeF.update_typeA_name(name);
    }
    expect(getter).toThrow(`TypeA folder with name "${name}" doesn't exist`);
});

test("Test update name: typeA same name - REPEATED NAME FILE", () => {
    let name = "test";
    function getter(){
        const newTypeF = new functions.TypeF("test_typeF"); 
        newTypeF.add_typeA(name);
        newTypeF.update_typeA_name(name, name);
    }
    expect(getter).toThrow(`TypeA folder with name "${name}" already exists`);
});

//testing clear
test('Testing clear typeF:', () => {
    const newTypeF = new functions.TypeF("test_typeF"); 
    let name = "-";
    for(let i = 0; i < 100; i++){
        newTypeF.add_typeA(name);
        name += "-";
    }
    newTypeF.clear_folder();
    expect(newTypeF).toEqual({"dict_typeA": {}});
});

