/**
 * This file defines a class that determines the UI for uploading
 * a new F folder to the workspace.
 */

class FolderFCreate extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({ mode:'open' });
  
    // creating a container for adding F folder pop up
    let create_flow = document.createElement('div');
    create_flow.className = "fileNameContainer";
  
    // adding an exit for the pop up
    let fileexit = document.createElement('button');
    fileexit.innerText = "X";
    fileexit.className = "exit";
  
    /**
     * When the exit button is clicked for creating a FolderFCard, close the
     * popup
     *
     * @type {HTMLElement} - the target of the event
     * @listens document#click - when the exit buttonis clicked
     */
    fileexit.addEventListener("click",() => {
      const popup = this.shadowRoot.querySelector(".fileNameContainer");
      popup.remove();
    });
  
    // adding a title for the pop up
    let filetitle = document.createElement('h2');
    filetitle.innerText = "Name and upload your folder!";
    filetitle.className = "fileTitle";
  
    // create a place for the user to add input
    let fileform = document.createElement("form");
  
    // adding a text input for the name of the F folder in app
    let textinput = document.createElement('input');
    textinput.type = "text";
    textinput.className = "fileName";
  
    // adding a submit button
    let filesubmit = document.createElement('input');
    filesubmit.type = "submit";
    filesubmit.className = "fileCreate";
  
    /**
     * When the submit button is clicked, create a new eventlistener that can
     * keeps track of the name of the FolderFCard
     *
     * @type {HTMLElement} - the target of the event
     * @listens document#click - when the AudioCard component is clicked
     */
    filesubmit.addEventListener("click", evt => {
      evt.preventDefault();
  
      if (textinput.value.length > 40){
        window.alert("Invalid name. Please use 40 or less characters");
      }
      
      else{
        const submitEvent = new CustomEvent("fileSubmitted", {
          detail: {
            name: textinput.value,
          }
        });
    
        this.dispatchEvent(submitEvent);
      }
    });
  
    // appending all the elements created
    create_flow.appendChild(fileexit);
    create_flow.appendChild(filetitle);
    fileform.appendChild(textinput);
    fileform.appendChild(filesubmit);
    create_flow.appendChild(fileform);
  
    //set the style of the FolderFCard
    let style = document.createElement('style');
    style.textContent = `  
    .fileNameContainer{
      position: absolute;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      width: 450px;
      height: 250px;
      background: linear-gradient(180deg, #DFE9F3 0%, #FFFFFF 100%);
      top: 50%;
      left: 50%;
      margin-top: -150px;
      margin-left: -225px;
      border-radius: 10px;
    }
  
    .fileTitle{
    margin-top: 30px;
    }
  
    .fileName{
      resize: none;
      width: 375px;
      height: 50px;
      border-radius: 10px;
      border-width: 2px;
      border-color: black;
      font-size: 20px;
    }
  
    .fileUpload{
      margin-top: 10px;
      margin-left: 75px;
    }
  
    .fileCreate{
      position: absolute;
      background: none;
      border-radius: 5px;
      border-color: rgba(0,128,128,1);
      border-width: 1.5px;
      font-size: 16px;
      right: 0%;
      bottom: 0%;
      margin-bottom: 5px;
      margin-right: 5px;
    }
  
    .exit{
      margin-top: 10px;
      font-size: 20px;
      border-color: rgba(0,128,128,1);
      color: red;
      margin-right: auto;
      margin-left: 8px;
    }
    `
    shadow.append(create_flow);
    shadow.append(style);
  }
}

customElements.define("create-filef-object", FolderFCreate);