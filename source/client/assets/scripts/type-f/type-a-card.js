/**
 * This file defines a class that determines how a TypeACard is rendered 
 * for each A Folder created by the user.
 */

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