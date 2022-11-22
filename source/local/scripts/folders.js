import {TypeF, dict_typeFs} from "../imports.js";

const lz_string = require("lz-string");

// TYPE A FILE HANDLING

/**
 * Add a new TypeA folder with the given name
 * @param {string} typeFName Name of the TypeF folder
 * @param {string} typeAName Name of the TypeA folder
 * 
 * @throws Error if the TypeA folder name is empty
 * @throws Error if the TypeA folder name already exists
 * 
 * @usage
 * Ex: add_typeA("Bob's Project", "10/11 Practice")
 */
export function add_typeA(typeFName, typeAName, save = true) {
  if (typeAName === "")
    throw new Error("TypeA folder name cannot be empty");

  if (dict_typeFs[typeFName].get_typeA(typeAName))
    throw new Error(`TypeA folder with name "${typeAName}" already exists`);

  dict_typeFs[typeFName].add_typeA(typeAName);

  if (save)
    set_typeF_in_local_storage(typeFName);
}

/**
 * Gets an array of the names of every TypeA folder inside of a TypeF folder
 * @param {string} typeFName Name of the TypeF folder
 * 
 * @usage
 * Ex: get_all_typeA_names("Bob's Project")
 */
export function get_all_typeA_names(typeFName) {
  return dict_typeFs[typeFName].get_all_typeA_names();
}

/**
 * Delete a TypeA folder given name
 * @param {string} typeFName Name of the TypeF folder
 * @param {string} typeAName Name of the TypeA folder
 * 
 * @usage
 * Ex: delete_typeA("Bob's Project", "10/11 Practice")
 */
export function delete_typeA(typeFName, typeAName) {
  dict_typeFs[typeFName].delete_typeA(typeAName);
  set_typeF_in_local_storage(typeFName);
}

/**
 * Clear the contents of a TypeA folder
 * @param {string} typeFName Name of the TypeF folder
 * @param {string} typeAName Name of the TypeA folder
 * 
 * @usage
 * Ex: clear_typeA("Bob's Project", "10/11 Practice")
 */
export function clear_typeA(typeFName, typeAName) {
  dict_typeFs[typeFName].get_typeA(typeAName).clear_folder();
  set_typeF_in_local_storage(typeFName);
}

// TYPE F FILE HANDLING

/**
 * Add a new TypeF folder with the given name
 * @param {string} typeFName Name of the typeF folder
 * 
 * @throws Error if the TypeF folder name is empty
 * @throws Error if the TypeF folder name already exists
 * 
 * @usage
 * Ex: add_typeF("Bob's Project")
 */
export function add_typeF(typeFName, save = true) {
  if (typeFName === "")
    throw new Error("TypeF folder name cannot be empty");

  if (dict_typeFs[typeFName])
    throw new Error(`TypeF folder with name "${typeFName}" already exists`);

  dict_typeFs[typeFName] = new TypeF();

  if (save)
    set_typeF_in_local_storage(typeFName);
}

/**
 * Gets an array of the names of every TypeF folder
 * 
 * @usage
 * Ex: get_all_typeF_names()
 */
export function get_all_typeF_names() {
  return Object.keys(dict_typeFs);
}

/**
 * Delete a TypeF folder given its name
 * @param {string} typeFName Name of the TypeF folder
 * 
 * @usage
 * Ex: delete_typeF("Bob's Project")
 */
export function delete_typeF(typeFName) {
  delete dict_typeFs[typeFName];
  remove_typeF_from_local_storage(typeFName);
}

/**
 * Clear the contents of a TypeF folder
 * @param {string} typeFName Name of the TypeF folder
 * 
 * @usage
 * Ex: clear_typeF("Bob's Project")
 */
export function clear_typeF(typeFName) {
  dict_typeFs[typeFName].clear_folder();
  set_typeF_in_local_storage(typeFName);
}

/**
 * Remove the typeF folder object from the localStorage using its name as the key
 * @param {string} typeFName Name of the typeF folder
 * 
 * @usage 
 * Ex. remove_typeF_from_local_storage("nameOfThisFolder");
 */
export function remove_typeF_from_local_storage(typeFName) { 
  localStorage.removeItem(typeFName);
}

/**
 * Store the typeF folder object to the localStorage with its name as the key
 * @param {string} typeFName Name of the typeF folder
 * 
 * @usage 
 * Ex. set_typeF_in_local_storage("nameOfThisFolder");
 */
export function set_typeF_in_local_storage(typeFName) {
  localStorage.setItem(typeFName, lz_string.compressToUTF16(
    JSON.stringify(dict_typeFs[typeFName])
  ));
}