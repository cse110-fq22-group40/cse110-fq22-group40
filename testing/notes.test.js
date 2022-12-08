/**
 * Testing the File: notes.js
 * 
 * File: notes.test.js
 * 
 * Description: This file is used to test the notes related functions defined
 * in the file notes.js
 */

// Constants
const functions = require("../source/local/scripts/notes.js");
const { folder_utils, audio_utils, notes_utils} = require(
  "../source/local/imports.js"
);

const TESTING_REL_PATH = "../../../testing/testFiles";

const MP3 = "/moonlight-sonata.mp3";
// const FAKE_MP3 = "/fake-mp3.mp3";

const TESTFILE_REL = TESTING_REL_PATH + MP3;

/**
 * Test Case: Testing the functionality of the clearing the notes from an 
 * AudioObject.
 * 
 * Input: AudioObject with two notes.
 * Output: The associated AudioObject notes dict should be empty.
 */
test("Test clear_notes: CORRECT USAGE",() => {
  folder_utils.add_typeF("testTypeF");
  folder_utils.add_typeA("testTypeF", "testTypeA");
  audio_utils.add_audio("testTypeF", "testTypeA", "testAudio", TESTFILE_REL);
  
  for(let index = 0 ; index < 20; index++) {
    notes_utils.add_note("testTypeF", 
    "testTypeA",
    "testAudio",
    index,
    "Notes"
    )
  }
  functions.clear_notes("testTypeF", "testTypeA","testAudio");

  expect(notes_utils.get_all_notes(
    "testTypeF", "testTypeA", "testAudio"
  )).toEqual({});
});

/**
 * Test Case: Testing the functionality of deleting a certain note from an 
 * AudioObject.
 * 
 * Input: AudioObject with 2 unique notes.
 * Output: The associated AudioObject notes dict should contain a single note.
 */
test("Test delete_note: CORRECT USAGE",() => {
  folder_utils.delete_typeF("testTypeF");

  folder_utils.add_typeF("testTypeF");
  folder_utils.add_typeA("testTypeF", "testTypeA");
  audio_utils.add_audio("testTypeF", "testTypeA", "testAudio", TESTFILE_REL);
  
  for(let index = 0 ; index < 20; index++) {
    notes_utils.add_note("testTypeF", 
    "testTypeA",
    "testAudio",
    index,
    "Notes"
    )
  }

  for(let index = 19 ; index >= 0; index--) {
    notes_utils.delete_note("testTypeF", 
    "testTypeA",
    "testAudio",
    index,
    "Notes"
    )
  }
  
  expect(notes_utils.get_all_notes(
    "testTypeF", "testTypeA", "testAudio"
  )).toEqual({});
});

/**
 * Test Case: Testing the functionality of adding a certain note to an 
 * AudioObject.
 * 
 * Input: 20 notes input
 * Output: We check for a pass since we should be able to correctly add notes
 * to an audioObj and be able to retrieve it. 
 */
test("Test add_note: 20 notes - CORRECT USAGE",() => {
  folder_utils.delete_typeF("testTypeF");

  folder_utils.add_typeF("testTypeF");
  folder_utils.add_typeA("testTypeF", "testTypeA");
  audio_utils.add_audio("testTypeF", "testTypeA", "testAudio", TESTFILE_REL);
  
  for(let index = 0 ; index < 20; index++) {
    notes_utils.add_note("testTypeF", 
    "testTypeA",
    "testAudio",
    index,
    `Notes${index}`
    )
  }

  for(let index = 0 ; index < 20; index++) {
    expect(notes_utils.get_note("testTypeF", 
    "testTypeA",
    "testAudio",
    index
    )).toEqual(`Notes${index}`);
  }
});


/**
 * Test Case: Testing the functionality of adding a certain note to an 
 * AudioObject.
 * 
 * Input: 1 notes input at the same timestamp with previous test cases
 * Output: We check for an error since we should not be able to add any notes
 * to an audioObject if a timestamp already exists at that location
 */
test("Test add_note: 20 notes - REPEATED TIMESTAMPS",() => {
  function getter(){
      notes_utils.add_note("testTypeF", "testTypeA","testAudio", 15);
  }

  expect(getter).toThrow(`Note with timestamp "15" already exists`);
});


/**
 * Test Case: Testing the functionality of updating an exisiting note to an 
 * AudioObject.
 * 
 * Input: 20 updates of 20 new notes to the exisiting timestamp
 * Output: We check for an pass since we should be able to update any notes
 * to an audioObject if a note timestamp already exists at that location
 */
test("Test update_note: a note - CORRECT USAGE",() => {
  for(let index = 0; index < 20; index++) {
    functions.update_note(
      "testTypeF",
      "testTypeA",
      "testAudio",
      index, 
      `${20-index}`
    );
  }
  
  for(let index = 0; index < 20; index++) {
    expect(notes_utils.get_note(
      "testTypeF",
      "testTypeA",
      "testAudio",
      index
    )).toEqual(`${20-index}`);
  }
});

/**
 * Test Case: Testing the functionality of updating an non-existing note to an 
 * AudioObject.
 * 
 * Input: an update new notes to the exisiting timestamp
 * Output: We check for an pass since we should be able to update any notes
 * to an audioObject if a note timestamp already exists at that location
 */
test("Test update_note: a note - NONEXISITING TIMESTAMP",() => {
  for(let index = 0; index < 20; index++) {
    functions.delete_note(
      "testTypeF",
      "testTypeA",
      "testAudio",
      index
    );
  }
  function getter() {
    functions.update_note(
    "testTypeF",
    "testTypeA",
    "testAudio",
    4,
    "testNewNotes"
    )
  }

  expect(getter).toThrow(`Note with timestamp "4" does not exist`);
});