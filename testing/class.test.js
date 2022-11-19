// importing file to test
const functions = require('../source/local/classes.js');

// Test: AudioObject

// Basic Tests: constructor + update_path() + get_path()
test('Test constructor: invalid file path - EMPTY STRING', () => {
    function getter() {
        const newAudio = new functions.AudioObject(""); 
        newAudio.get_path();
    }
    console.log(getter);
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

test('Test constructor: invalid name - EMPTY STRING', () => {
    function getter() {
        const newTypeF = new functions.TypeF("test_typeF"); 
        newTypeF.add_typeA("");
    }
    expect(getter).toThrow("TypeA folder name cannot be empty");
});

test('Test constructor: invalid name - REPEAT STRING', () => {
    let name = "test";
    function getter() {
        const newTypeF = new functions.TypeF("test_typeF"); 
        for(let i = 0; i < 20; i++){
            newTypeF.add_typeA(name);
        }
    }
    expect(getter).toThrow(`TypeA folder with name "${name}" already exists`);
});

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