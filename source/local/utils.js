import * as classes from "./classes.js";
const lz_string = require("lz-string");

const DEBUG_FLAG = true;
const dict_typeFs = {};

export function _log(str_message) {
  if (DEBUG_FLAG) {
    console.log(str_message);
  }
}

/**
 * Add a new TypeF folder with the given name
 * @param {str_typeFName} : String name of the TypeF folder
 * 
 * @throws Error if the TypeF folder name is empty
 * @throws Error if the TypeF folder name already exists
 * 
 * @Usage
 * Ex: add_typeF("Bob's Project")
 */
export function add_typeF(str_typeFName, save = true) {
  if (str_typeFName === "")
    throw new Error("TypeF folder name cannot be empty");

  if (dict_typeFs[str_typeFName])
    throw new Error(`TypeF folder with name "${str_typeFName}" already exists`);

  dict_typeFs[str_typeFName] = new classes.TypeF();

  if (save)
    set_typeF_in_local_storage(str_typeFName);
}

/**
 * Gets an array of the names of every TypeF folder
 * 
 * @Usage
 * Ex: get_all_typeF_names()
 */
export function get_all_typeF_names() {
  return Object.keys(dict_typeFs);
}

/**
 * Delete a TypeF folder given name
 * @param {str_typeFName} : String name of the TypeF folder
 * 
 * @Usage
 * Ex: delete_typeF("Bob's Project")
 */
export function delete_typeF(str_typeFName) {
  delete dict_typeFs[str_typeFName];
  remove_typeF_from_local_storage(str_typeFName);
}

/**
 * Clear the contents of a TypeF folder
 * @param {str_typeFName} : String name of the TypeF folder
 * 
 * @Usage
 * Ex: clear_typeF("Bob's Project")
 */
export function clear_typeF(str_typeFName) {
  dict_typeFs[str_typeFName].clear_folder();
  set_typeF_in_local_storage(str_typeFName);
}

/**
 * Add a new TypeA folder with the given name
 * @param {str_typeFName} : String name of the TypeF folder
 * @param {str_typeAName} : String name of the TypeA folder
 * 
 * @throws Error if the TypeA folder name is empty
 * @throws Error if the TypeA folder name already exists
 * 
 * @Usage
 * Ex: add_typeA("Bob's Project", "10/11 Practice")
 */
export function add_typeA(str_typeFName, str_typeAName, save = true) {
  dict_typeFs[str_typeFName].add_typeA(str_typeAName);

  if (save)
    set_typeF_in_local_storage(str_typeFName);
}

/**
 * Gets an array of the names of every TypeA folder inside of a TypeF folder
 * @param {str_typeFName} : String name of the TypeF folder
 * 
 * @Usage
 * Ex: get_all_typeA_names("Bob's Project")
 */
export function get_all_typeA_names(str_typeFName) {
  return dict_typeFs[str_typeFName].get_all_typeA_names();
}

/**
 * Delete a TypeA folder given name
 * @param {str_typeFName} : String name of the TypeF folder
 * @param {str_typeAName} : String name of the TypeA folder
 * 
 * @Usage
 * Ex: delete_typeA("Bob's Project", "10/11 Practice")
 */
export function delete_typeA(str_typeFName, str_typeAName) {
  dict_typeFs[str_typeFName].delete_typeA(str_typeAName);
  set_typeF_in_local_storage(str_typeFName);
}

/**
 * Clear the contents of a TypeA folder
 * @param {str_typeFName} : String name of the TypeF folder
 * @param {str_typeAName} : String name of the TypeA folder
 * 
 * @Usage
 * Ex: clear_typeA("Bob's Project", "10/11 Practice")
 */
export function clear_typeA(str_typeFName, str_typeAName) {
  dict_typeFs[str_typeFName].get_typeA(str_typeAName).clear_folder();
  set_typeF_in_local_storage(str_typeFName);
}

