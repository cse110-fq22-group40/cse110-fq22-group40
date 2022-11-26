/**
 * This file defines a class that determines the UI for uploading
 * a new audio file to the workspace.
 */

const template = document.getElementById("create-screen-template");

class AudioObjectCreateScreen extends HTMLElement {
  constructor() {
    super();
    
    const shadow = this.attachShadow({ mode:"open" });
    shadow.appendChild(template.content.cloneNode("true"));

    const fileexit = this.shadowRoot.querySelector(".exit");

    /**
     * When the exit button is clicked for creating an AudioObject, close the
     * popup
     *
     * @type {HTMLElement} - the target of the event
     * @listens document#click - when the exit buttonis clicked
     */
    fileexit.addEventListener("click",() => {
      const popup = this.shadowRoot.querySelector(".container");
      popup.remove();
    });

    const filesubmit = this.shadowRoot.querySelector(".create");
    const textinput = this.shadowRoot.querySelector(".name");
    const fileinput = this.shadowRoot.querySelector(".upload");

    /**
     * When the submit button is clicked, create a new eventlistener that can
     * keeps track of the name of the AudioObject and the path of the mp3 file
     *
     * @type {HTMLElement} - the target of the event
     * @listens document#click - when the AudioCard component is clicked
     */
    filesubmit.addEventListener("click", evt => {
      evt.preventDefault();

      if (textinput.value.length > 40){
        window.alert("Invalid name. Please use 40 or less characters");
      }
	  
	  if (fileinput.value == ""){
		window.alert("No file attached. Please choose your audio file");
	  }

      else{
        const submitEvent = new CustomEvent("fileSubmitted", {
          detail: {
            name: textinput.value,
            path: fileinput.files[0].path
          }
        });

        this.dispatchEvent(submitEvent);
      }
    });
  }
}

customElements.define("audio-object-create-screen", AudioObjectCreateScreen);
