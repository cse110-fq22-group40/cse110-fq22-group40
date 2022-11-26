/**
 * This file defines a class that determines how an TypeFCard is rendered 
 * for each F folder that is created by the user.
 */

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
    this.shadowRoot.addEventListener("click", () => {
      const typeFName = this.shadowRoot.querySelector("h2");
      sessionStorage.setItem("TypeF", typeFName.textContent);
      window.location = "type-f.html";
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
  