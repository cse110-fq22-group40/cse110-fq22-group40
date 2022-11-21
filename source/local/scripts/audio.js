import {data_utils, dict_typeFs} from "../imports.js";

/**
 * Gets an array of the names of every AudioObj inside of a TypeA folder
 * @param {string} typeFName name of the TypeF folder
 * @param {string} typeAName name of the TypeA folder
 * 
 * @usage
 * Ex: get_all_audio_names("Bob's Project", "10/11 Practice")
 */
export function get_all_audio_names(typeFName, typeAName) {
  return dict_typeFs[typeFName].get_typeA(typeAName).get_all_audio_names();
}

/**
 * Add a new AudioObj with the given name and audio path
 * @param {typeFName} typeFName Name of the TypeF folder
 * @param {typeAName} typeAName Name of the TypeA folder
 * @param {audioObjName} audioObjName Name of the AudioObj
 * @param {audioPath} audioPath Path of the audio file
 * 
 * @throws Error if the AudioObj name is empty
 * @throws Error if the AudioObj name already exists
 * @throws Error if audio file path does not exist
 * 
 * @usage
 * Ex: add_audio("Bob's Project", "10/11 Practice", "G Major Scales", "path/to/file.mp3")
 */
export function add_audio(typeFName, typeAName, audioObjName, audioPath, save = true) { 
  if (audioObjName === "")
    throw new Error("AudioObj name cannot be empty");

  if (dict_typeFs[typeFName].get_typeA(typeAName).get_audio(audioObjName))
    throw new Error(`AudioObj with name "${audioObjName}" already exists`);

  // if (!fs.existsSync(audioPath))
  // throw new Error(`AudioObj with path "${audioPath}" does not exist`);

  dict_typeFs[typeFName].get_typeA(typeAName).add_audio(audioObjName, audioPath);

  if (save)
    data_utils.set_typeF_in_local_storage(typeFName);
}

/**
 * Get the audio path for an AudioObj
 * To play, set the "src" attribute of an HTML audio element to the audio path
 * @param {string} typeFName Name of the TypeF folder
 * @param {string} typeAName Name of the TypeA folder
 * @param {string} audioObjName Name of the AudioObj
 * 
 * @throws Error if audioObj does not exist
 * 
 * @usage
 * Ex. get_audio_path("Bob's Project", "10/11 Practice", "G Major Scales")
 */
export function get_audio_path(typeFName, typeAName, audioObjName) {
  if (!dict_typeFs[typeFName].get_typeA(typeAName).get_audio(audioObjName))
    throw new Error(`AudioObj with name "${audioObjName}" does not exist`);

  return dict_typeFs[typeFName]
    .get_typeA(typeAName)
    .get_audio(audioObjName)
    .get_path();
}

/**
 * Delete an AudioObj with the given name
 * @param {string} typeFName Name of the TypeF folder
 * @param {string} typeAName Name of the TypeA folder
 * @param {string} audioObjName Name of the AudioObj
 * 
 * @usage
 * Ex: delete_audio("Bob's Project", "10/11 Practice", "G Major Scales")
 */
export function delete_audio(typeFName, typeAName, audioObjName) {
  dict_typeFs[typeFName].get_typeA(typeAName).delete_audio(audioObjName);
  data_utils.set_typeF_in_local_storage(typeFName);
}

/**
 * Update audio path for an AudioObj
 * @param {string} typeFName Name of the TypeF folder
 * @param {string} typeAName Name of the TypeA folder
 * @param {string} audioObjName Name of the AudioObj
 * @param {string} newPath The new audio path to use
 * 
 * @throws Error if audioObj does not exist
 * @throws Error if new file path does not exist
 *
 * @usage
 * Ex. update_audio_path("Bob's Project", "10/11 Practice", "G Major Scales", "path/to/file.mp3")
 */
export function update_audio_path(typeFName, typeAName, audioObjName, newPath) {
  if (!dict_typeFs[typeFName].get_typeA(typeAName).get_audio(audioObjName))
    throw new Error(`AudioObj with name "${audioObjName}" does not exist`);

// if (!fs.existsSync(newPath))
// throw new Error(`AudioObj with path "${newPath}" does not exist`);

  dict_typeFs[typeFName]
    .get_typeA(typeAName)
    .get_audio(audioObjName)
    .update_path(newPath);
    data_utils.set_typeF_in_local_storage(typeFName);
}