/**
 * Add a new AudioObj with the given name and audio path
 * @param {str_typeFName} : String name of the TypeF folder
 * @param {str_typeAName} : String name of the TypeA folder
 * @param {str_audioObjName} : String name of the AudioObj
 * @param {str_audioPath} : String path of the audio file
 * 
 * @throws Error if the AudioObj name is empty
 * @throws Error if the AudioObj name already exists
 * @throws Error if audio file path does not exist
 * 
 * @Usage
 * Ex: add_audio("Bob's Project", "10/11 Practice", "G Major Scales", "path/to/file.mp3")
 */
export function add_audio(str_typeFName, str_typeAName, str_audioObjName, str_audioPath, save = true) {  
  dict_typeFs[str_typeFName].get_typeA(str_typeAName).add_audio(str_audioObjName, str_audioPath);

  if (save)
    set_typeF_in_local_storage(str_typeFName);
}

/**
 * Gets an array of the names of every AudioObj inside of a TypeA folder
 * @param {str_typeFName} : String name of the TypeF folder
 * @param {str_typeAName} : String name of the TypeA folder
 * 
 * @Usage
 * Ex: get_all_audio_names("Bob's Project", "10/11 Practice")
 */
export function get_all_audio_names(str_typeFName, str_typeAName) {
  return dict_typeFs[str_typeFName].get_typeA(str_typeAName).get_all_audio_names();
}

/**
 * Get the audio path for an AudioObj
 * To play, set the "src" attribute of an HTML audio element to the audio path
 * @param {str_typeFName} : String name of the TypeF folder
 * @param {str_typeAName} : String name of the TypeA folder
 * @param {str_audioObjName} : String name of the AudioObj
 * 
 * @throws Error if audio file path has changed or was deleted
 * 
 * @Usage
 * Ex. get_audio_path("Bob's Project", "10/11 Practice", "G Major Scales")
 */
export function get_audio_path(str_typeFName, str_typeAName, str_audioObjName) {
  return dict_typeFs[str_typeFName]
    .get_typeA(str_typeAName)
    .get_audio(str_audioObjName)
    .get_path();
}

/**
 * Update audio path for an AudioObj
 * @param {str_typeFName} : String name of the TypeF folder
 * @param {str_typeAName} : String name of the TypeA folder
 * @param {str_audioObjName} : String name of the AudioObj
 * @param {str_newPath} : The new audio path to use
 * 
 * @throws Error if audio file path does not exist
 *
 * @Usage
 * Ex. update_audio_path("Bob's Project", "10/11 Practice", "G Major Scales", "path/to/file.mp3")
 */
export function update_audio_path(str_typeFName, str_typeAName, str_audioObjName, str_newPath) {
  dict_typeFs[str_typeFName]
    .get_typeA(str_typeAName)
    .get_audio(str_audioObjName)
    .update_path(str_newPath);
  set_typeF_in_local_storage(str_typeFName);
}

/**
 * Delete an AudioObj with the given name
 * @param {str_typeFName} : String name of the TypeF folder
 * @param {str_typeAName} : String name of the TypeA folder
 * @param {str_audioObjName} : String name of the AudioObj
 * 
 * @Usage
 * Ex: delete_audio("Bob's Project", "10/11 Practice", "G Major Scales")
 */
export function delete_audio(str_typeFName, str_typeAName, str_audioObjName) {
  dict_typeFs[str_typeFName].get_typeA(str_typeAName).delete_audio(str_audioObjName);
  set_typeF_in_local_storage(str_typeFName);
}

/**
 * Update the name of a TypeF folder, TypeA folder, or AudioObj
 * @param {str_newName} : The new name to use
 * @param {str_typeFName} : String name of the TypeF folder
 * @param {str_typeAName} : String name of the TypeA folder (Optional)
 * @param {str_audioObjName} : String name of the AudioObj (Optional)
 * 
 * @throws Error if the new name is empty
 * @throws Error if the old name doesn't exist
 * @throws Error if the new name already exists
 * 
 * @Usage
 * To update TypeF folder name:
 * update_name(str_newName, str_typeFName);
 * Ex. update_name("Joe's Project", "Bob's Project")
 * 
 * To update TypeA folder name:
 * update_name(str_newName, str_typeFName, str_typeAName);
 * Ex. update_name("9/23 Practice", "Bob's Project", "10/11 Practice")
 *
 * To update AudioObj name:
 * update_name(str_newName, str_typeFName, str_typeAName, str_audioObjName);
 * Ex. update_name("F Minor Scales", "Bob's Project", "10/11 Practice", "G Major Scales")
 */
