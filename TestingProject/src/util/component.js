/* This is a abstract class, dont instantiate this! */
export class Component {

    template = "";
    element = null;
    core = null;

    ready() {};

    async loadTemplate() {
        if (this.element) {
            this.element.innerHTML = await this.getTemplate();
        }
    }

    async getTemplate() {
        if (this.template == "") {
            console.warn("Template can't be empty!");
            return;
        }

        let url = "./app/" + this.template;

        let template = await fetch(url).then( (res) => res.text() );
        return template;
    }
}