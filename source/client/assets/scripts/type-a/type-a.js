/**
 * This folder contains the implementation for the initialization of the page
 * that lists all the AudioObjects. It loads the existing AudioObjects, and contains 
 * the event handling when adding a AudioObject is created.
 */

import {utils, audio_utils} from "../../../../local/imports.js"

// Obtains all the HTML elements that need to be targeted
const addButton = document.querySelector(".add-button");
const cardContainer = document.querySelector(".card-container");
const homeButton = document.getElementById("home");
const backButton = document.getElementById("back");
const path = document.getElementById("path");

// Load existing data from back-end
utils.load_data();
const typeFName = sessionStorage.getItem("TypeF");
const typeAName = sessionStorage.getItem("TypeA");
path.innerHTML = `/ ${typeFName} / ${typeAName}`;

/**
 * When the A folder page loads grab all the existing AudioObjects and map them
 * onto the screen
 *
 * @type {window} - the target of the event
 * @listens window#load - when the window loads
 */
window.addEventListener("load", () => {
  const audioFiles = audio_utils.get_all_audio_names(typeFName,typeAName);
  
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
  const createAudObject = document.createElement("audio-object-create-screen");
  document.body.appendChild(createAudObject);

  // When the user submits a new audio file
  createAudObject.addEventListener("fileSubmitted", evt => {
    try{
      // Create a new audio card
      audio_utils.add_audio(typeFName, typeAName, evt.detail.name, evt.detail.path);
      createAudioCard(evt.detail.name);

      // Remove the input prompt
      document.body.removeChild(createAudObject);

      // Show success screen
      const successScreen = document.createElement("success-screen");
      document.body.appendChild(successScreen);

      // Remove success screen after some time
      setTimeout(() => {
        document.body.removeChild(successScreen);
      }, 1400);

    } catch(err){
      window.alert(`The file name "${evt.detail.name}" 
        is either taken or not allowed. Please try again.`);
    }
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
  const audioCard = document.createElement("audio-object-card");
  cardContainer.appendChild(audioCard);
  audioCard.name = name;
}

homeButton.addEventListener("click", () => {
  window.location = "index.html";
});

/**
 * When the back button is clicked on the A folder page, go to its parent
 * TypeF folder
 *
 * @type {HTMLElement} - the target of the event
 * @listens document#click - when the AudioCard component is clicked
 */
backButton.addEventListener("click", () => {
  sessionStorage.removeItem("TypeA");
  window.location = "type-f.html";
});