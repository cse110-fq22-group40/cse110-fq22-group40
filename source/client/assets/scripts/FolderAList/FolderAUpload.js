/**
 * This folder contains the implementation for the initialization of the page
 * that lists all the A folders. It loads the existing A folders, and contains 
 * the event handling for adding an A Folder.
 */

import {utils, folder_utils} from "../../../../local/imports.js"

//obtains all the HTML elements that need to be targeted
const addButton = document.querySelector(".addButton");
const audioContainer = document.querySelector(".audioContainer");
const backButton = document.querySelector(".back");
const path = document.getElementById("path");

// Load existing data from back-end
utils.load_data();
const fFolderName = sessionStorage.getItem("FolderF");
path.innerHTML = "/" + fFolderName;
/**
 * When the F folder page loads grab all the existing A Folders and map them
 * onto the screen
 *
 * @type {window} - the target of the event
 * @listens window#load - when the window loads
 */
window.addEventListener("load", () => {
  const aFolder = folder_utils.get_all_typeA_names(fFolderName);
  for (const folder of aFolder) {
    createFolderA(folder);
  }
});

/**
 * When the add button is clicked for the AFolder add an AFolder to the
 * page and store into backend
 *
 * @type {HTMLElement} - the target of the event
 * @listens document#click - when the AudioCard component is clicked
 */
addButton.addEventListener("click", () => {
  // Create a prompt to allow the user to upload an audio file
  const createFolderAObject = document.createElement("create-folderA-object");
  document.body.appendChild(createFolderAObject);

  // When the user submits a new audio file
  createFolderAObject.addEventListener("fileSubmitted", evt => {
    try{
      // Create a new audio card
      folder_utils.add_typeA(evt.detail.parent,evt.detail.name);
      createFolderA(evt.detail.name);

      // Remove the input prompt
      document.body.removeChild(createFolderAObject);

      // Show success screen
      const successScreen = document.createElement("success-screen");
      document.body.appendChild(successScreen);

      // Remove success screen after some time
      setTimeout(() => {
        document.body.removeChild(successScreen);
      }, 1400);

    } catch(err){
      window.alert(`The folder name "${evt.detail.name}" 
        is either taken or not allowed. Please try again.`);
    }
  });
});

/**
 * Create an FolderA component that the user made
 * @param {string} name - name of A Folder user inputted
 * 
 * @Usage
 * Ex: createAudioObject("Bach")
 */
function createFolderA(name) {
  const folderA = document.createElement("foldera-card");
  audioContainer.appendChild(folderA);
  folderA.name = name;
}


/**
 * When the back button is clicked on the page go back to the previous page
 *
 * @type {HTMLElement} - the target of the event
 * @listens document#click - when the AudioCard component is clicked
 */
backButton.addEventListener("click", () => {
  sessionStorage.removeItem("FolderF");
  window.location = "index.html";
});