/*
    This class is a css transpilator.
    It Read the styles JSON files and converts the styles in it
    in a css standard script.
*/
export class StyleHandler {

    core = null;
    cssElm = null;
    get config() { return this.core.config };

    constructor(_core, _cssElm)
    {
        this.core = _core;
        this.cssElm = _cssElm;
    }

    async updateStyles()
    {
        if (this.config["styles"] == undefined) return;

        let stylesFiles = [];
        for (let i of this.config.styles) {
            let styleFile = await this.loadStyleFile(i);
            stylesFiles.push(styleFile);
        }

        let elementStyles = {};
        let forSearch = [];
        
        // Loop for the files to add the first parameters
        for (let file of stylesFiles)
        {
            for (let key in file) {
                let value = file[key];
                forSearch.push( new Token(key, value, ["app"]) )
            }
        }

        // Make a recursive loop for all parameters
        while(forSearch.length > 0) {
            let i = forSearch.shift();

            if (
                typeof i.value == "number" ||
                typeof i.value == "string" ||
                (typeof i.value == "object" &&! Array.isArray(i.value))
            ) {

                let res = this.transcript(i);
                if (Array.isArray(res)) {
                    for (let i of res) { forSearch.push(i) };
                } else {
                    let path = res.parent.join(" ");

                    if (elementStyles[path] == undefined) elementStyles[path] = {};
                    elementStyles[path][res.key] = res.value;
                }

            } else {
                // Handle errors here
                console.error("STYLE ERROR:\nType " +
                (!Array.isArray(i.value) ? typeof i.value : "array") +
                " can't be used in " + i.key + "!");
                return;
            }
        }

        let CssScript =`/* This script is generated by code! */\n`;

        for (let path in elementStyles) {
            CssScript += path + " {\n";

            for (let style in elementStyles[path]) {
                let value = elementStyles[path][style];

                CssScript += "\t" + style + " : " + value + ";\n";
            }

            CssScript += "}\n";
        }

        console.log(CssScript);
        this.cssElm.innerHTML = CssScript;
    }

    async loadStyleFile(filePath)
    {
        return JSON.parse(await fetch(filePath).then(res => res.text()));
    }

    transcript( token )
    {
        let key = token.key;
        let type = key.substring(0, 1);
        let label = key.substring(1, key.length);

        switch(type) {
            case "@": // if token is a tag,
            case "#": // an id
            case ".": // or a class
                return this.getChildrenTokens(token, type, label);
            
            default: // is a parameter or an unknow data
                return {
                    "parent" : token.parents,
                    "key" : key,
                    "value" : token.value
                };
        }
    }

    getChildrenTokens(data, type, label)
    {
        let newTokens = [];
        let nParents = data.parents;
        nParents.push( type == "@" ? label : ( type == "#" ? ("#" + label) : ("." + label) ) );
        
        for (let key in data.value) {
            let value = data.value[key];
            newTokens.push( new Token(key, value, nParents) );
        }

        return newTokens;

    }

}

class Token {
    key;
    value;
    parents;

    constructor(_key, _value, _parents)
    {
        this.key = _key;
        this.value = _value;
        this.parents = _parents.slice(0);
    }
}