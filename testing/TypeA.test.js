/**
 * TypeA Class Testing
 * 
 * Ben
 */

// importing file to test
const functions = require('../source/local/classes.js');

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