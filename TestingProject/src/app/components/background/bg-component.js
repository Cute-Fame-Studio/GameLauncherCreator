import { Component } from "../../../util/component.js";

export class BackgroundComponent extends Component {

    constructor(
        _element,
        _core
    ) {
        super();
        this.core = _core;
        this.element = _element;
    }

    backgrounds = [];
    backgroundTime = 1.0;
    backgroundIndex = 0;
    backgroundUpdated = false;
    layers = [];

    get config() { return this.core.config };
    get game() { return this.core.game };

    ready() {
        this.setup();
        this.loop()
    }

    setup() {
        this.backgrounds = this.config.games[this.game].backgrounds;

        /* Create two img elements to the transition effect */
        let imgA = document.createElement("div");
        let imgB = document.createElement("div");
        let shader = document.createElement("shader");
        /*configure the img elements */
        imgA.style.backgroundImage = "url(" + this.backgrounds[0] + ")";
        imgA.style.backgroundImage = "url(" + this.backgrounds[1] + ")";
        imgA.classList.add("layer");
        imgB.classList.add("layer");
        imgA.style.opacity = 1;
        imgB.style.opacity = 0;

        /*add the img elements to the DOM and store they in a array too */
        this.element.appendChild(imgA);
        this.element.appendChild(imgB);
        this.element.appendChild(shader);
        this.layers.push(imgA);
        this.layers.push(imgB);
    }

    updateBackground(delta) {
        this.backgroundTime += delta;
        /* Update some numbers above with the background duration variables */
        if (this.backgroundTime >= 5) {
            
            if (!this.backgroundUpdated) {
                this.layers[0].style.backgroundImage = "url(" + this.backgrounds[this.backgroundIndex] + ")";

                this.backgroundIndex++;
                if (this.backgroundIndex >= this.backgrounds.length) this.backgroundIndex = 0;

                this.layers[1].style.backgroundImage = "url(" + this.backgrounds[this.backgroundIndex] + ")";

                this.backgroundUpdated = true;
            }

            if (this.backgroundTime <= 5 + 1) {
                let time = this.backgroundTime - 5;
                let maxTime = 1;
                let percentage = time / maxTime;
                this.layers[1].style.opacity = percentage;

            } else {
                this.layers[1].style.opacity = 0;
                this.layers[0].style.backgroundImage = "url(" + this.backgrounds[this.backgroundIndex] + ")";
                this.backgroundUpdated = false;
                this.backgroundTime = 0;
            }
        }
    }

    oldTimestamp = 0;
    loop (timeStamp) {
        if (!isNaN(timeStamp)) {
            let secondsPassed = (timeStamp - this.oldTimestamp) / 1000;
            this.oldTimestamp = timeStamp;

            if (this.backgrounds.length > 1)
                this.updateBackground(secondsPassed);
        }

        window.requestAnimationFrame(this.loop.bind(this));
    }
}