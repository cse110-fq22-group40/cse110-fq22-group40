//import * as utils from "../source/local/utils.js"
const utils = require("../source/local/utils");

beforeAll(() => {
    return utils.add_typeF("testProject");
    return utils.add_typeA("testProject", "testAudio");
    return utils.add_audio("testProject", "testAudio", "testObject");
});

afterAll(() => {
    return utils.remove_typeF_from_local_storage("testProject");
});

test('Delete type A folder named testAudio', () => {
    expect(utils.delete_typeA("testProject", "testAudio")).toBe(null);
});
