/**
 * This file defines the TypeF object. It contains the implementation for
 * creating a TypeF object and modifying a TypeF object. It has all the functions
 * that are necessary to manage the TypeA objects contained in the TypeF object.
 * It also contains all the functions that are necessary to manage the TypeF 
 * objects including initiating/deleting. It also enables the write/delete of 
 * TypeF objects to/from the localStorage.
 */

import {TypeA} from "../imports.js";
export const dict_typeFs = {};
const lz_string = require("lz-string");

/**
 * TypeF is a class for creating a TypeF object which contains a group of 
 * TypeA objects. It also has all the funtions that manage those TypeA objects.
 */
export class TypeF {
  /**
  * TypeF is a container for a group of TypeA objects
  */
  constructor() {
    // Dict of Type A folders {"name" : typeA}
    this.dict_typeA = {};
  }

  /**
   * Add a new TypeA folder with the specified name
   * @param {string} name The name of the TypeA folder
   * 
   * @throws Error if the TypeA folder name is empty
   * @throws Error if the TypeA folder name already exists
   */
  add_typeA(name) {
    if (name === "")
      throw new Error("TypeA folder name cannot be empty");

    if (this.dict_typeA[name])
      throw new Error(`TypeA folder with name "${name}" already exists`);

    this.dict_typeA[name] = new TypeA(name);
  }

  /**
   * Getter for a type A folder 
   * @param {string} typeAName Name of the type A folder
   * 
   * @return Type A Object
  */
  get_typeA(typeAName) {
    return this.dict_typeA[typeAName];
  }

  /**
   * Getter for all type A folder names
   * @return Type A Object
   */
  get_all_typeA_names() {
    return Object.keys(this.dict_typeA);
  }

/**
 * Update a typeA object's name inside this TypeF object
 * 
 * @param {string} oldName Old name of the typeA folder you want to change
 * @param {string} newName New name of the typeA folder you want to change
 * 
 * @throws Error if the TypeA folder name is empty
 * @throws Error if the old TypeA folder name doesn't exist
 * @throws Error if the new TypeA folder name already exists
 */
  update_typeA_name(oldName, newName) {
    if (newName === "")
      throw new Error("TypeA folder name cannot be empty");

    if (!this.dict_typeA[oldName])
      throw new Error(`TypeA folder with name "${oldName}" doesn't exist`);
    
    if (this.dict_typeA[newName])
      throw new Error(`TypeA folder with name "${newName}" already exists`);

    this.dict_typeA[newName] = this.dict_typeA[oldName];
    delete this.dict_typeA[oldName];
  }
  
  /**
  * Removes a type A folder
  * @param {string} typeAName Name of the type A folder
  */
  delete_typeA(typeAName) {
    if (!this.dict_typeA[typeAName])
      throw new Error(`TypeA folder with name "${typeAName} doesn't exist`);
      
    delete this.dict_typeA[typeAName];
  }

  /**
   * Deletes all type A folders
   */
  clear_folder() {
    this.dict_typeA = {};
  }
}
  
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
function remove_typeF_from_local_storage(typeFName) { 
  localStorage.removeItem(typeFName);
}

/**
 * Store the typeF folder object to the localStorage with its name as the key
 * @param {string} typeFName Name of the typeF folder
 * 
 * @usage 
 * Ex. set_typeF_in_local_storage("nameOfThisFolder");
 */
function set_typeF_in_local_storage(typeFName) {
  localStorage.setItem(typeFName, lz_string.compressToUTF16(
    JSON.stringify(dict_typeFs[typeFName])
  ));
}