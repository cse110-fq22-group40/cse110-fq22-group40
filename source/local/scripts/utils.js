import { dict_typeFs, folder_utils, audio_utils, notes_utils, DEBUG_FLAG } from "../imports.js";

// CONSTANST FOR APPLICATION HERE
const os = require("os");
const fs = require("fs");
const path = require("path");
const { exec, execSync } = require("child_process");
const lz_string = require("lz-string");
const fullName = require("fullName");

/**
 * Output the input debug message to the web console
 * @param {string} message The debug message
 *  
 */
export function _log(message) {
  if (DEBUG_FLAG) {
    console.log(message);
  }
}

/**
 * Update the name of a TypeF folder, TypeA folder, or AudioObj
 * @param {string} newName The new name to use
 * @param {string} typeFName Name of the TypeF folder
 * @param {string} typeAName Name of the TypeA folder (Optional)
 * @param {string} audioObjName Name of the AudioObj (Optional)
 * 
 * @throws Error if the new name is empty
 * @throws Error if the old name doesn't exist
 * @throws Error if the new name already exists
 * 
 * @usage
 * To update TypeF folder name:
 * update_name(newName, typeFName);
 * Ex. update_name("Joe's Project", "Bob's Project")
 * 
 * To update TypeA folder name:
 * update_name(newName, typeFName, typeAName);
 * Ex. update_name("9/23 Practice", "Bob's Project", "10/11 Practice")
 *
 * To update AudioObj name:
 * update_name(newName, typeFName, typeAName, audioObjName);
 * Ex. update_name("F Minor Scales", "Bob's Project", "10/11 Practice", "G Major Scales")
 */
export function update_name(newName, typeFName, typeAName, audioObjName) {
  const dict_typeF = dict_typeFs[typeFName];

  folder_utils.remove_typeF_from_local_storage(typeFName);

  if (typeAName) {
    const dict_typeA = dict_typeF.get_typeA(typeAName);

    if (audioObjName) {
      // User wants to rename AudioObj
      dict_typeA.update_audio_name(audioObjName, newName);
    } else {
      // User wants to rename TypeA folder
      dict_typeF.update_typeA_name(typeAName, newName);
    }

    folder_utils.set_typeF_in_local_storage(typeFName);
  } else {
    if (typeFName === "")
      throw new Error("TypeF folder name cannot be empty");

    // User wants to rename TypeF folder
    if (!dict_typeFs[typeFName])
      throw new Error(`TypeF folder with name "${typeFName}" doesn't exist`);

    if (dict_typeFs[newName])
      throw new Error(`TypeF folder with name "${newName}" already exists`);

    dict_typeFs[newName] = dict_typeFs[typeFName];
    delete dict_typeFs[typeFName];

    folder_utils.set_typeF_in_local_storage(newName);
  }
}



/**
 * Takes input as seconds and returns formatted time as hh:mm:ss
 * @param {number} time Time (in seconds)
 */
export function format_time(time) {
  const hours = Math.floor(time / 3600);
  let minutes = Math.floor(time / 60) % 60;
  let seconds = Math.floor(time % 60);
  
  // Append a 0 if seconds is only one digit
  if (seconds < 10)
    seconds = `0${seconds}`;

  // If the time is an hour or longer
  if (hours) {
    // Append a 0 if minutes is only one digit
    if (minutes < 10)
      minutes = `0${minutes}`;
      
      return `${hours}:${minutes}:${seconds}`;
  }
  
  // If the time is shorter than an hour
  return `${minutes}:${seconds}`;
}




/**
 * Updates the timestamp of an existing note in an AudioObj
 * @param {string} typeFName Name of the TypeF folder
 * @param {string} typeAName Name of the TypeA folder
 * @param {string} audioObjName Name of the AudioObj
 * @param {number} timestamp Old timestamp of the note (in seconds)
 * @param {number} newTimestamp New timestamp of the note (in seconds)
 * 
 * @throws Error if the new timestamp isn't a valid number (in seconds)
 * @throws Error if the old timestamp doesn't exist
 * @throws Error if the new timestamp already exists
 * 
 * @usage
 * Ex. update_timestamp("Bob's Project", "10/11 Practice", "G Major Scales", 3600, 1250)
 */
export function update_timestamp(typeFName, typeAName, audioObjName, timestamp, newTimestamp) {
  if (!dict_typeFs[typeFName].get_typeA(typeAName.get_audio(audioObjName).does_note_exist(timestamp)))
	  throw new Error(`Note with the old timestamp "${timestamp}" does not exist`);

  if (dict_typeFs[typeFName].get_typeA(typeAName.get_audio(audioObjName).does_note_exist(newTimestamp)))
	  throw new Error(`Note with the new timestamp "${newTimestamp}" already exists`);

  dict_typeFs[typeFName]
    .get_typeA(typeAName)
    .get_audio(audioObjName)
    .update_timestamp(timestamp, newTimestamp);
  folder_utils.set_typeF_in_local_storage(typeFName);
}





/**
 * Load existing data from back-end
 * 
 * @usage
 * Ex. load_data()
 */
export function load_data() {
  // Load TypeF folders
  Object.keys(localStorage).forEach(typeFName => {
    folder_utils.add_typeF(typeFName, false);
    const typeF = JSON.parse(
      lz_string.decompressFromUTF16(localStorage.getItem(typeFName))
    );

    // Load TypeA folders
    for (const typeAName in typeF.dict_typeA) {
      folder_utils.add_typeA(typeFName, typeAName, false);
      const typeA = typeF.dict_typeA[typeAName];

      // Load AudioObjs
      for (const audioName in typeA.dict_audio) {
        audio_utils.add_audio(typeFName, typeAName, audioName, typeA.dict_audio[audioName].path, false);
        const audioObj = typeA.dict_audio[audioName];

        // Load Notes
        for (const timestamp in audioObj.notes) {
          notes_utils.add_note(typeFName, typeAName, audioName, timestamp, audioObj.notes[timestamp]);
        }
      }
    }
  })
}

export function get_username() {
  return fullName() || os.userInfo().username;
}

export function get_profile_picture() {
  if (process.platform === "darwin") {
    execSync("dscl . -read /Users/${USER} JPEGPhoto | tail -1 | xxd -r -p > ~/profile_picture.jpg");
    const picture = fs.readFileSync(path.join(os.homedir(), "profile_picture.jpg"));
    exec("rm ~/profile_picture.jpg");
    return `data:png;base64,${picture.toString("base64")}`;
  } else if (process.platform === "win32") {
    const picturePath = path.join(os.homedir(), "..", "Public", "AccountPictures");
    const directories = fs.readdirSync(picturePath);
    for (const dir of directories) {
      if (dir.indexOf("-") >= 0) {
        let pictures = fs.readdirSync(path.join(picturePath, dir));
        pictures = pictures.map(pic => {
          return [parseInt(pic.match(/Image\d*/)[0].substring(5)) || 0, pic]
        }).sort((a, b) => b[0] - a[0]);
        const picture = fs.readFileSync(path.join(picturePath, dir, pictures[0][1]));
        return `data:png;base64,${picture.toString("base64")}`;
      }
    }
  }
}
