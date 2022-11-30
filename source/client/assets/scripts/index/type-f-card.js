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
     * @listens shadowRoot#click - when the FolderF component is clicked
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

    // Obtain the buttons to target rename and deleting
    const renameButton = shadow.getElementById("rename-button");
    const deleteButton = shadow.getElementById("delete-button");

    // Obtain the popup templates for rename and deleting
    const deletePopup = document.getElementById("delete-popup");
    const renamePopup = document.getElementById("rename-popup");

    /**
     * When the rename icon is clicked, open the rename popup and allow the
     * user to change the name of the TypeF Folder
     *
     * @type {HTMLElement} - the target of the event
     * @listens document#click - when the rename icon is clicked
     */
    renameButton.addEventListener("click", event => {
      // Removes the event listener of the whole card
      event.stopPropagation();

      // Creates a copy of the rename popup template
      const popup = renamePopup.content.cloneNode("true");

      /**
       * Stops the event listener for the whole card to propagate to the
       * outside area div
       *
       * @type {HTMLElement} - the target of the event
       * @listens document#click - when the outside area of popup is clicked
       */
      popup.querySelector("#outside-area").addEventListener("click", event => {
        event.stopPropagation();
      });

      /**
       * Stops the event listener for the whole card to propagate to the
       * rename popup menu
       *
       * @type {HTMLElement} - the target of the event
       * @listens document#click - when the rename popup menu is clicked
       */
      popup.querySelector(".rename-popup-screen").addEventListener("click", 
        event => {
          event.stopPropagation();
      });

      /**
       * When the new name is submitted, it is sent to the backend to be stored
       *
       * @type {HTMLElement} - the target of the event
       * @listens document#click - when the rename submit is clicked
       */
      popup.querySelector(".rename-submit").addEventListener("click", event => {
        // Prevent default submit behavior
        event.preventDefault();
        
        // Prevent propagation of original click event listener
        event.stopPropagation();
        
        try {
          //Obtain the original name of the folder
          const h2 = shadow.querySelector("h2");
          const name = h2.textContent;

          //Obtain the new name of the folder
          const newName = shadow.querySelector(".new-name").value;
          
          //Call the backend function
          utils.update_name(newName, name);
          
          //Remove the popup and update the card
          shadow.querySelector("#outside-area").remove();
          h2.textContent = newName;

        } catch (err) {
          // Alert the user if there is an error
          window.alert(err.message);
        }
      });

      /**
       * If the user doesn't want to rename, close the popup
       *
       * @type {HTMLElement} - the target of the event
       * @listens document#click - when the exit button is clicked
       */
      popup.querySelector(".exit").addEventListener("click", event => {
        event.stopPropagation();
        shadow.querySelector("#outside-area").remove();
      });

      shadow.appendChild(popup);
    });

    /**
     * When the delete icon is clicked, open the delete popup and allow the
     * user to delete the folder
     *
     * @type {HTMLElement} - the target of the event
     * @listens document#click - when the delete icon is clicked
     */
    deleteButton.addEventListener("click", event => {
      // Prevent propagation of original click event listener
      event.stopPropagation();

      // Creates a copy of the delete popup template
      const popup = deletePopup.content.cloneNode("true");

      /**
       * Stops the event listener for the whole card to propagate to the
       * outside area div
       *
       * @type {HTMLElement} - the target of the event
       * @listens document#click - when the outside area of popup is clicked
       */
      popup.querySelector("#outside-area").addEventListener("click", event => {
        event.stopPropagation();
      });

      /**
       * If the user wants to delete the folder, update in the backend and
       * remove popup from screen
       *
       * @type {HTMLElement} - the target of the event
       * @listens document#click - when the yes button of popup is clicked
       */
      popup.querySelector(".update-yes").addEventListener("click", event => {
        // Prevents propagation of original click event listener
        event.stopPropagation();

        // Obtain name of the folder to be deleted
        const name = shadow.querySelector("h2").textContent;

        try {
          // Removes the folder from the backend and on the screen
          folder_utils.delete_typeF(name);
          this.remove();

        } catch (err) {
          // Alert the user if the delete doesn't work
          window.alert(err.message);
        };
      });

      /**
       * If the user doesn't to delete the folder, close the screen
       *
       * @type {HTMLElement} - the target of the event
       * @listens document#click - when the no button of popup is clicked
       */
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
  };
}
  
// define a custom HTML element
customElements.define("type-f-card", TypeFCard);
  