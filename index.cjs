const kleur = require('kleur');

const defaultKleur = () => kleur.underline();
const defaultStyle = (txt, type="log") => colors[type].title(defaultKleur(), ` ${txt.toUpperCase()} `);

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
 * Creates a customized console with colored output and prefixed titles.
 *
 * Supports all native console methods (log, error, warn, info, etc.)
 * and extra custom methods like "success".
 *
 * Pass "disable color" as the first argument to disable colors for a one call.
 * The 'log' method does not override the text color.
 *
 * @function createInstance
 * @param {string} title - A prefix/title that will appear before all console outputs.
 * @returns {Object} - An object with all console methods customized.
 *
 * @example
 * const generateconsofy = require('consofy');
 * const consofy = generateConsofy('My App');
 * 
 * consofy.log('Normal log');
 * consofy.error('An error occurred');
 * consofy.warn('This is a warning');
 * consofy.info('Some information');
 * consofy.success('Operation successful'); // Custom method
 * consofy.blank(); // Custom method
 * 
 * consofy.table({ name: 'John', age: 30 });
 * consofy.table('disable color', { name: 'John', age: 30 }); // Hides the object
 * 
 * // Disable colors for one call:
 * consofy.error(
 *     'disable color',
 *     'This will not be colored'
 * );
 */
function generateConsofy (title) {

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

    /**
     * Applies a custom title color to the prefix of the log message.
     * @function typeCustom
     * @param {string} type - The type of log method to override.
     * @param {string} color - The name of the color to use.
     * @param {...*} data - The data to be passed to the log method.
     * @example
     * consofy.typeCustom('log', 'yellow', 'This log message will have a yellow title');
     */
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

    return pseudoConsole;
}


module.exports = generateConsofy;