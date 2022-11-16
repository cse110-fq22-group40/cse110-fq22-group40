/**
 * This file defines a class that determines how an File Card is rendered 
 * for each audio file uploaded by the user.
 */
 class FolderCard extends HTMLElement {
    constructor() {
      super();
      let shadow = this.attachShadow({ mode:'open' });
  
      // creating the container for the entire audio card
      let audiocard = document.createElement('div');
      audiocard.className = "audioCard";
  
      // add on click here?
  
      // setting the icon for the card
      let audioimage = document.createElement('img');
      audioimage.src = "assets/images/folder.png";
      audioimage.className = "musicIcon";
      audioimage.alt = "folder icon";
  
      // creating the name of the audio card as given by the user
      let audioname = document.createElement('h2');
  
      // adding elements to the card
      audiocard.appendChild(audioimage);
      audiocard.appendChild(audioname);
  
      // adding style unique to the audio cards
      let style = document.createElement('style');
      style.textContent = `
      .audioCard{
          position: relative;
          display: flex;
          flex-wrap: wrap;
          flex-direction: column;
          align-items: center;
          text-align: center;
          min-width: 150px;
          height: 200px;
          background: linear-gradient(180deg, #FFECD2 0%, #FCB69F 100%);;
          border-style: solid;
          border-width: 2px;
          box-shadow: 2px 2px 2px; 
          margin: 35px 20px 20px 20px;
      }
      
      .musicIcon{
          width: 50px;
          height: 50px;
          margin-top: 20px;
      }
      `
  
      // adding elements to card
      shadow.append(audiocard);
      shadow.append(style);
  
      const myShadowDom = this.shadowRoot;
      myShadowDom.addEventListener("click", () => {
        //localStorage.setItem("TypeF", "Test");
        window.location = "TypeA.html"
      })
    }
  
    // ? TODO
    set name(name) {
      const audioname = this.shadowRoot.querySelector("h2");
      audioname.textContent = name;
    }
  }
  
  // define a custom HTML element
  customElements.define("folder-card", FolderCard);
  