class AudioCard extends HTMLElement {
  constructor() {
    super();
    let shadow = this.attachShadow({ mode:'open' });

    let audiocard = document.createElement('div');
    audiocard.className = "audioCard";

    let audioimage = document.createElement('img');
    audioimage.src = "assets/images/musicicon.png";
    audioimage.className = "musicIcon";
    audioimage.alt = "music icon";

    let audioname = document.createElement('h2');
    let audiopath = document.createElement('p');

    audiocard.appendChild(audioimage);
    audiocard.appendChild(audioname);
    audiocard.appendChild(audiopath);

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
    shadow.append(audiocard);
    shadow.append(style);
  }

  set name(name) {
    const audioname = this.shadowRoot.querySelector("h2");
    audioname.textContent = name;
  }

  set path(path) {
    const audiopath = this.shadowRoot.querySelector("p");
    audiopath.textContent = path;
  }
}

customElements.define("audio-card", AudioCard);