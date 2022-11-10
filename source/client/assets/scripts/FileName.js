class FileName extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({ mode:'open' });

    let filename = document.createElement('div');
    filename.className = "fileNameContainer";

    let filetitle = document.createElement('h2');
    filetitle.innerText = "Create Audio Object";
    filetitle.className = "fileTitle"

    let fileform = document.createElement('form');

    let textinput = document.createElement('input');
    textinput.type = "text"
    textinput.className = "fileName";

    let fileinput = document.createElement('input');
    fileinput.type = "file"
    fileinput.className = "fileUpload";

    let filesubmit = document.createElement('input');
    filesubmit.type = "submit";
    filesubmit.className = "fileCreate"

    filename.appendChild(filetitle);
    fileform.appendChild(textinput);
    fileform.appendChild(fileinput);
    fileform.appendChild(filesubmit);
    filename.appendChild(fileform);

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
    margin-top: 50px;
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
      border: none;
      font-size: 30px;
      right: 0%;
      bottom: 0%;
      margin-bottom: 5px;
      margin-right: 5px;
    }
    `
    shadow.append(filename);
    shadow.append(style);
  }
}

customElements.define("create-aud-object", FileName);

const addButton = document.querySelector(".addButton");

addButton.addEventListener("click", () => {
  const createAudObject = document.createElement("create-aud-object");
  document.body.appendChild(createAudObject);

  const fileName = createAudObject.shadowRoot.querySelector(".fileName");
  const fileUpload = createAudObject.shadowRoot.querySelector(".fileUpload");
  const fileCreate = createAudObject.shadowRoot.querySelector(".fileCreate");

  fileCreate.addEventListener("click", evt => {
    evt.preventDefault();

    console.log(fileName.value, fileUpload.value);
  });
});