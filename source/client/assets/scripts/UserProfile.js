import * as utils from "../../../local/utils.js";

let container, img, text1, text2;

async function loadProfile() {
  container = document.createElement("div");
  container.className = "profile-container";

  img = document.createElement("div");
  img.style.backgroundImage = `url(${utils.get_profile_picture()})`;
  container.appendChild(img);

  text1 = document.createElement("b");
  text1.className = "text1";
  text1.textContent = `Did you just try to close me, ${await utils.get_username()}?!?!`;
  container.appendChild(text1);

  text2 = document.createElement("b");
  text2.className = "text2";
  text2.textContent = "How would you feel if I tried to close you?";
  container.appendChild(text2);

  document.body.appendChild(container);
}

window.addEventListener("load", () => {
  loadProfile();

  let typeF = sessionStorage.getItem("FolderF");
  let typeA = sessionStorage.getItem("FolderA");
  let audioObj = sessionStorage.getItem("AudObject");

  window.onbeforeunload = evt => {
    if (typeF === sessionStorage.getItem("FolderF") && typeA === sessionStorage.getItem("FolderA") && audioObj === sessionStorage.getItem("AudObject")) {
      container.classList.add("show");
      return "";
    }
    typeF = sessionStorage.getItem("FolderF");
    typeA = sessionStorage.getItem("FolderA");
    audioObj = sessionStorage.getItem("AudObject");
  };
});