const template = document.getElementById("success-screen-template");

class SuccessScreen extends HTMLElement {
  constructor() {
    super();
    
    const shadow = this.attachShadow({ mode:"open" });
    shadow.appendChild(template.content.cloneNode("true"));
  }
}

customElements.define("success-screen", SuccessScreen);