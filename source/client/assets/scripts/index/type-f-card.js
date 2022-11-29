/**
 * This file defines a class that determines how an TypeFCard is rendered 
 * for each F folder that is created by the user.
 */
import { utils, folder_utils } from "../../../../local/imports.js";

const template = document.getElementById("card-template");

class TypeFCard extends HTMLElement {
  constructor() {
    super();
    
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode("true"));

    /**
     * When the TypeFCard object is clicked, set the path in sessionStorage
     * and go to the TypeF.html page
     *
     * @type {shadowRoot} - the target of the event
     * @listens shadowRoot#click - when the AudioCard component is clicked
     */
    shadow.addEventListener("click", () => {
      const card = shadow.querySelector(".card");
      card.classList.add("full-screen");

      setTimeout(() => {
        const typeFName = shadow.querySelector("h2");
        sessionStorage.setItem("TypeF", typeFName.textContent);
        window.location = "type-f.html";
      }, 1000);
    });

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
          
          utils.update_name(newName, name);
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
          folder_utils.delete_typeF(name);
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
   * Sets the name of the TypeFCard
   * 
   * @param {string} name
   */
  set name(name) {
    const audioname = this.shadowRoot.querySelector("h2");
    audioname.textContent = name;
  }
}
  
// define a custom HTML element
customElements.define("type-f-card", TypeFCard);
  