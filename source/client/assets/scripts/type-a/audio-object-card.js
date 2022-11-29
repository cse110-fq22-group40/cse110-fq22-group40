/**
 * This file defines a class that determines how an AudioObjectCard is rendered
 * for each audio file uploaded by the user.
 */
import { utils, folder_utils, audio_utils } from "../../../../local/imports.js";
const template = document.getElementById("card-template");

class AudioObjectCard extends HTMLElement {
  constructor() {
    super();
    
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode("true"));

    /**
     * When the AudioObjectCard object is clicked, set the path in sessionStorage
     * and go to the AudioObject.html page
     *
     * @type {shadowRoot} - the target of the event
     * @listens shadowRoot#click - when the AudioObjectCard component is clicked
     */
    this.shadowRoot.addEventListener("click", () => {
      const card = this.shadowRoot.querySelector(".card");
      card.classList.add("full-screen");

      setTimeout(() => {
        const audObjectName = this.shadowRoot.querySelector("h2").textContent;
        sessionStorage.setItem("AudioObject", audObjectName);
        window.location = "audio-object.html"
      }, 1000);
    });

    const renameButton = this.shadowRoot.getElementById("rename-button");
    const deleteButton = this.shadowRoot.getElementById("delete-button");

    const deletePopup = document.getElementById("delete-popup");
    const renamePopup = document.getElementById("rename-popup");

    renameButton.addEventListener("click", (event) => {
      event.stopPropagation();
      console.log("Clicked rename button");

      // Do rename stuff
      const popup = renamePopup.content.cloneNode("true");

      popup.querySelector("#outside-area").addEventListener("click", event => {
        event.stopPropagation();
      });

      popup.querySelector(".rename-popup-screen").addEventListener("click", event => {
        event.stopPropagation();
      });

      popup.querySelector(".rename-submit").addEventListener("click", event => {
        event.preventDefault();
        event.stopPropagation();
        
        try {
          const h2 = shadow.querySelector("h2");
          const name = h2.textContent;
          const newName = shadow.querySelector(".new-name").value;
          
          utils.update_name(newName, sessionStorage["TypeF"], sessionStorage["TypeA"], name);
          shadow.querySelector("#outside-area").remove();
          h2.textContent = newName;
        } catch (err) {
          window.alert(err.message);
        }
      });

      popup.querySelector(".exit").addEventListener("click", event => {
        event.stopPropagation();
        shadow.querySelector("#outside-area").remove();
      });

      shadow.appendChild(popup);
    });

    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      console.log("Clicked delete button");
      const popup = deletePopup.content.cloneNode("true");

      // Do delete stuff
      popup.querySelector("#outside-area").addEventListener("click", event => {
        event.stopPropagation();
      });

      // If user clicks yes
      popup.querySelector(".update-yes").addEventListener("click", event => {
        event.stopPropagation();
        const name = shadow.querySelector("h2").textContent;

        try {
          audio_utils.delete_audio(sessionStorage["TypeF"], sessionStorage["TypeA"], name);
          this.remove();
        } catch (err) {
          window.alert(err.message);
        }
      });

      // If user click no
      popup.querySelector(".update-no").addEventListener("click", event => {
        event.stopPropagation();
        shadow.querySelector("#outside-area").remove();
      });

      shadow.appendChild(popup);
    });
  }

  /**
   * Sets the name of the AudioObjectCard
   * 
   * @param {string} name
   */
  set name(name) {
    const audioname = this.shadowRoot.querySelector("h2");
    audioname.textContent = name;
  }
}

// define a custom HTML element
customElements.define("audio-object-card", AudioObjectCard);
