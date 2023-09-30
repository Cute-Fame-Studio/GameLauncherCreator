import { Component } from "../../../util/component.js";
import { BackgroundComponent } from "../background/bg-component.js";
import { InfoComponent } from "../info/info-component.js";
import { MainScreenComponent } from "../main/main-component.js";

export class coreComponent extends Component {

    template = "/components/core/core-component.html";
    game = "game_name_1";

    config = {};

    childs = [];

    async ready() {
        await this.loadConfig();
        this.setup();
    }

    async loadConfig() {
        let configUrl = "./glc.config.json";
        await fetch(configUrl)
        .then((res) => res.text())
        .then( (json) => {
            this.config = JSON.parse(json);
        })
        .catch ( (err) => {
            console.warn(err);
        });
    }

    setup() {
        /* load background component */
        let backgroundTags = document.getElementsByTagName("background");
        let bgComponent = new BackgroundComponent(backgroundTags[0], this);
        this.childs.push(bgComponent);
        bgComponent.ready();

        /* load main screen component */
        let mainScreenTags = document.getElementsByTagName("main-screen");
        let mainScreenComponent = new MainScreenComponent(mainScreenTags[0], this);
        this.childs.push(mainScreenComponent);
        mainScreenComponent.ready();

        /* load information component */ 
         let infoScreenTags = document.getElementsByTagName("info"); 
         let infoComponent = new InfoComponent(infoScreenTags[0], this); 
         this.childs.push(infoComponent);
         infoComponent.ready();

    }

}

