import * as utils from "../../../local/utils.js"

const addButton = document.querySelector(".addButton");
const audioContainer = document.querySelector(".audioContainer");

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

//When the page intializes

window.addEventListener("load", () => {
  console.log("test");
  const fFolder = utils.get_all_typeF_names();
  
  for (const folder of fFolder) {
    createFolderF(folder);
  }
});

// When the user clicks the add button
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
    
    utils.add_typeF(evt.detail.name);

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
function createFolderF(name) {
  const fileF = document.createElement("folder-card");
  audioContainer.appendChild(fileF);
  fileF.name = name;
}