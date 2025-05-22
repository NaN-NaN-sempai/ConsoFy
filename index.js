// @ts-check

// Run generateCjs to generate "index.cjs"
import kleur from 'kleur';

/* slice-to-generate-cjs */

const defaultKleur = () => kleur.underline();
const defaultStyle = (txt, type="log") => colors[type].title(defaultKleur(), ` ${txt.toUpperCase()} `);

/**
 * @typedef {Object} PseudoConsole
 * @property {(type: string, color: string, ...data: any[]) => void} typeCustom
 * @property {(...data: any[]) => void} log
 * @property {(...data: any[]) => void} error
 * @property {(...data: any[]) => void} warn
 * @property {(...data: any[]) => void} info
 * @property {(...data: any[]) => void} debug
 * @property {(...data: any[]) => void} trace
 * @property {(...data: any[]) => void} dir
 * @property {(...data: any[]) => void} time
 * @property {(...data: any[]) => void} timeEnd
 * @property {(...data: any[]) => void} timeLog
 * @property {(...data: any[]) => void} assert
 * @property {(...data: any[]) => void} group
 * @property {(...data: any[]) => void} count
 * @property {(...data: any[]) => void} countReset
 * @property {(...data: any[]) => void} table
 * @property {(...data: any[]) => void} clear
 * @property {(...data: any[]) => void} success
 * @property {(...data: any[]) => void} blank
 */

/** @type {Partial<PseudoConsole>} */
const pseudoConsole = {}


const customMethods = {
    "success": console.log,
    "blank": () => console.log()
};
const overrideMethods = {
    "trace": (...data) => {
        data.shift();
        pseudoConsole.log(defaultStyle("TRACE"), `${ kleur.yellow(...data) }`);
        console.trace(...data)
    },
    "dir": (...data) => {
        data.shift();
        pseudoConsole.log(defaultStyle("DIR"));
        console.dir(data);
    },
    "time": (...data) => {
        data.shift();
        pseudoConsole.typeCustom("log", "time", kleur.magenta(`TIME "${kleur.bgBlack().white(data[0] != undefined? data[0] : "default")}" START`));
        console.time(...data);
    },
    "timeEnd": (...data) => {
        data.shift();
        pseudoConsole.typeCustom("log", "time", kleur.magenta(`TIME "${kleur.bgBlack().white(data[0] != undefined? data[0] : "default")}" END`));
        console.timeEnd(...data);
    },
    "timeLog": (...data) => {
        data.shift();
        
        pseudoConsole.typeCustom("log", "time", kleur.magenta(`TIME "${kleur.bgBlack().white(data[0] != undefined? data[0] : "default")}" TIMELOG`));
        console.timeLog(...data);
    },
    "assert": (...data) => {
        data.shift();
        if(data[0] == false){
            data.shift();
            pseudoConsole.error("Assertion failed" + (data.length? ":" : ""), ...data);
        }
    },
    "group": (...data) => {
        data.shift();
        console.group(...data);
    },
    "count": (...data) => {
        data.shift();
        pseudoConsole.typeCustom("log", "time", kleur.magenta(`COUNT "${kleur.bgBlack().white(data.length? data[0] : "default")}"`));
        console.count(...data);
    },
    "countReset": (...data) => {
        data.shift();
        pseudoConsole.typeCustom("log", "time", kleur.magenta(`COUNT "${kleur.bgBlack().white(data.length? data[0] : "default")}" RESET`));
        console.countReset(...data);
    },
    "table": (...data) => {
        data.shift();
        
        let disabledObj = data[0] === "ignore object";

        if(disabledObj) {
            data.shift();
            pseudoConsole.log(defaultStyle("TABLE"), `{ ${ kleur.yellow("...") } }`);

        } else {
            pseudoConsole.log(defaultStyle("TABLE FROM:"), ...data);
        }
        console.table(...data);
    },
    "clear": (...data) => {
        data.shift();
        console.clear();
        pseudoConsole.warn("CONSOLE CLEARED" + (data.length? ":" : ""), ...data);
    },
};


const colors = {
    "success": {
        text: "green",
        title: (k, text) => k.bgGreen().black(text),
    },
    "log": {
        title: (k, text) => k.bgWhite().black(text)
    },
    "error": {
        text: "red",
        title: (k, text) => k.bgRed().white(text),
    },
    "warn": {
        text: "yellow",
        title: (k, text) => k.bgYellow().black(text),
    },
    "info": {
        text: "blue",
        title: (k, text) => k.bgBlue().white(text),
    },
    "debug": { 
        title: (k, text) => k.bgBlack().white(text),
    },
    "trace": "log",
    "time": {
        title: (k, text) => k.bgMagenta().black(text),
    },
    "timeEnd": "time",
}


/**
 * Generates a customized console instance with styled and titled outputs.
 *
 * @function generateConsofy
 * @param {string} [title="consofy"] - The prefix title that appears before every console message.
 * @returns {PseudoConsole} - Customized console with extra methods like success, blank, and typeCustom.
 *
 * @example
 * const consofy = generateConsofy('MyApp');
 * consofy.log('This is a log');
 * consofy.error('This is an error');
 * consofy.success('This is a success');
 * consofy.typeCustom('log', 'magenta', 'Custom log');
 */
function generateConsofy (title) {
    if(!title) title = "consofy";

    const setupValues = (color) => {
        let titleText = title.toUpperCase();

        let preText = `${titleText}:`;

        let colorObj = colors[color];
        if(typeof colorObj == "string")
            colorObj = colors[colors[color]];
        
        if(colorObj && colorObj.title)
            preText = colorObj.title(defaultKleur(), ` ${preText} `);  

        return { preText, colorObj };
    }
    const setupData = (preText, type, colorObj, data) => {
        let disabled = data[0] === "disable color";
        if(disabled) data.shift();

        const sentData = data.map(d =>{
            if(colorObj && colorObj.text && !disabled) return kleur[colorObj.text](d);
            return d;
        });

        let selectedMethod = customMethods[type] || overrideMethods[type] || console[type];

        return selectedMethod(preText, ...sentData);
    }

    pseudoConsole.typeCustom = (type, color, ...data) => {
        let {preText, colorObj} = setupValues(color);
                
        return setupData(preText, type, colorObj, data);
    }

    const injectInPseudo = (type) => {
        let {preText, colorObj} = setupValues(type);
        
        pseudoConsole[type] = (...data) => {
            return setupData(preText, type, colorObj, data);
        }
    }

    for (let type in console)
        injectInPseudo(type);

    for (let type in customMethods)
        injectInPseudo(type);

    for (let type in overrideMethods)
        injectInPseudo(type); //pseudoConsole[type] = overrideMethods[type];

    return /** @type {PseudoConsole} */ (pseudoConsole);
}




/* slice-to-generate-cjs */
export default generateConsofy;