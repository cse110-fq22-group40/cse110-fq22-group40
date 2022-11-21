const functions = require('../source/local/classes/TypeA.js');
const {resolve} = require('path');

/**
 * TypeA Class Testing
 * 
 * Ben
 */

// Constants
const TESTING_ABS_PATH = resolve(__dirname, 'testFiles');
const TESTING_REL_PATH = '../../../testing/testFiles';

const MP3 = '/moonlight-sonata.mp3';
const FAKE_MP3 = '/fake-mp3.mp3';

const TESTFILE_REL = TESTING_REL_PATH + MP3;
const TESTFILE_ABS = TESTING_ABS_PATH + MP3;

const FAKEFILE_REL = TESTING_REL_PATH + FAKE_MP3;
const FAKEFILE_ABS = TESTING_ABS_PATH + FAKE_MP3;

// Test constructor
test('Test constructor typeA:', () => {
    const newTypeA = new functions.TypeA("test_typeA"); 
    expect(newTypeA).toEqual({"dict_audio": {}});
});

//Test add_audio(name, path) 
test('Test add_audio: invalid name relative path - EMPTY STRING', () => {
    function getter() {
        const newTypeA = new functions.TypeA("test_typeA"); 
        newTypeA.add_audio("", TESTFILE_REL);
    }
    expect(getter).toThrow("Audio file name cannot be empty");
});

test('Test add_audio: invalid name absolute path - EMPTY STRING', () => {
    function getter() {
        const newTypeA = new functions.TypeA("test_typeA"); 
        newTypeA.add_audio("", TESTFILE_ABS);
    }
    expect(getter).toThrow("Audio file name cannot be empty");
});

test('Test add_audio: invalid name relative path - REPEAT STRING', () => {
    let name = "test";
    function getter() {
        const newTypeA = new functions.TypeA("test_typeA"); 
        for(let i = 0; i < 20; i++){
            newTypeA.add_audio(name, TESTFILE_REL);
        }
    }
    expect(getter).toThrow(`Audio file with name "${name}" already exists`);
});

test('Test add_audio: invalid name absolute path - REPEAT STRING', () => {
    let name = "test";
    function getter() {
        const newTypeA = new functions.TypeA("test_typeA"); 
        for(let i = 0; i < 20; i++){
            newTypeA.add_audio(name, TESTFILE_ABS);
        }
    }
    expect(getter).toThrow(`Audio file with name "${name}" already exists`);
});

test('Test add_audio: invalid address - NO PATH', () => {
    function getter(){
        const newTypeA = new functions.TypeA("test_typeA");
        newTypeA.add_audio("test", "");
    }
    expect(getter).toThrow("Invalid audio file path");
});

// //Test get_audio(audioObjName)
// test('Test get_audio: correct return - CORRECT NAME', () => {
//     const newTypeA = new functions.TypeA("test_typeA");
//     newTypeA.add_audio("test", TESTFILE_REL);
    
// });

// //Test get_all_audio_names()
// test('Test get_all_audio: correct return - CORRECT USAGE', () => {

// });

//Test update_audio_name(oldName, newName)
test('Test update_audio_name: empty newName relative path - EMPTY STRING', () => {
    function getter(){
        const newTypeA = new functions.TypeA("test_typeA"); 
        newTypeA.add_audio("test", TESTFILE_REL);
        newTypeA.update_audio_name("test", "");
    }
    expect(getter).toThrow("Audio file name cannot be empty");
});

test('Test update_audio_name: empty newName absolute path - EMPTY STRING', () => {
    function getter(){
        const newTypeA = new functions.TypeA("test_typeA"); 
        newTypeA.add_audio("test", TESTFILE_ABS);
        newTypeA.update_audio_name("test", "");
    }
    expect(getter).toThrow("Audio file name cannot be empty");
});

test('Test update_audio_name: empty oldName relative path - EMPTY STRING', () => {
    function getter(){
        const newTypeA = new functions.TypeA("test_typeA"); 
        newTypeA.add_audio("test", TESTFILE_REL);
        newTypeA.update_audio_name("", "test");
    }
    expect(getter).toThrow("Audio file with name \"\" doesn't exist");
});

