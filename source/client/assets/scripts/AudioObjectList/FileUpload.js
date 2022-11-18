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
const folderFName = sessionStorage.getItem("FolderF");
const folderAName = sessionStorage.getItem("FolderA");

// When the page intializes
window.addEventListener("load", () => {
  const audioFiles = utils.get_all_audio_names(folderFName,folderAName);
  
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

// Create a new audio card and display it on the screen
function createAudioCard(name) {
  const audioCard = document.createElement("audio-card");
  audioContainer.appendChild(audioCard);
  audioCard.name = name;
}

backButton.addEventListener("click", () => {
  sessionStorage.removeItem("FolderA");
  window.location = "TypeF.html";
});