const functions = require("../source/local/classes/audio-object.js");
const {resolve} = require("path");
const { time } = require("console");

/**
 * This file is used to test the AudioObject Class
 * defined in AudioObj.js
 * 
 * Kat and Billy
 */

// Constants
const TESTING_ABS_PATH = resolve(__dirname, "testFiles");
const TESTING_REL_PATH = "../../../testing/testFiles";

const MP3 = "/moonlight-sonata.mp3";
const NON_EXISTENT_MP3 = "/fake.mp3";
const TESTFILE = TESTING_REL_PATH + MP3;

const TEST_REL_PATH_EX1 = TESTING_REL_PATH + MP3;
const TEST_ABS_PATH_EX1 = TESTING_ABS_PATH + MP3;
const TEST_REL_PATH_EX2 = TESTING_REL_PATH + NON_EXISTENT_MP3;
const TEST_ABS_PATH_EX2 = TESTING_ABS_PATH + NON_EXISTENT_MP3;

const TIMESTAMP_EX1 = 1;
const TIMESTAMP_EX2 = 5;


const NOTE_EX1 = "This needs more dynamics!";
const NOTE_EX2 = "More crescendo!";


/**
 * Basic Tests: constructor + update_path() + get_path()
 */
test("Test constructor: invalid file path - EMPTY STRING", () => {
  function getter() {
    const newAudio = new functions.AudioObject(""); 
    newAudio.get_path();
  }

  expect(getter).toThrow("Invalid audio file path: File path cannot be empty");
});

test("Test constructor: invalid file path - RANDOM STRING", () => {
  function getter() {
    const newAudio = new functions.AudioObject("filepath");
    newAudio.get_path();
  }

  expect(getter).toThrow("Invalid audio file path");
});

test("Test constructor: valid file path - NON-STRING TYPE", () => {
  const input = 123;

  function getter() {
    const newAudio = new functions.AudioObject(input);
    newAudio.get_path();
  }

  expect(getter).toThrow();
});

test("Test constructor: valid file path & audio file exists - RELATIVE PATH", () => {
  function getter() {
    const newAudio = new functions.AudioObject(TEST_REL_PATH_EX1);
    return newAudio.get_path();
  }

  const call_to_func = getter();
  expect(call_to_func).toBe(TEST_REL_PATH_EX1);
});

test("Test constructor: valid file path & audio file exists - ABSOLUTE PATH", () => {
  function getter() {
    const newAudio = new functions.AudioObject(TEST_ABS_PATH_EX1);
    return newAudio.get_path();
  }

  const call_to_func = getter();
  expect(call_to_func).toBe(TEST_REL_PATH_EX1);
});

test("Test constructor: valid file path & audio file does not exist - RELATIVE PATH", () => {
  function getter() {
    const newAudio = new functions.AudioObject(TEST_REL_PATH_EX2);
    return newAudio.get_path();
  }

  expect(getter).toThrow("Invalid audio file path");
});

test("Test constructor: valid file path & audio file does not exist - ABSOLUTE PATH", () => {
  function getter() {
    const newAudio = new functions.AudioObject(TEST_ABS_PATH_EX2);
    return newAudio.get_path();
  }

  expect(getter).toThrow("Invalid audio file path");
});

/**
 * add_note(num_timestamp, str_note)
 */
test("Test add_note: Adding 1 note at timestamp 1 sec", () => {
  const newAudio = new functions.AudioObject(TEST_ABS_PATH_EX1);
  newAudio.add_note(TIMESTAMP_EX1, NOTE_EX1);
  expect(newAudio).toEqual({"path": TEST_REL_PATH_EX1, "notes": {1: NOTE_EX1}});
});

test("Test add_note: Adding Duplicate Timestamp notes", () => {
  function getter() {
    const newAudio = new functions.AudioObject(TEST_ABS_PATH_EX1);
    newAudio.add_note(TIMESTAMP_EX1, NOTE_EX1);
    newAudio.add_note(TIMESTAMP_EX1, NOTE_EX2);
  }

  expect(getter).toThrow(`Note already exists at timestamp ${TIMESTAMP_EX1}`);
});

/**
 * get_note(num_timestamp)
 */
test("Test get_note: Valid Timestamp, note exists", () => {
  function getter() {
    const newAudio = new functions.AudioObject(TEST_ABS_PATH_EX1);
    newAudio.add_note(TIMESTAMP_EX1, NOTE_EX1);
    return newAudio.get_note(TIMESTAMP_EX1);
  }

  const call_to_func = getter();
  expect(call_to_func).toBe(NOTE_EX1);
});

/**
 * update_timestamp(timestamp, newTimestamp)
 */
test("Testing update timestamp: timestamp exists - REPEAT TIME", () => {
  const timestamp = 10;
  function getter(){
    const newAudio = new functions.AudioObject(TESTFILE);
    newAudio.add_note(timestamp, "test_note");
    newAudio.update_timestamp(timestamp, timestamp);
  }

  expect(getter).toThrow(`Note already exists at timestamp ${timestamp}`);
});

