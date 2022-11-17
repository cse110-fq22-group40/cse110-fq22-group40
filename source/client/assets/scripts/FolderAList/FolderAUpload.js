/**
 * This folder contains the implementation for the initialization of the page
 * that lists all the A folders. It loads the existing A folders, and contains 
 * the event handling when adding a folder is clicked.
 */

import * as utils from "../../../../local/utils.js"

const addButton = document.querySelector(".addButton");
const audioContainer = document.querySelector(".audioContainer");
const backButton = document.querySelector(".back");

/**
NOTE TO FRONT-END TEAM FROM BENNETT:
I added some more helper functions to Utils.js.

I also added error handling in the back-end.
Please check the updated documentation in Utils.js.
Whenever you see that a function includes @throws,
you need to make sure that you call the function within a dedicated
TRY-CATCH BLOCK. If an error occurs, make sure you display
some sort of pop-up or whatever to notify the user of what's gone wrong.
This is very important, or else the
program will crash and the user won't know why!
**/

// Load existing data from back-end
utils.load_data();
const fFolderName = sessionStorage.getItem("FolderF");

//When the page intializes map the existing A Folders
window.addEventListener("load", () => {
  const aFolder = utils.get_all_typeA_names(fFolderName);
  for (const folder of aFolder) {
    createFolderA(folder);
  }
});

// When the user clicks the add button
addButton.addEventListener("click", () => {
  // Create a prompt to allow the user to upload an audio file
  const createFolderAObject = document.createElement("create-folderA-object");
  document.body.appendChild(createFolderAObject);

  // When the user submits a new audio file
  createFolderAObject.addEventListener("fileSubmitted", evt => {
    // Remove the input prompt
    document.body.removeChild(createFolderAObject);

    // Create a new audio card
    createFolderA(evt.detail.name);
    utils.add_typeA(evt.detail.parent,evt.detail.name);

    // Show success screen
    const successScreen = document.createElement("success-screen");
    document.body.appendChild(successScreen);

    // Remove success screen after some time
    setTimeout(() => {
      document.body.removeChild(successScreen);
    }, 1400);
  });
});

// Create a new A Folder and display it on the screen
function createFolderA(name) {
  const folderA = document.createElement("foldera-card");
  audioContainer.appendChild(folderA);
  folderA.name = name;
}

backButton.addEventListener("click", () => {
  sessionStorage.removeItem("FolderF");
  window.location = "index.html";
});