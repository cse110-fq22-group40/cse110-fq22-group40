import * as classes from "./classes.js";
const DEBUG_FLAG = true;
const dict_typeFs = {};

export function _log (str_message) {
  if (DEBUG_FLAG) {
    console.log(str_message);
  }
}

/**
 * Add a new TypeF folder with the given name
 * @param {str_typeFName} : String name of the TypeF folder
 * 
 * @Usage
 * Ex: add_typeF("Bob's Project")
 */
export function add_typeF(str_typeFName) {
  dict_typeFs[str_typeFName] = new classes.TypeF(str_typeFName);
  set_typeF_in_local_storage(str_typeFName);
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
 * @Usage
 * Ex: add_typeA("Bob's Project", "10/11 Practice")
 */
export function add_typeA(str_typeFName, str_typeAName) {
  dict_typeFs[str_typeFName].add_typeA(str_typeAName);
  set_typeF_in_local_storage(str_typeFName);
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
 * @Usage
 * Ex: add_audio("Bob's Project", "10/11 Practice", "G Major Scales", "path/to/file.mp3")
 */
export function add_audio(str_typeFName, str_typeAName, str_audioObjName, str_audioPath) {
  dict_typeFs[str_typeFName].get_typeA(str_typeAName).add_audio(str_audioObjName, str_audioPath);
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
 * Update audio path for an AudioObj
 * @param {str_newPath} : The new audio path to use
 * @param {str_typeFName} : String name of the TypeF folder 
 * @param {str_typeAName} : String name of the TypeA folder
 * @param {str_audioObjName} : String name of the AudioObj
 * 
 * @Usage
 * Ex. update_audio_path("path/to/file.mp3", "Bob's Project", "10/11 Practice", "G Major Scales")
 */
 export function update_audio_path(str_newPath, str_typeFName, str_typeAName, str_audioObjName) {
  dict_typeFs[str_typeFName]
    .get_typeA(str_typeAName)
    .get_audio(str_audioObjName)
    .update_path(str_newPath);
  set_typeF_in_local_storage(str_typeFName);
}

/**
 * Update the name of a TypeF folder, TypeA folder, or AudioObj
 * @param {str_newName} : The new name to use
 * @param {str_typeFName} : String name of the TypeF folder
 * @param {str_typeAName} : String name of the TypeA folder (Optional)
 * @param {str_audioObjName} : String name of the AudioObj (Optional)
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
    // User wants to rename TypeF folder
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
 * Deletes a note to an AudioObj given timestamp
 * MUST SPECIFY ENTIRE PATH FROM TYPEF TO AUDIOOBJ
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
 * Adds a note to an AudioObj given timestamp
 * @param {str_typeFName} : String name of the TypeF folder 
 * @param {str_typeAName} : String name of the TypeA folder
 * @param {str_audioObjName} : String name of the AudioObj
 * @param {str_timestamp} : String of the note's timestamp
 * 
 * @Usage
 * Ex. get_note("Bob's Project", "10/11 Practice", "G Major Scales", "12:00")
 */
export function get_note(str_typeFName, str_typeAName, str_audioObjName, str_timestamp) {
  dict_typeFs[str_typeFName]
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
  dict_typeFs[str_typeFName]
    .get_typeA(str_typeAName)
    .get_audio(str_audioObjName)
    .get_notes();
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

function set_typeF_in_local_storage(str_typeFName) {
  localStorage.setItem(str_typeFName, JSON.stringify(dict_typeFs[str_typeFName]));
}

function remove_typeF_from_local_storage(str_typeFName) { 
  localStorage.removeItem(str_typeFName);
}