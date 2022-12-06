/**
 * This file defines a class that determines the UI for uploading
 * a new audio file to the workspace.
 */

 const template = document.getElementById("create-screen-template");

 class AudioObjectCreateScreen extends HTMLElement {
   constructor() {
     super();
 
     const shadow = this.attachShadow({ mode: "open" });
     shadow.appendChild(template.content.cloneNode("true"));
 
     const fileExit = this.shadowRoot.querySelector(".exit");
 
     /**
      * When the exit button is clicked for creating an AudioObject, close the
      * popup
      *
      * @type {HTMLElement} - the target of the event
      * @listens document#click - when the exit buttonis clicked
      */
     fileExit.addEventListener("click", () => {
       const popup = this.shadowRoot.querySelector(".container");
       const outsideArea = this.shadowRoot.getElementById("outside-area");
 
       outsideArea.remove();
       popup.remove();
     });
 
     const fileSubmit = this.shadowRoot.querySelector(".create");
     const textInput = this.shadowRoot.querySelector(".name");
     const fileInput = this.shadowRoot.querySelector(".upload");
 
     /**
      * When the submit button is clicked, create a new eventlistener that can
      * keeps track of the name of the AudioObject and the path of the mp3 file
      *
      * @type {HTMLElement} - the target of the event
      * @listens document#click - when the AudioCard component is clicked
      */
     fileSubmit.addEventListener("click", (evt) => {
       evt.preventDefault();
 
       if (textInput.value.length > 40) {
         window.alert("Invalid name. Please use 40 characters or fewer.");
       } else if (fileInput.value === "") {
         window.alert("No file attached. Please choose your audio file.");
       } else {
         const submitEvent = new CustomEvent("fileSubmitted", {
           detail: {
             name: textInput.value,
             path: fileInput.files[0].path,
           },
         });
 
         this.dispatchEvent(submitEvent);
       }
     });
   }
 
   focus() {
     this.shadowRoot.querySelector(".name").focus();
   }
 }
 
 customElements.define("audio-object-create-screen", AudioObjectCreateScreen); 