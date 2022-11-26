/**
 * This file defines a class that determines the UI for uploading
 * a new A folder to the workspace.
 */

const template = document.getElementById("create-screen-template");

class TypeACreateScreen extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode:"open" });
    shadow.appendChild(template.content.cloneNode("true"));

    const fileexit = this.shadowRoot.querySelector(".exit");

    /**
     * When the exit button is clicked for creating a TypeACard, close the
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

    /**
     * When the submit button is clicked, create a new eventlistener that can
     * keeps track of the name of the TypeACard and the parent F folder
     *
     * @type {HTMLElement} - the target of the event
     * @listens document#click - when the AudioCard component is clicked
     */
    filesubmit.addEventListener("click", evt => {
      evt.preventDefault();

      if (textinput.value.length > 40) {
        window.alert("Invalid name. Please use 40 or less characters");
      }

      else{
        const submitEvent = new CustomEvent("fileSubmitted", {
          detail: {
            name: textinput.value,
            parent: sessionStorage.getItem("TypeF")
          }
        });
        this.dispatchEvent(submitEvent);
      }
    });
  }
}

customElements.define("type-a-create-screen", TypeACreateScreen);