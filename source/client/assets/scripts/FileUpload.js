import * as utils from "../../../local/utils.js"

const addButton = document.querySelector(".addButton");
const audioContainer = document.querySelector(".audioContainer");

addButton.addEventListener("click", () => {
  const createAudObject = document.createElement("create-aud-object");
  document.body.appendChild(createAudObject);

  createAudObject.addEventListener("fileSubmitted", evt => {
    document.body.removeChild(createAudObject);

    createAudioCard(evt.detail.name, evt.detail.path);

    const audioFiles = localStorage.audioFiles ? JSON.parse(localStorage.audioFiles) : [];
    audioFiles.push({
      name: evt.detail.name,
      path: evt.detail.path
    });
    localStorage.audioFiles = JSON.stringify(audioFiles);

    const successScreen = document.createElement("success-screen");
    document.body.appendChild(successScreen);

    setTimeout(() => {
      document.body.removeChild(successScreen);
    }, 1400);
  });
});

function createAudioCard(name, path) {
  const audioCard = document.createElement("audio-card");
  audioContainer.appendChild(audioCard);

  audioCard.name = name;
  audioCard.path = path.split("\\").pop().split("/").pop();
}

if (localStorage.audioFiles) {
  const audioFiles = JSON.parse(localStorage.audioFiles);

  for (const file of audioFiles) {
    createAudioCard(file.name, file.path);
  }
}