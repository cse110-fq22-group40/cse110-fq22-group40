class FileSuccess extends HTMLElement {
    constructor() {
      super();
      let shadow = this.attachShadow({ mode:'open' });
  
      let successcontainer = document.createElement('div');
      successcontainer.className = "successContainer";
  
      let successtitle = document.createElement('div');
      successtitle.className = "successTitle"
  
      let successmessage = document.createElement('h2');
      successmessage.innerText = "Success!";

      let successimage = document.createElement('img');
      successimage.src = "assets/images/success.png";
      successimage.alt = "checkmark"
      successimage.className = "success";

      let successdescription = document.createElement('h3');
      successdescription.innerText = "Your file/folder has been added";
      successdescription.className = "successDescription"
  
      successcontainer.appendChild(successtitle);
      successcontainer.appendChild(successdescription);

      successtitle.appendChild(successmessage);
      successtitle.appendChild(successimage);

  
      let style = document.createElement('style');
      style.textContent = `
        .successContainer{
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
        
        .successTitle{
            display: flex;
            flex-direction: row;
            margin-top: 40px;
            font-size: 35px;
        }
        .success{
            width: 75px;
            height: 75px;
            margin-top: 35px;
        }
        
        .successDescription{
            font-size: 30px;
            margin-top: -20px;
        }
    `
      shadow.append(successcontainer);
      shadow.append(style);
    }
  }
  
  customElements.define("success-screen", FileSuccess);