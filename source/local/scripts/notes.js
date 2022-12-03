
import { folder_utils, dict_typeFs, utils } from "../imports.js";

/**
 * Clear all notes in an AudioObj
 * @param {string} typeFName Name of the TypeF folder
 * @param {string} typeAName Name of the TypeA folder
 * @param {string} audioObjName Name of the AudioObj
 * 
 * @usage
 * Ex. clear_notes("Bob's Project", "10/11 Practice", "G Major Scales")
 */
 export function clear_notes(typeFName, typeAName, audioObjName) {
    dict_typeFs[typeFName]
      .get_typeA(typeAName)
      .get_audio(audioObjName)
      .clear_notes();
    folder_utils.set_typeF_in_local_storage(typeFName);
  }
  
  /**
   * Deletes a note to an AudioObj given timestamp
   * @param {string} typeFName Name of the TypeF folder
   * @param {string} typeAName Name of the TypeA folder
   * @param {string} audioObjName Name of the AudioObj
   * @param {number} timestamp Timestamp of the note (in seconds)
   * 
   * @usage
   * Ex. delete_note("Bob's Project", "10/11 Practice", "G Major Scales", 3600)
   */
   export function delete_note(typeFName, typeAName, audioObjName, timestamp) {
    dict_typeFs[typeFName]
      .get_typeA(typeAName)
      .get_audio(audioObjName)
      .delete_note(timestamp);
    folder_utils.set_typeF_in_local_storage(typeFName);
  }
  
  /**
   * Updates a note in an AudioObj given timestamp
   * @param {string} typeFName Name of the TypeF folder
   * @param {string} typeAName Name of the TypeA folder
   * @param {string} audioObjName Name of the AudioObj
   * @param {number} timestamp Timestamp of the note (in seconds)
   * @param {string} newNote note's new text
   * 
   * @throws Error if the specified timestamp doesn't exist
   * 
   * @usage
   * Ex. update_note("Bob's Project", "10/11 Practice", "G Major Scales", 3600, "Great improvement")
   */
  export function update_note(typeFName, typeAName, audioObjName, timestamp, newNote) {
    utils._log("Inside update_note in notes.js");
    if (!dict_typeFs[typeFName].get_typeA(typeAName).get_audio(audioObjName).does_note_exist(timestamp))
      throw new Error(`Note with timestamp "${timestamp}" does not exist`);
  
    dict_typeFs[typeFName]
      .get_typeA(typeAName)
      .get_audio(audioObjName)
      .update_note(timestamp, newNote);
    folder_utils.set_typeF_in_local_storage(typeFName);
  }
  
  /**
   * Adds a note to an AudioObj given timestamp
   * @param {string} typeFName Name of the TypeF folder
   * @param {string} typeAName Name of the TypeA folder
   * @param {string} audioObjName Name of the AudioObj
   * @param {number} timestamp Timestamp of the note (in seconds)
   * @param {note} note Note's text
   * @param {boolean} save Whether or not to save the changes to LocalStorage
   * 
   * @throws Error if the specified timestamp isn't a valid number (in seconds)
   * @throws Error if the specified timestamp already exists
   * 
   * @usage
   * Ex. add_note("Bob's Project", "10/11 Practice", "G Major Scales", 3600, "Not enough feelings")
   */
  export function add_note(typeFName, typeAName, audioObjName, timestamp, note, save = true) {
    // check for existing note
    utils._log("Inside add_note in notes.js");
    if (dict_typeFs[typeFName].get_typeA(typeAName).get_audio(audioObjName).does_note_exist(timestamp))
      throw new Error(`Note with timestamp "${timestamp}" already exists`);
  
    dict_typeFs[typeFName]
      .get_typeA(typeAName)
      .get_audio(audioObjName)
      .add_note(timestamp, note);
    if (save)
      folder_utils.set_typeF_in_local_storage(typeFName);
  }
  
  /**
   * Gets a note from an AudioObj given timestamp
   * @param {string} typeFName Name of the TypeF folder
   * @param {string} typeAName Name of the TypeA folder
   * @param {string} audioObjName Name of the AudioObj
   * @param {number} timestamp Timestamp of the note (in seconds)
   * 
   * @usage
   * Ex. get_note("Bob's Project", "10/11 Practice", "G Major Scales", 3600)
   */
  export function get_note(typeFName, typeAName, audioObjName, timestamp) {
    return dict_typeFs[typeFName]
      .get_typeA(typeAName)
      .get_audio(audioObjName)
      .get_note(timestamp);
  }
  
  /**
   * Get all notes from an AudioObj
   * @param {string} typeFName Name of the TypeF folder
   * @param {string} typeAName Name of the TypeA folder
   * @param {string} audioObjName Name of the AudioObj
   * 
   * @usage
   * Ex. get_all_notes("Bob's Project", "10/11 Practice", "G Major Scales")
   */
  export function get_all_notes(typeFName, typeAName, audioObjName) {
    utils._log("inside get_all_notes in notes.js");
    return dict_typeFs[typeFName]
      .get_typeA(typeAName)
      .get_audio(audioObjName)
      .get_notes();
  }