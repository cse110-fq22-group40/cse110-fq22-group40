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



// Basic Tests: constructor, adders, delete
test('Test constructor typeA:', () => {
    const newTypeA = new functions.TypeA("test_typeA"); 
    expect(newTypeA).toEqual({"dict_audio": {}});
});

test('Test adder typeA: invalid name - EMPTY STRING', () => {
    function getter() {
        const newTypeA = new functions.TypeA("test_typeA"); 
        newTypeA.add_audio("");
    }
    expect(getter).toThrow("Audio file name cannot be empty");
});
