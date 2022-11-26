/**
 * This file defines a class that determines how an AudioObjectCard is rendered
 * for each audio file uploaded by the user.
 */

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
      const audObjectName = this.shadowRoot.querySelector("h2").textContent;
      sessionStorage.setItem("AudioObject", audObjectName);
      window.location = "audio-object.html"
    })
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
