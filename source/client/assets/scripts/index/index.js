/**
 * This folder contains the implementation for the initialization of the main
 * page which contains all the F folders. It loads the existing F folders,
 * and contains the event handling when adding a folder is clicked.
 */

import {utils, folder_utils} from "../../../../local/imports.js";

// Obtains all the HTML elements that need to be targeted
const addButton = document.querySelector(".add-button");
const cardContainer = document.querySelector(".card-container");
const homeButton = document.getElementById("home");

// Load existing data from back-end
utils.load_data();

/**
 * When the index page loads grab all the existing F Folders and map them
 * onto the screen
 *
 * @type {window} - the target of the event
 * @listens window#load - when the window loads
 */
window.addEventListener("load", () => {
  const fFolder = folder_utils.get_all_typeF_names();
  
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
  const typeFCreate = document.createElement("type-f-create-screen");
  document.body.appendChild(typeFCreate);

  // When the user submits a new audio file
  typeFCreate.addEventListener("fileSubmitted", evt => {
    try {
      // Create a new audio card
      folder_utils.add_typeF(evt.detail.name);
      createFolderF(evt.detail.name);

      // Remove the input prompt
      document.body.removeChild(typeFCreate);

      // Show success screen
      const successScreen = document.createElement("success-screen");
      document.body.appendChild(successScreen);

      // Remove success screen after some time
      setTimeout(() => {
        document.body.removeChild(successScreen);
      }, 1400);

    } catch (err){
      window.alert(`The folder name "${evt.detail.name}"
        is either taken or not allowed. Please try again.`);
    }
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
  const fileF = document.createElement("type-f-card");
  cardContainer.appendChild(fileF);
  fileF.name = name;
}

homeButton.addEventListener("click", () => {
  window.location = "index.html";
});