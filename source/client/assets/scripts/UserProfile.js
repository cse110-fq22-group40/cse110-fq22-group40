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
  text1.textContent = `\x44\x69\x64\x20\x79\x6f\x75\x20\x6a\x75\x73\x74\x20\x74\x72\x79\x20\x74\x6f\x20\x63\x6c\x6f\x73\x65\x20\x6d\x65\x2c\x20${await utils.get_username()}\x3f\x21\x3f\x21`;
  container.appendChild(text1);

  text2 = document.createElement("b");
  text2.className = "text2";
  text2.textContent = "\x48\x6f\x77\x20\x77\x6f\x75\x6c\x64\x20\x79\x6f\x75\x20\x66\x65\x65\x6c\x20\x69\x66\x20\x49\x20\x74\x72\x69\x65\x64\x20\x74\x6f\x20\x63\x6c\x6f\x73\x65\x20\x79\x6f\x75\x3f";
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