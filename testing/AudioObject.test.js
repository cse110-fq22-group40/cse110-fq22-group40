/**
 * AudioObject Class Testing
 * 
 * Kat
 */

// importing file to test
const functions = require('../source/local/classes.js');

// this needs to be changed for testing - TODO: find github absolute path
const {resolve} = require('path');
const TESTING_ABS_PATH = resolve('./testFiles');

// this can stay the same... add new comment here though :)
const TESTING_REL_PATH = "../../testing/testFiles";

const MP3 = "/moonlight-sonata.mp3";
const TESTFILE = TESTING_REL_PATH + MP3;

/**
 * Basic Tests: constructor + update_path() + get_path()
 */

test('Test constructor: invalid file path - EMPTY STRING', () => {
    function getter() {
        const newAudio = new functions.AudioObject(""); 
        newAudio.get_path();
    }
    expect(getter).toThrow("Invalid audio file path: File path cannot be empty");
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
    const input = TESTING_REL_PATH;
    function getter() {
        const newAudio = new functions.AudioObject(input);
        // note: this error is thrown by fs.existsSync() i think ???
        return newAudio.get_path();
    }
    var call_to_func = getter();
    expect(call_to_func).toBe(TESTING_REL_PATH);
});

// test('Test constructor: valid file path - ABSOLUTE PATH', () => {
//     const input = TESTING_ABS_PATH;
//     function getter() {
//         const newAudio = new functions.AudioObject(input);
//         // note: this error is thrown by fs.existsSync() i think ???
//         return newAudio.get_path();
//     }
//     var call_to_func = getter();
//     expect(call_to_func).toBe(TESTING_REL_PATH);
// });

/**
 * add_note(num_timestamp, str_note)
 */

/**
 * get_note(num_timestamp)
 */

/**
 * get_notes()
 */

/**
 * update_timestamp(num_timestamp, num_newTimestamp)
 */

/**
 * update_note(num_timestamp, str_newNote)
 */
test("Testing update note: bad timestamp - INVALID TIMESTAMP", () => {
    function getter(){
        const newAudio = new functions.AudioObject(TESTFILE);
        expect(newAudio.update_note(0)).toThrow(`Note doesn't exist at timestamp ${timestamp}`);
        expect(newAudio.update_note("37")).toThrow(`Note doesn't exist at timestamp ${timestamp}`);
    }
});

test("Testing update note: correct update", () => {
    function getter(){
        const newAudio = new functions.AudioObject(TESTFILE);
        newAudio.add_note(10, "this is a test");
        expect(newAudio).toEqual({"path": TESTFILE, "notes": {"10": "this is a test"} } );
        newAudio.update_note(10, "this is the new test")
        expect(newAudio).toEqual({"path": TESTFILE, "notes": {"10": "this is the new test"} } );
    }
});

/**
 * delete_note(num_timestamp)
 */
test("Testing delete note: bad timestamp - INVALID TIMESTAMP", () => {
    function getter(){
        const newAudio = new functions.AudioObject(TESTFILE);
        newAudio.add_note(10, "this is a test");
        expect(newAudio.delete_note(0)).toThrow(`Note doesn't exist at timestamp ${timestamp}`);
    }
});

test("Testing delete note: correct delete", () => {
    const newAudio = new functions.AudioObject(TESTFILE);
    newAudio.add_note(10, "this is a test");
    expect(newAudio).toEqual({"path": TESTFILE, "notes": {"10": "this is a test"} } );
});


/**
 * clear_notes()
 */
test("Testing clear notes: correct clear", () => {
    const newAudio = new functions.AudioObject(TESTFILE);
    let note = "";
    for(let i = 0; i < 100; i++){
        newAudio.add_note(i, note);
        note += "-";
    }
    newAudio.clear_notes()
    expect(newAudio).toEqual({"path": TESTFILE, "notes": { } } );
});