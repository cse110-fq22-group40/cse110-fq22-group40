/**
 * This file contains the implementation of the success screen which
 * appears when a user successfully creates a folder or a file
 */

// Obtain the template for the success screen component
const template = document.getElementById("success-screen-template");

/*
 * SuccessScreen implements the success screen popup which is achieved via
 * using the shadowDOM. A template of the success screen exists as a template
 * in the HTML folder and it is utilized here to create a custom component.
 */
class SuccessScreen extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });

    // Clone the template and append it to the shadowDOM
    shadow.appendChild(template.content.cloneNode("true"));
  }
}

// Define the custom component as success-screen to be used
customElements.define("success-screen", SuccessScreen);
