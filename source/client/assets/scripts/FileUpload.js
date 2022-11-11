import * as utils from "../../../local/utils.js"

const addButton = document.querySelector(".addButton");
const audioContainer = document.querySelector(".audioContainer");

// Load existing data from back-end
utils.load_data();

// Create dummy folders
utils.add_typeF("dummyF");
utils.add_typeA("dummyF", "dummyA");

// When the page intializes
window.addEventListener("load", () => {
  const audioFiles = utils.get_all_audio_names("dummyF", "dummyA");
  
  for (const audio of audioFiles) {
    createAudioCard(audio);
  }
});

// When the user clicks the add button
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
    
    utils.add_audio("dummyF", "dummyA", evt.detail.name, evt.detail.path);

    // Show success screen
    const successScreen = document.createElement("success-screen");
    document.body.appendChild(successScreen);

    // Remove success screen after some time
    setTimeout(() => {
      document.body.removeChild(successScreen);
    }, 1400);
  });
});

// Create a new audio card and display it on the screen
function createAudioCard(name) {
  const audioCard = document.createElement("audio-card");
  audioContainer.appendChild(audioCard);
  audioCard.name = name;
}