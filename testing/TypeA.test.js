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
const TESTFILE = TESTING_REL_PATH + MP3;

// Basic Tests: constructor, adders, delete
test('Test constructor typeA:', () => {
    const newTypeA = new functions.TypeA("test_typeA"); 
    expect(newTypeA).toEqual({"dict_audio": {}});
});

test('Test adder typeA: invalid name - EMPTY STRING', () => {
    function getter() {
        const newTypeA = new functions.TypeA("test_typeA"); 
        newTypeA.add_audio("", TESTFILE);
    }
    expect(getter).toThrow("Audio file name cannot be empty");
});

test('Test adder typeA: invalid name - REPEAT STRING', () => {
    let name = "test";
    function getter() {
        const newTypeA = new functions.TypeA("test_typeA"); 
        for(let i = 0; i < 20; i++){
            newTypeA.add_audio(name, TESTFILE);
        }
    }
    expect(getter).toThrow(`Audio file with name "${name}" already exists`);
});

test("Test adder typeA: invalid address - NO PATH", () =>{
    const newTypeA = new functions.TypeA("test_typeA");
    expect(newTypeA.add_audio("test", "")).toThrow("Invalid audio file path");
});

// test("Test delete typeA: correct delete - CORRECT STORAGE", () => {
//     let name1 = "test1";
//     let name2 = "test2";
//     const newTypeA = new functions.TypeA("test_typeA"); 
//     newTypeA.add_audio(name1, TESTFILE);
//     newTypeA.add_audio(name2, TESTFILE);
//     newTypeA.delete_audio(name1, TESTFILE);
//     expect(newTypeA).toEqual({"dict_typeA": { "test2": {"dict_audio": {} } } } ); //needs some work
// });

// //testing updating name of files.
// test("Test update Audio name: empty name - EMPTY STRING", () => {
//     function getter(){
//         const newTypeA = new functions.TypeA("test_typeA"); 
//         newTypeA.add_audio("test");
//         newTypeA.update_audio_name("test", "");
//     }
//     expect(getter).toThrow("Audio file name cannot be empty");
// });

// test("Test update Audio name: Audio doesn't exist - NONEXISTANT FILE", () => {
//     let name = "test";
//     function getter(){
//         const newTypeA = new functions.TypeA("test_typeA"); 
//         newTypeA.update_audio_name(name);
//     }
//     expect(getter).toThrow(`Audio file with name "${oldName}" doesn't exist`);
// });

// test("Test update Audio name: Audio same name - REPEATED NAME FILE", () => {
//     let name = "test";
//     function getter(){
//         const newTypeA = new functions.TypeA("test_typeA"); 
//         newTypeA.add_audio(name);
//         newTypeA.update_audio_name(name, name);
//     }
//     expect(getter).toThrow(`Audio file with name "${newName}" already exists`);
// });

// //testing clear
// test('Testing clear typeA:', () => {
//     const newTypeA = new functions.TypeA("test_typeA"); 
//     let name = "-";
//     for(let i = 0; i < 100; i++){
//         newTypeA.add_audio(name);
//         name += "-";
//     }
//     newTypeA.clear_folder();
//     expect(newTypeA).toEqual({"dict_audio": {}}); //needs work
// });