export function update_name(str_newName, str_typeFName, str_typeAName, str_audioObjName) {
  const dict_typeF = dict_typeFs[str_typeFName];

  remove_typeF_from_local_storage(str_typeFName);

  if (str_typeAName) {
    const dict_typeA = dict_typeF.get_typeA(str_typeAName);

    if (str_audioObjName) {
      // User wants to rename AudioObj
      dict_typeA.update_audio_name(str_audioObjName, str_newName);
    } else {
      // User wants to rename TypeA folder
      dict_typeF.update_typeA_name(str_typeAName, str_newName);
    }

    set_typeF_in_local_storage(str_typeFName);
  } else {
    if (str_typeFName === "")
      throw new Error("TypeF folder name cannot be empty");

    // User wants to rename TypeF folder
    if (!dict_typeFs[str_typeFName])
      throw new Error(`TypeF folder with name "${str_typeFName}" doesn't exist`);

    if (dict_typeFs[str_newName])
      throw new Error(`TypeF folder with name "${str_newName}" already exists`);

    dict_typeFs[str_newName] = dict_typeFs[str_typeFName];
    delete dict_typeFs[str_typeFName];

    set_typeF_in_local_storage(str_newName);
  }
}

/**
 * Adds a note to an AudioObj given timestamp
 * @param {str_typeFName} : String name of the TypeF folder
 * @param {str_typeAName} : String name of the TypeA folder
 * @param {str_audioObjName} : String name of the AudioObj
 * @param {str_timestamp} : String of the note's timestamp
 * @param {str_note} : String of the note's text
 * 
 * @throws Error if the specified timestamp already exists
 * 
 * @Usage
 * Ex. add_note("Bob's Project", "10/11 Practice", "G Major Scales", "12:00", "Not enough feelings")
 */
export function add_note(str_typeFName, str_typeAName, str_audioObjName, str_timestamp, str_note) {
  dict_typeFs[str_typeFName]
    .get_typeA(str_typeAName)
    .get_audio(str_audioObjName)
    .add_note(str_timestamp, str_note);
  set_typeF_in_local_storage(str_typeFName);
}

/**
 * Gets a note from an AudioObj given timestamp
 * @param {str_typeFName} : String name of the TypeF folder
 * @param {str_typeAName} : String name of the TypeA folder
 * @param {str_audioObjName} : String name of the AudioObj
 * @param {str_timestamp} : String of the note's timestamp
 * 
 * @Usage
 * Ex. get_note("Bob's Project", "10/11 Practice", "G Major Scales", "12:00")
 */
export function get_note(str_typeFName, str_typeAName, str_audioObjName, str_timestamp) {
  return dict_typeFs[str_typeFName]
    .get_typeA(str_typeAName)
    .get_audio(str_audioObjName)
    .get_note(str_timestamp);
}

/**
 * Get all notes from an AudioObj
 * @param {str_typeFName} : String name of the TypeF folder
 * @param {str_typeAName} : String name of the TypeA folder
 * @param {str_audioObjName} : String name of the AudioObj
 * @param {str_timestamp} : String of the note's timestamp
 * 
 * @Usage
 * Ex. get_all_notes("Bob's Project", "10/11 Practice", "G Major Scales")
 */
export function get_all_notes(str_typeFName, str_typeAName, str_audioObjName) {
  return dict_typeFs[str_typeFName]
    .get_typeA(str_typeAName)
    .get_audio(str_audioObjName)
    .get_notes();
}

