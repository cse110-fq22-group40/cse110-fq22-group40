// importing file to test
const functions = require('../source/local/classes.js');

// this needs to be changed for testing - TODO: find github absolute path
const TESTING_ABS_PATH = "/Users/sailoreichhorn/Desktop/UCSD/Q4.1/CSE 110/Group 40/REPO/cse110-fq22-group40/testing/testFiles/";

// this can stay the same... add new comment here though :)
const TESTING_REL_PATH = "../../testing/testFiles/";

// Test: AudioObject

// Basic Tests: constructor + update_path() + get_path()
test('Test constructor: invalid file path - EMPTY STRING', () => {
    function getter() {
        const newAudio = new functions.AudioObject(""); 
        newAudio.get_path();
    }
    //expect(getter).toThrow("Invalid audio file path");
});

test('Test constructor: invalid file path - RANDOM STRING', () => {
    function getter() {
        const newAudio = new functions.AudioObject("filepath");
        newAudio.get_path();
    }
    expect(getter).toThrow("Invalid audio file path");
});

test('Test constructor: invalid file path - NON-STRING TYPE', () => {
    const input = 123;
    function getter() {
        const newAudio = new functions.AudioObject(input);
        // note: this error is thrown by fs.existsSync() i think ???
        newAudio.get_path();
    }
    expect(getter).toThrow();
});

test('Test constructor: valid file path - RELATIVE PATH', () => {
    const input = TESTING_REL_PATH + "moonlight-sonata.mp3";
    function getter() {
        const newAudio = new functions.AudioObject(input);
        // note: this error is thrown by fs.existsSync() i think ???
        return newAudio.get_path();
    }
    var call_to_func = getter();
    expect(call_to_func).toBe(TESTING_REL_PATH + "moonlight-sonata.mp3");
});

test('Test constructor: valid file path - ABSOLUTE PATH', () => {
    const input = TESTING_ABS_PATH + "moonlight-sonata.mp3";
    function getter() {
        const newAudio = new functions.AudioObject(input);
        // note: this error is thrown by fs.existsSync() i think ???
        return newAudio.get_path();
    }
    var call_to_func = getter();
    expect(call_to_func).toBe(TESTING_REL_PATH + "moonlight-sonata.mp3");
});

/** TO-DO: Add test cases to test existing files */



/*import TypeA from "./TypeA";

test('update_audio_name: TEST 1-Fail', () => {
    let audio = new TypeA();

    expect(functions.TypeA.).toBe("Audio file name cannot be empty");
});*/

/*import TypeA from "../TypeA";

beforeAll(() => {
    jest.spyOn(TypeA.prototype, 'update_audio_name').mockImplementation(() => 'Hello'); 
});

afterAll(() => {
    jest.restoreAllMocks();
});

test('Modify class', () => {
    let audio_test = new TypeA();
    expect(person.update_audio_name()).toBe("Hello");
    //expect(person.bla()).toBe("bla");
});
*/

// Test: Type F


// Basic Tests: constructor, adders, delete
test('Test constructor:', () => {
    const newTypeF = new functions.TypeF("test_typeF"); 
    expect(newTypeF).toEqual({"dict_typeA": {}});
});

test('Test adder: invalid name - EMPTY STRING', () => {
    function getter() {
        const newTypeF = new functions.TypeF("test_typeF"); 
        newTypeF.add_typeA("");
    }
    expect(getter).toThrow("TypeA folder name cannot be empty");
});

test('Test adder: invalid name - REPEAT STRING', () => {
    let name = "test";
    function getter() {
        const newTypeF = new functions.TypeF("test_typeF"); 
        for(let i = 0; i < 20; i++){
            newTypeF.add_typeA(name);
        }
    }
    expect(getter).toThrow(`TypeA folder with name "${name}" already exists`);
});

test("Test delete: correct delete - CORRECT STORAGE", () => {
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
test('Testing clear:', () => {
    const newTypeF = new functions.TypeF("test_typeF"); 
    let name = "-";
    for(let i = 0; i < 100; i++){
        newTypeF.add_typeA(name);
        name += "-";
    }
    newTypeF.clear_folder();
    expect(newTypeF).toEqual({"dict_typeA": {}});
});