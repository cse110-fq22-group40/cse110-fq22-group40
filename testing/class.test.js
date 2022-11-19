// importing file to test
const functions = require('../source/local/classes.js');

// Test: AudioObject

// Basic Tests: constructor + update_path() + get_path()
test('Test constructor: invalid file path - EMPTY STRING', () => {
    function getter() {
        const newAudio = new functions.AudioObject(""); 
        newAudio.get_path();
    }
    expect(getter).toThrow("Invalid audio file path");
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
