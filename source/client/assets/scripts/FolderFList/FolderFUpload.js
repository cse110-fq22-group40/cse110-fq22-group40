/**
 * This folder contains the implementation for the initialization of the main
 * page which contains all the F folders. It loads the existing F folders,
 * and contains the event handling when adding a folder is clicked.
 */

import {utils, data_utils} from "../../../../local/imports.js";

//obtains all the HTML elements that need to be targeted
const addButton = document.querySelector(".addButton");
const audioContainer = document.querySelector(".audioContainer");

// Load existing data from back-end
utils.load_data();

/**
 * When the F folder page loads grab all the existing A Folders and map them
 * onto the screen
 *
 * @type {window} - the target of the event
 * @listens window#load - when the window loads
 */
window.addEventListener("load", () => {
  const fFolder = data_utils.get_all_typeF_names();
  
  for (const folder of fFolder) {
    createFolderF(folder);
  }
});

/**
 * When the add button is clicked for the FFolder add an FFolder to the
 * page and store into backend
 *
 * @type {HTMLElement} - the target of the event
 * @listens document#click - when the AudioCard component is clicked
 */
addButton.addEventListener("click", () => {
  // Create a prompt to allow the user to upload an audio file
  const createFileFObject = document.createElement("create-filef-object");
  document.body.appendChild(createFileFObject);

  // When the user submits a new audio file
  createFileFObject.addEventListener("fileSubmitted", evt => {
    // Remove the input prompt
    document.body.removeChild(createFileFObject);

    // Create a new audio card
    createFolderF(evt.detail.name);
    data_utils.add_typeF(evt.detail.name);

    // Show success screen
    const successScreen = document.createElement("success-screen");
    document.body.appendChild(successScreen);

    // Remove success screen after some time
    setTimeout(() => {
      document.body.removeChild(successScreen);
    }, 1400);
  });
});

/**
 * Create an FolderF component that the user made
 * @param {string} name - name of F Folder user inputted
 * 
 * @Usage
 * Ex: createAudioObject("Bach")
 */
function createFolderF(name) {
  const fileF = document.createElement("folderf-card");
  audioContainer.appendChild(fileF);
  fileF.name = name;
}