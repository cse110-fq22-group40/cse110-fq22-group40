/**
 * This file defines a class that determines the UI for uploading
 * a new audio file to the workspace.
 */
class CreateAudioFlow extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({ mode:'open' });

    // creating a container for adding audio UI pop up
    let create_flow = document.createElement('div');
    create_flow.className = "fileNameContainer";

    // adding a exit for the pop up
    let fileexit = document.createElement('button');
    fileexit.innerText = "X";
    fileexit.className = "exit";

    fileexit.addEventListener("click",() => {
      const popup = this.shadowRoot.querySelector(".fileNameContainer");
      popup.remove();
    });

    // adding a title for the pop up
    let filetitle = document.createElement('h2');
    filetitle.innerText = "Name and upload your audio!";
    filetitle.className = "fileTitle";

    // create a place for the user to add input
    let fileform = document.createElement('form');

    // adding a text input for the name of the audio in app
    let textinput = document.createElement('input');
    textinput.type = "text";
    textinput.className = "fileName";

    // adding an input for the uploaded audio
    let fileinput = document.createElement('input');
    fileinput.type = "file";
    fileinput.className = "fileUpload";
    fileinput.accept = "audio/*";

    // TODO
    let filesubmit = document.createElement('input');
    filesubmit.type = "submit";
    filesubmit.className = "fileCreate";

    filesubmit.addEventListener("click", evt => {
      evt.preventDefault();

      const submitEvent = new CustomEvent("fileSubmitted", {
        detail: {
          name: textinput.value,
          path: fileinput.files[0].path
        }
      });

      this.dispatchEvent(submitEvent);
    });

    create_flow.appendChild(fileexit);
    create_flow.appendChild(filetitle);
    fileform.appendChild(textinput);
    fileform.appendChild(fileinput);
    fileform.appendChild(filesubmit);
    create_flow.appendChild(fileform);

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

customElements.define("create-aud-object", CreateAudioFlow);
