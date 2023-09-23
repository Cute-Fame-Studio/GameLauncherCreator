import { Component } from "../../../util/component.js";
import { BackgroundComponent } from "../background/bg-component.js";

export class MainScreenComponent extends Component {

    template = "components/main/main-component.html";
    
    constructor(
        _element,
        _core
    ) {
        super();
        this.element = _element;
        this.core = _core;
    }

    async ready() {
       this.loadTemplate();
    }
}