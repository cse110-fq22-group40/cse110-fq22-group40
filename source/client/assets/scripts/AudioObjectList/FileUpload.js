/**
 * This folder contains the implementation for the initialization of the page
 * that lists all the AudioObjects. It loads the existing AudioObjects, and contains 
 * the event handling when adding a AudioObject is created.
 */

import * as utils from "../../../../local/utils.js"

// Obtain the elements that need to be targeted
const addButton = document.querySelector(".addButton");
const audioContainer = document.querySelector(".audioContainer");
const backButton = document.querySelector(".back");

// Load existing data from back-end
utils.load_data();
const folderFName = sessionStorage.getItem("FolderF");
const folderAName = sessionStorage.getItem("FolderA");

/**
 * When the A folder page loads grab all the existing AudioObjects and map them
 * onto the screen
 *
 * @type {window} - the target of the event
 * @listens window#load - when the window loads
 */
window.addEventListener("load", () => {
  const audioFiles = utils.get_all_audio_names(folderFName,folderAName);
  
  for (const audio of audioFiles) {
    createAudioCard(audio);
  }
});

/**
 * When the add button is clicked for the AudioObject add an AudioObject to the
 * page and store into backend
 *
 * @type {HTMLElement} - the target of the event
 * @listens document#click - when the AudioCard component is clicked
 */
addButton.addEventListener("click", () => {
  // Create a prompt to allow the user to upload an audio file
  const createAudObject = document.createElement("create-aud-object");
  document.body.appendChild(createAudObject);

  // When the user submits a new audio file
  createAudObject.addEventListener("fileSubmitted", evt => {
    // Remove the input prompt
    document.body.removeChild(createAudObject);

    // Create a new audio card
    createAudioCard(evt.detail.name);
    utils.add_audio(folderFName, folderAName, evt.detail.name, evt.detail.path);

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
 * Create an AudioCard component that the user made
 * @param {string} name - name of AudioCard user inputted
 * 
 * @Usage
 * Ex: createAudioObject("Bach")
 */
function createAudioCard(name) {
  const audioCard = document.createElement("audio-card");
  audioContainer.appendChild(audioCard);
  audioCard.name = name;
}

/**
 * When the back button is clicked on the A folder page, go to its parent
 * TypeF folder
 *
 * @type {HTMLElement} - the target of the event
 * @listens document#click - when the AudioCard component is clicked
 */
backButton.addEventListener("click", () => {
  sessionStorage.removeItem("FolderA");
  window.location = "TypeF.html";
});