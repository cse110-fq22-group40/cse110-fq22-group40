/**
 * TypeA Class Testing
 * 
 * Ben
 */

// importing file to test
const functions = require('../source/local/classes.js');

// allows for testing absolute path without hard coding
const {resolve} = require('path');

// this needs to be changed for testing - TODO: find github absolute path DONE
const TESTING_ABS_PATH = resolve('./testFiles');

// this can stay the same... add new comment here though :)
const TESTING_REL_PATH = "../../testing/testFiles";

const MP3 = "/moonlight-sonata.mp3";
const TESTFILE_REL = TESTING_REL_PATH + MP3;
const TESTFILE_ABS = TESTING_ABS_PATH + MP3;

// Basic Tests: constructor, adders, delete
test('Test constructor typeA:', () => {
    const newTypeA = new functions.TypeA("test_typeA"); 
    expect(newTypeA).toEqual({"dict_audio": {}});
});

//Test add_audio
test('Test adder typeA: invalid name - EMPTY STRING', () => {
    function getter() {
        const newTypeA = new functions.TypeA("test_typeA"); 
        newTypeA.add_audio("", TESTFILE_REL);
    }
    expect(getter).toThrow("Audio file name cannot be empty");
});

test('Test adder typeA: invalid name - REPEAT STRING', () => {
    let name = "test";
    function getter() {
        const newTypeA = new functions.TypeA("test_typeA"); 
        for(let i = 0; i < 20; i++){
            newTypeA.add_audio(name, TESTFILE_REL);
        }
    }
    expect(getter).toThrow(`Audio file with name "${name}" already exists`);
});

test("Test adder typeA: invalid address - NO PATH", () => {
    function getter(){
        const newTypeA = new functions.TypeA("test_typeA");
        newTypeA.add_audio("test", "");
    }
    expect(getter).toThrow("Invalid audio file path");
});

// //Test get_audio
// test('Test get_audio typeA: correct return - CORRECT NAME', () => {
//     const newTypeA = new functions.TypeA("test_typeA");
//     newTypeA.add_audio("test", TESTFILE_REL);
    
// });

// //Test get_audio
// test('Test get_all_audio typeA: correct return - CORRECT USAGE', () => {

// });

//Test updating name of files.
test("Test update Audio name: empty name - EMPTY STRING", () => {
    function getter(){
        const newTypeA = new functions.TypeA("test_typeA"); 
        newTypeA.add_audio("test", TESTFILE_REL);
        newTypeA.update_audio_name("test", "");
    }
    expect(getter).toThrow("Audio file name cannot be empty");
});

test("Test update Audio name: Audio doesn't exist - NONEXISTANT FILE", () => {
    let name = "test";
    function getter(){
        const newTypeA = new functions.TypeA("test_typeA"); 
        newTypeA.update_audio_name(name);
    }
    expect(getter).toThrow(`Audio file with name "${name}" doesn't exist`);
});

test("Test update Audio name: Audio same name - REPEATED NAME FILE", () => {
    let name1 = "test";
    let name2 = "test2";
    function getter(){
        const newTypeA = new functions.TypeA("test_typeA"); 
        newTypeA.add_audio(name1, TESTFILE_REL);
        newTypeA.add_audio(name2, TESTFILE_REL);
        newTypeA.update_audio_name(name2, name1);
    }
    expect(getter).toThrow(`Audio file with name "${name1}" already exists`);
});

//Test delete_audio
test("Test delete typeA: correct delete - CORRECT STORAGE", () => {
    let name1 = "test1";
    let name2 = "test2";
    const newTypeA = new functions.TypeA("test_typeA"); 
    newTypeA.add_audio(name1, TESTFILE_REL);
    newTypeA.add_audio(name2, TESTFILE_REL);
    newTypeA.delete_audio(name1, TESTFILE_REL);
    expect(newTypeA).toEqual({"dict_audio": { "test2": {"path": TESTFILE_REL, "notes": {} } } } );
});

test("Test delete typeA: invalid name - DOES NOT EXIST", () => {
    let name1 = "test1";
    let name2 = "test2";
    let name3 = "test3";
    function getter(){
        const newTypeA = new functions.TypeA("test_typeA"); 
        newTypeA.add_audio(name1, TESTFILE_REL);
        newTypeA.add_audio(name2, TESTFILE_REL);
        newTypeA.delete_audio(name3, TESTFILE_REL);
    }
    expect(getter).toThrow(`Audio file with name "${name3}" doesn't exist`);
});

//testing clear
test('Testing clear typeA:', () => {
    const newTypeA = new functions.TypeA("test_typeA"); 
    let name = "test";
    for(let i = 0; i < 100; i++){
        newTypeA.add_audio(name, TESTFILE_REL);
        let addOne = i + 1;
        let mod = addOne.toString();
        name += mod;
    }
    newTypeA.clear_folder();
    expect(newTypeA).toEqual({"dict_audio": {}}); //needs work
});
