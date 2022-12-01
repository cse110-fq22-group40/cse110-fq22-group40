/**
 * This file defines a class that determines the UI for updating a given timestamp in a note
 */

 const template = document.getElementById("update-timestamp-template");

 class UpdateTimestampScreen extends HTMLElement {
   constructor() {
     super();
     const shadow = this.attachShadow({ mode: "open" });
     shadow.appendChild(template.content.cloneNode("true"));
     const fileexit = this.shadowRoot.querySelector(".exit");
 
     /**
      * When the exit button is clicked for updating a timestamp, close the
      * popup
      *
      * @type {HTMLElement} - the target of the event
      * @listens document#click - when the exit buttonis clicked
      */
     fileexit.addEventListener("click", () => {
       const popup = this.shadowRoot.querySelector(".container");
       popup.remove();
     });

     const timestampupdate = this.shadowRoot.querySelector(".update");
     const timestampinput = this.shadowRoot.querySelector(".name");
 
     /**
      * When the update button is clicked, create a new eventlistener that can
      * keeps track of the name of the TypeFCard
      *
      * @type {HTMLElement} - the target of the event
      * @listens document#click - when the AudioCard component is clicked
      */
     timestampupdate.addEventListener("click", evt => {
       evt.preventDefault();
       if (timestampinput.value > 40) 
       { // replace 40 with the length of the audio file in seconds
         window.alert("Invalid timestamp, please choose a timestamp that is within the audio file duration range.");
       }
       else 
       {
         const submitEvent = new CustomEvent("timestampUpdated", {
           detail: 
           {
             name: timestampinput.value,
           }
         });
         this.dispatchEvent(timestampupdate);
       }
     });
   }
 }
 customElements.define("update-timestamp-screen", UpdateTimestampScreen);