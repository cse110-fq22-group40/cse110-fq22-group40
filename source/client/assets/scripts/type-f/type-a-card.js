/**
 * This file defines a class that determines how a TypeACard is rendered 
 * for each A Folder created by the user.
 */
import { utils, folder_utils } from "../../../../local/imports.js";
const template = document.getElementById("card-template");

class TypeACard extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode("true"));

    /**
     * When the TypeACard object is clicked, set the path in sessionStorage
     * and go to the TypeA.html page
     *
     * @type {shadowRoot} - the target of the event
     * @listens shadowRoot#click - when the AudioCard component is clicked
     */
    this.shadowRoot.addEventListener("click", () => {
      const card = this.shadowRoot.querySelector(".card");
      card.classList.add("full-screen");

      setTimeout(() => {
        const typeAName = this.shadowRoot.querySelector("h2");
        sessionStorage.setItem("TypeA", typeAName.textContent);
        window.location = "type-a.html"
      }, 1000);
    })
    const renameButton = shadow.getElementById("rename-button");
    const deleteButton = shadow.getElementById("delete-button");

    const deletePopup = document.getElementById("delete-popup");
    const renamePopup = document.getElementById("rename-popup");

    renameButton.addEventListener("click", event => {
      event.stopPropagation();
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
          
          utils.update_name(newName, sessionStorage.getItem("TypeF"),name);
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

    deleteButton.addEventListener("click", event => {
      event.stopPropagation();
      console.log("Clicked delete button");
      // Do delete stuff
      const popup = deletePopup.content.cloneNode("true");

      popup.querySelector("#outside-area").addEventListener("click", event => {
        event.stopPropagation();
      });

      // If user clicks yes
      popup.querySelector(".update-yes").addEventListener("click", event => {
        event.stopPropagation();
        const name = shadow.querySelector("h2").textContent;

        try {
          folder_utils.delete_typeA(sessionStorage.getItem("TypeF"), name);
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
   * Sets the name of the TypeACard
   * 
   * @param {string} name
   */
  set name(name) {
    const audioname = this.shadowRoot.querySelector("h2");
    audioname.textContent = name;
  }
}

// define a custom HTML element
customElements.define("type-a-card", TypeACard);