/**test("Test get_note: Valid Timestamp, note nonexistent", () => {
  function getter() {
    const newAudio = new functions.AudioObject(TEST_ABS_PATH_EX1);
    return newAudio.get_note(TIMESTAMP_EX1);
  }
  expect(getter).toThrow(`Note with timstamp "${TIMESTAMP_EX1}" does not exist.`);
});*/

/**
 * get_notes()
 */
test("Test get_notes: No Notes", () => {
  function getter() {
    const newAudio = new functions.AudioObject(TEST_ABS_PATH_EX1);
    return newAudio.get_notes();
  }

  const call_to_func = getter();
  expect(call_to_func).toStrictEqual({});
});

/**
 * update_timestamp(num_timestamp, num_newTimestamp)
 */
test("Test update_timestamp: Updates Timestamp Successfully", () => {
  function getter() {
    const newAudio = new functions.AudioObject(TEST_ABS_PATH_EX1);
    newAudio.add_note(TIMESTAMP_EX1, NOTE_EX1);
    newAudio.update_timestamp(TIMESTAMP_EX1, TIMESTAMP_EX2);
    return newAudio.get_note(TIMESTAMP_EX2);
  }

  const call_to_func = getter();
  expect(call_to_func).toBe(NOTE_EX1);
});

/**
 * update_note(num_timestamp, str_newNote)
 */
test("Testing update note: bad timestamp - INVALID TIMESTAMP", () => {
  const timestamp = 0;

  function getter(){
    const newAudio = new functions.AudioObject(TESTFILE);
    newAudio.update_note(timestamp);
  }
  
  expect(getter).toThrow(`Note doesn't exist at timestamp ${timestamp}`)
});

test("Testing update note: bad timestamp - INVALID TIMESTAMP", () => {
  const timestamp = "37";

  function getter(){
    const newAudio = new functions.AudioObject(TESTFILE);
    expect(newAudio.update_note(timestamp));
  }

  expect(getter).toThrow(`Note doesn't exist at timestamp ${timestamp}`)
});

test("Testing update note: no timestamp - INVALID TIMESTAMP", () => {
  const timestamp = "37"

  function getter(){
    const newAudio = new functions.AudioObject(TESTFILE);
    newAudio.update_note(timestamp);
  }

  expect(getter).toThrow(`Note doesn't exist at timestamp ${timestamp}`);
});

test("Testing update note: correct update", () => {
    const newAudio = new functions.AudioObject(TESTFILE);
    newAudio.add_note(10, "this is a test");
    expect(newAudio).toEqual({"path": TESTFILE, "notes": {"10": "this is a test"} } );
    newAudio.update_note(10, "this is the new test")
    expect(newAudio).toEqual({"path": TESTFILE, "notes": {"10": "this is the new test"} } );
});

/**
 * delete_note(num_timestamp)
 */
test("Testing delete note: bad timestamp - INVALID TIMESTAMP", () => {
  const timestamp = 0;

  function getter(){
    const newAudio = new functions.AudioObject(TESTFILE);
    newAudio.add_note(10, "this is a test");
    newAudio.delete_note(timestamp);
  }
  expect(getter).toThrow(`Note doesn't exist at timestamp ${timestamp}`);
});

test("Testing delete note: correct delete", () => {
  const newAudio = new functions.AudioObject(TESTFILE);
  newAudio.add_note(10, "this is a test");
  newAudio.delete_note(10);
  expect(newAudio).toEqual({"path": TESTFILE, "notes": {} } );
});

/**
 * clear_notes()
 */
test("Testing clear notes: correct clear", () => {
  const newAudio = new functions.AudioObject(TESTFILE);
  let note = "";

  for (let i = 0; i < 100; i++) {
    newAudio.add_note(i, note);
    note += "-";
  }

  newAudio.clear_notes()
  expect(newAudio).toEqual({"path": TESTFILE, "notes": { } } );
});

/**
 * get_path()
 */
test("Testing get path: no path - INVALID ", () => {
  function getter(){
    const newAudio = new functions.AudioObject(TEST_REL_PATH_EX1);
    expect(newAudio.get_path()).toThrow("Audio file path no longer exists");
  }
});

/**
 * add_note(timestamp, note)
 */
test("Testing add note: not a number - INVALID TIME", () => {
  function getter(){
    const newAudio = new functions.AudioObject(TESTFILE);
    expect(newAudio.add_note("not a number", "test_note")).toThrow(`Timestamp must be a valid number (in seconds)`);
  }
});

/**
 * does_note_exist(timestamp)
 */
test("Testing does note exists: false - INVALID NOTE", () => {
  const newAudio = new functions.AudioObject(TESTFILE);
  expect(newAudio.does_note_exist(10)).toBe(false);
});

test("Testing does note exists: true", () => {
  const newAudio = new functions.AudioObject(TESTFILE);
  newAudio.add_note(10, "test_note");
  expect(newAudio.does_note_exist(10)).toBeTruthy;
});


