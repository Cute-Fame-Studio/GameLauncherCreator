import { Component } from "../../../util/component.js";

export class InfoComponent extends Component { 

    template = "components/info/info-component.html";

    constructor(_elmRef, _core)
    {
        super();
        this.element = _elmRef,
        this.core = _core;
    } 
  
    ready()
    {
        this.loadTemplate();
    }
} 