test('Test update_audio_name: empty oldName absolute path - EMPTY STRING', () => {
    function getter(){
        const newTypeA = new functions.TypeA("test_typeA"); 
        newTypeA.add_audio("test", TESTFILE_ABS);
        newTypeA.update_audio_name("", "test");
    }
    expect(getter).toThrow("Audio file with name \"\" doesn't exist");
});

test('Test update_audio_name: invalid name - DOES NOT EXIST', () => {
    let name = "test";
    function getter(){
        const newTypeA = new functions.TypeA("test_typeA"); 
        newTypeA.update_audio_name(name);
    }
    expect(getter).toThrow(`Audio file with name "${name}" doesn't exist`);
});

test('Test update_audio_name: Audio same name relative path - REPEATED NAME FILE', () => {
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

test('Test update_audio_name: Audio same name absolute path - REPEATED NAME FILE', () => {
    let name1 = "test";
    let name2 = "test2";
    function getter(){
        const newTypeA = new functions.TypeA("test_typeA"); 
        newTypeA.add_audio(name1, TESTFILE_ABS);
        newTypeA.add_audio(name2, TESTFILE_ABS);
        newTypeA.update_audio_name(name2, name1);
    }
    expect(getter).toThrow(`Audio file with name "${name1}" already exists`);
});

//Test delete_audio(audioName)
test('Test delete_audio: correct delete relative path - CORRECT STORAGE', () => {
    let name1 = "test1";
    let name2 = "test2";
    const newTypeA = new functions.TypeA("test_typeA"); 
    newTypeA.add_audio(name1, TESTFILE_REL);
    newTypeA.add_audio(name2, TESTFILE_REL);
    newTypeA.delete_audio(name1, TESTFILE_REL);
    expect(newTypeA).toEqual({"dict_audio": { "test2": {"path": TESTFILE_REL, "notes": {} } } } );
});

// TODO: Figure out why the abolsute path is being formatted oddly
// test('Test delete_audio: correct delete absolute path - CORRECT STORAGE', () => {
//     let name1 = "test1";
//     let name2 = "test2";
//     const newTypeA = new functions.TypeA("test_typeA"); 
//     newTypeA.add_audio(name1, TESTFILE_ABS);
//     newTypeA.add_audio(name2, TESTFILE_ABS);
//     newTypeA.delete_audio(name1, TESTFILE_ABS);
//     console.log(newTypeA);
//     expect(newTypeA).toEqual({"dict_audio": { "test2": {"path": TESTFILE_REL, "notes": {} } } } );
// });

test('Test delete_audio: invalid name relative path - DOES NOT EXIST', () => {
    let name1 = "test1";
    let name2 = "test2";
    let name3 = "test3";
    function getter(){
        const newTypeA = new functions.TypeA("test_typeA"); 
        newTypeA.add_audio(name1, TESTFILE_REL);
        newTypeA.add_audio(name2, TESTFILE_REL);
        newTypeA.delete_audio(name3);
    }
    expect(getter).toThrow(`Audio file with name "${name3}" doesn't exist`);
});

test('Test delete_audio: invalid name absolute path- DOES NOT EXIST', () => {
    let name1 = "test1";
    let name2 = "test2";
    let name3 = "test3";
    function getter(){
        const newTypeA = new functions.TypeA("test_typeA"); 
        newTypeA.add_audio(name1, TESTFILE_ABS);
        newTypeA.add_audio(name2, TESTFILE_ABS);
        newTypeA.delete_audio(name3);
    }
    expect(getter).toThrow(`Audio file with name "${name3}" doesn't exist`);
});

//Test clear_folder()
test('Testing clear_folder: relative path', () => {
    const newTypeA = new functions.TypeA("test_typeA"); 
    let name = "test";
    for(let i = 0; i < 100; i++){
        newTypeA.add_audio(name, TESTFILE_REL);
        let addOne = i + 1;
        let mod = addOne.toString();
        name += mod;
    }
    newTypeA.clear_folder();
    expect(newTypeA).toEqual({"dict_audio": {}});
});

test('Testing clear_folder: absolute path', () => {
    const newTypeA = new functions.TypeA("test_typeA"); 
    let name = "test";
    for(let i = 0; i < 100; i++){
        newTypeA.add_audio(name, TESTFILE_ABS);
        let addOne = i + 1;
        let mod = addOne.toString();
        name += mod;
    }
    newTypeA.clear_folder();
    expect(newTypeA).toEqual({"dict_audio": {}});
});