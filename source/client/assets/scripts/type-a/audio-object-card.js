/**
 * This file defines a class that determines how an AudioObjectCard is rendered
 * for each audio file uploaded by the user.
 */

const template = document.getElementById("card-template");

/**
 * Class for our AudioObjectCard functions and constructor. Total of just two 
 * functions, one being th constructor and the other being one to set the name.
 */
class AudioObjectCard extends HTMLElement {
  /**
   * Constructor for AudioObjectCard 
   * 
   * @constructor
   */
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(template.content.cloneNode("true"));

    /**
     * When the AudioObjectCard object is clicked, set the path in 
     * sessionStorage and go to the AudioObject.html page
     *
     * @type {shadowRoot} - the target of the event
     * @listens shadowRoot#click - when the AudioObjectCard component is 
     * clicked
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
  }

  /**
   * Sets the name of the AudioObjectCard.
   *
   * @param {string} name - the name we want to give the audio card
   */
  set name(name) {
    const audioname = this.shadowRoot.querySelector("h2");
    audioname.textContent = name;
  }
}

// defining a custom HTML element
customElements.define("audio-object-card", AudioObjectCard);
