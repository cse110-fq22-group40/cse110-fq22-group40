import * as classes from './tbd_classes.js';
const DEBUG_FLAG = true;
const dict_typeFs = {};

export function _log (str_message){
  if (DEBUG_FLAG) {
    console.log(str_message);
  }
}

/**
 * Dear front-end:
 * 
 * Gl.
 * 
 * Sincerely,
 * Backend
 */

// export function _save_at_path (){

// }

// export function _get_at_path () {

// }

/**
 * Adds a note to an AudioObj given timestamp
 * @param {str_typeFName}: String name of the TypeF folder 
 * @param {str_typeFName} : String name of TypeA folder
 * @param {str_audioObjName} : String name of AudioObj
 * @param {str_timestamp} : String of the note's timestamp
 * @param {str_note} : The string of the note's text
 * 
 * @Usage 
 * Ex. add_note("Bob's project", "10/11 Practice", "G Major Scales", "12:00", "Not enough feelings")
 */
export function add_note(str_typeFName, str_typeAName, str_audioObjName, str_timestamp, str_note) {
  dict_typeFs[str_typeFName]
    .get_typeA(str_typeAName)
    .get_audio(str_audioObjName)
    .add_note(str_timestamp, str_note);
  addTypeFToLocalStorage(str_typeFName);
}

/**
 * Deletes a note to an AudioObj given timestamp
 * MUST SPECIFY ENTIRE PATH FROM TYPEF TO AUDIOOBJ
 * @param {str_typeFName}: String name of the TypeF folder 
 * @param {str_typeFName} : String name of TypeA folder
 * @param {str_audioObjName} : String name of AudioObj
 * @param {str_timestamp} : String of the note's timestamp
 * 
 * @Usage
 * Ex. delete_note("Bob's project", "10/11 Practice", "G Major Scales", "12:00")
 */
export function delete_note(str_typeFName, str_typeAName, str_audioObjName, str_timestamp) {
  dict_typeFs[str_typeFName]
    .get_typeA(str_typeAName)
    .get_audio(str_audioObjName)
    .delete_note(str_timestamp);
  addTypeFToLocalStorage(str_typeFName);
}

/**
 * Adds a note to an AudioObj given timestamp
 * @param {str_typeFName}: String name of the TypeF folder 
 * @param {str_typeFName} : String name of TypeA folder
 * @param {str_audioObjName} : String name of AudioObj
 * @param {str_timestamp} : String of the note's timestamp
 * Ex. get_note("Bob's project", "10/11 Practice", "G Major Scales", "12:00")
 */
export function get_note(str_typeFName, str_typeAName, str_audioObjName, str_timestamp) {
  dict_typeFs[str_typeFName]
    .get_typeA(str_typeAName)
    .get_audio(str_audioObjName)
    .get_note(str_timestamp);
}

/**
 * Adds a note to an AudioObj given timestamp
 * @param {str_typeFName}: String name of the TypeF folder 
 * @param {str_typeFName} : String name of TypeA folder
 * @param {str_audioObjName} : String name of AudioObj
 * @param {str_timestamp} : String of the note's timestamp
 * Ex. get_all_notes("Bob's project", "10/11 Practice", "G Major Scales")
 */
 export function get_all_notes(str_typeFName, str_typeAName, str_audioObjName) {
  dict_typeFs[str_typeFName]
    .get_typeA(str_typeAName)
    .get_audio(str_audioObjName)
    .get_notes();
}

/**
 * Clear all notes in an AudioObj given timestamp
 * @param {str_typeFName}: String name of the TypeF folder 
 * @param {str_typeFName} : String name of TypeA folder
 * @param {str_audioObjName} : String name of AudioObj
 * Ex. clear_notes("Bob's project", "10/11 Practice", "G Major Scales")
 */
export function clear_notes(str_typeFName, str_typeAName, str_audioObjName) {
  dict_typeFs[str_typeFName]
    .get_typeA(str_typeAName)
    .get_audio(str_audioObjName)
    .clear_notes();
  addTypeFToLocalStorage(str_typeFName);
}

/*
To update Type F folder name:
update_name(str_newName, str_typeFName);

To update Type A folder name:
update_name(str_newName, str_typeFName, str_typeAName);

To update Audio Object name:
update_name(str_newName, str_typeFName, str_typeAName, str_audioObjName);
*/
export function update_name(str_newName, str_typeFName, str_typeAName, str_audioObjName) {
  const dict_typeF = dict_typeFs[str_typeFName];

  deleteTypeFFromLocalStorage(str_typeFName);

  if (str_typeAName) {
    const dict_typeA = dict_typeF.get_typeA(str_typeAName);

    if (str_audioObjName) {
      // User wants to rename audio object
      dict_typeA.update_audio_name(str_audioObjName, str_newName);
    } else {
      // User wants to rename type A folder
      dict_typeF.update_typeA_name(str_typeAName, str_newName);
    }

    addTypeFToLocalStorage(str_typeFName);
  } else {
    // User wants to rename type F folder
    dict_typeFs[str_newName] = dict_typeFs[str_typeFName];
    dict_typeFs[str_typeFName] = undefined;

    addTypeFToLocalStorage(str_newName);
  }
}

export function addTypeF(str_typeFName) {
  dict_typeFs[str_typeFName] = new classes.TypeF(str_typeFName);
  addTypeFToLocalStorage(str_typeFName);
}

export function deleteTypeF(str_typeFName) {
  dict_typeFs[str_typeFName] = undefined;
  deleteTypeFFromLocalStorage(str_typeFName);
}

export function addTypeA(str_typeFName, str_typeAName) {
  dict_typeFs[str_typeFName].add_typeA(str_typeAName);
  addTypeFToLocalStorage(str_typeFName);
}

export function deleteTypeA(str_typeFName, str_typeAName) {
  dict_typeFs[str_typeFName].delete_typeA(str_typeAName);
  addTypeFToLocalStorage(str_typeFName);
}

export function addAudio(str_typeFName, str_typeAName, str_audioName, str_audioPath) {
  dict_typeFs[str_typeFName].get_typeA(str_typeAName).add_audio(str_audioName, str_audioPath);
  addTypeFToLocalStorage(str_typeFName);
}

export function deleteAudio(str_typeFName, str_typeAName, str_audioName) {
  dict_typeFs[str_typeFName].get_typeA(str_typeAName).delete_audio(str_audioName);
  addTypeFToLocalStorage(str_typeFName);
}


/* These are for backend ONLY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */
export function addTypeFToLocalStorage(str_typeFName) {
  localStorage[str_typeFName] = JSON.stringify(dict_typeFs[str_typeFName]);
}

export function deleteTypeFFromLocalStorage(str_typeFName) { 
  localStorage[str_typeFName] = undefined;
}