/**
 * Updates the timestamp of an existing note in an AudioObj
 * @param {str_typeFName} : String name of the TypeF folder
 * @param {str_typeAName} : String name of the TypeA folder
 * @param {str_audioObjName} : String name of the AudioObj
 * @param {str_timestamp} : String of the note's old timestamp
 * @param {str_newTimestamp} : String of the note's new timestamp
 * 
 * @throws Error if the old timestamp doesn't exist
 * @throws Error if the new timestamp already exists
 * 
 * @Usage
 * Ex. update_timestamp("Bob's Project", "10/11 Practice", "G Major Scales", "12:00", "9:00")
 */
export function update_timestamp(str_typeFName, str_typeAName, str_audioObjName, str_timestamp, str_newTimestamp) {
  dict_typeFs[str_typeFName]
    .get_typeA(str_typeAName)
    .get_audio(str_audioObjName)
    .update_timestamp(str_timestamp, str_newTimestamp);
  set_typeF_in_local_storage(str_typeFName);
}

/**
 * Updates a note in an AudioObj given timestamp
 * @param {str_typeFName} : String name of the TypeF folder
 * @param {str_typeAName} : String name of the TypeA folder
 * @param {str_audioObjName} : String name of the AudioObj
 * @param {str_timestamp} : String of the note's timestamp
 * @param {str_newNote} : String of the note's new text
 * 
 * @throws Error if the specified timestamp doesn't exist
 * 
 * @Usage
 * Ex. update_note("Bob's Project", "10/11 Practice", "G Major Scales", "12:00", "Great improvement")
 */
export function update_note(str_typeFName, str_typeAName, str_audioObjName, str_timestamp, str_newNote) {
  dict_typeFs[str_typeFName]
    .get_typeA(str_typeAName)
    .get_audio(str_audioObjName)
    .update_note(str_timestamp, str_newNote);
  set_typeF_in_local_storage(str_typeFName);
}

/**
 * Deletes a note to an AudioObj given timestamp
 * @param {str_typeFName} : String name of the TypeF folder
 * @param {str_typeAName} : String name of the TypeA folder
 * @param {str_audioObjName} : String name of the AudioObj
 * @param {str_timestamp} : String of the note's timestamp
 * 
 * @Usage
 * Ex. delete_note("Bob's Project", "10/11 Practice", "G Major Scales", "12:00")
 */
export function delete_note(str_typeFName, str_typeAName, str_audioObjName, str_timestamp) {
  dict_typeFs[str_typeFName]
    .get_typeA(str_typeAName)
    .get_audio(str_audioObjName)
    .delete_note(str_timestamp);
  set_typeF_in_local_storage(str_typeFName);
}

/**
 * Clear all notes in an AudioObj
 * @param {str_typeFName} : String name of the TypeF folder
 * @param {str_typeAName} : String name of the TypeA folder
 * @param {str_audioObjName} : String name of the AudioObj
 * 
 * @Usage
 * Ex. clear_notes("Bob's Project", "10/11 Practice", "G Major Scales")
 */
export function clear_notes(str_typeFName, str_typeAName, str_audioObjName) {
  dict_typeFs[str_typeFName]
    .get_typeA(str_typeAName)
    .get_audio(str_audioObjName)
    .clear_notes();
  set_typeF_in_local_storage(str_typeFName);
}

/**
 * Load existing data from back-end
 * 
 * @Usage
 * Ex. load_data()
 */
export function load_data() {
  Object.keys(localStorage).forEach(str_typeFName => {
    add_typeF(str_typeFName, false);
    const typeF = JSON.parse(
      lz_string.decompressFromUTF16(localStorage.getItem(str_typeFName))
    );

    for (const str_typeAName in typeF.dict_typeA) {
      add_typeA(str_typeFName, str_typeAName, false);
      const typeA = typeF.dict_typeA[str_typeAName];

      for (const str_audioName in typeA.dict_audio) {
        add_audio(str_typeFName, str_typeAName, str_audioName, typeA.dict_audio[str_audioName].str_path, false);
      }
    }
  })
}

function set_typeF_in_local_storage(str_typeFName) {
  localStorage.setItem(str_typeFName, lz_string.compressToUTF16(
    JSON.stringify(dict_typeFs[str_typeFName])
  ));
}

function remove_typeF_from_local_storage(str_typeFName) { 
  localStorage.removeItem(str_typeFName);
}