class FileName extends HTMLElement {
    constructor() {
      super();
      let shadow = this.attachShadow({ mode:'open' });
  
      let filename = document.createElement('div');
      filename.className = "fileNameContainer";
  
      let filetitle = document.createElement('h2');
      filetitle.innerText = "Choose File Name";
      filetitle.className = "fileTitle"
  
      let textarea = document.createElement('textarea');
      textarea.className = "fileName";

      let filebutton = document.createElement('button');
      filebutton.innerText = "Create";
      filebutton.className = "fileCreate";
  
      filename.appendChild(filetitle);
      filename.appendChild(textarea);
      filename.appendChild(filebutton);
  
      let style = document.createElement('style');
      style.textContent = `
        .fileNameContainer{
            position: absolute;
            display: flex;
            flex-direction: column;
            align-items: center;
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
      // A5. TODO - Append the <style> and <article> elements to the Shadow DOM
      shadow.append(filename);
      shadow.append(style);
    }
  }
  
  customElements.define("file-name", FileName);