/**
 * Testing the File: notes.js
 * 
 * File: notes.test.js
 * 
 * Description: This file is used to test the notes related functions defined
 * in the file notes.js
 */
const functions = require("../source/local/scripts/notes.js");
const { dict_typeFs } = require("../source/local/imports.js");

const audioPathTest = "../../../testing/testFiles/moonlight-sonata.mp3";
const aud_fun = require("../source/local/classes/audio-object.js");
const f_fun = require("../source/local/classes/type-f.js");
const a_fun = require("../source/local/classes/type-a.js");
const aud = require("../source/local/scripts/audio.js");
const note = require("../source/local/scripts/notes.js");
const { resolve } = require("path");

/**
 * Test Case: Testing the functionality of the clearing the notes from an 
 * AudioObject.
 * 
 * Input: AudioObject with two notes.
 * Output: The associated AudioObject notes dict should be empty.
 */
test("Test clear_notes: empty notes - CORRECT USAGE", () => { 
        const newAudio = new aud_fun.AudioObject(audioPathTest);
        newAudio.add_note(1, "test");
        newAudio.add_note(2, "test");
        newAudio.clear_notes();
        console.log(newAudio.get_notes());

    expect(newAudio.get_notes()).toStrictEqual({});

});

/**
 * Test Case: Testing the functionality of deleting a certain note from an 
 * AudioObject.
 * 
 * Input: AudioObject with 2 unique notes.
 * Output: The associated AudioObject notes dict should contain a single note.
 */
test("Test delete_note: Single note - CORRECT USAGE", () => { 
    const newAudio = new aud_fun.AudioObject(audioPathTest);
    newAudio.add_note(1, "Testing 1.");
    newAudio.add_note(2, "Testing 2.");
    newAudio.delete_note(1);

expect(newAudio.get_notes()).toStrictEqual({2: "Testing 2."});

});

