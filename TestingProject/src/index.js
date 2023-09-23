/*
WARNING!
Here is the main script. I don't recommend you put your little hands in this!

Here are important things to the basic function of the system. If you want to change something,
change it in src/app
*/
import { coreComponent } from "./app/components/core/core-component.js";

var appTag = document.getElementsByTagName("app");

var core = new coreComponent();
await loadTemplate(core.template);
core.ready();

function loadTemplate( template ) {
    let url = "./app/" + template;
    fetch(url).then( (Response) => Response.text())
    .then( (html) => {

        for ( let i of appTag ) {
            i.innerHTML = html;
        }

    })
    .catch( (error) => {
        console.warn(error);
    });
}