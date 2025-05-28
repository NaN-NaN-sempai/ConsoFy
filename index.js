// Run generateCjs to generate "index.cjs"
import kleur from 'kleur';
import path from 'path';

/* slice-to-generate-cjs */


function shortenPath(fullPath) {
    if (!fullPath) return fullPath;

    if (fullPath.startsWith('file:///')) {
        fullPath = fullPath.slice(8);
    }

    fullPath = decodeURIComponent(fullPath);

    const relPath = path.relative(process.cwd(), fullPath);


    return `'${relPath}'`;
}

const defaultTitle = "<anonymous>";
function generateConsofy(title = defaultTitle) {
    if (typeof title !== "string") title = defaultTitle;

    const customMethods = {
        "success": console.log,
        "blank": () => console.log(),
    };
    const overrideMethods = {
        "trace": function traceFunction(...data) {
            const keys = ["shortenPath", "filterLines", "replace", "colorByRegex"];
            const checkKeys = (sbj) => {
                let bool = false;
                let obj = {};
                Object.entries(sbj).forEach(([key]) => {
                    bool = keys.includes(key) || bool;
                    obj[key] = sbj[key];
                });

                if (bool) obj.hasKeys = true;
                return obj;
            }

            data.shift();
            let name = data;
            const trace = (new Error()).stack;

            let keysObject = checkKeys(data[0]);
            if (keysObject.hasKeys) data.shift();

            let auxTrace = trace.slice(6).split("\n");

            const getShortenPath = () => {
                return typeof keysObject.shortenPath === "boolean" ? keysObject[keys[0]] : false;
            };

            const getFilterLines = () => {
                return Array.isArray(keysObject[keys[1]]) ? keysObject[keys[1]] : [];
            };

            const getReplaceList = () => {
                return typeof keysObject[keys[2]] === "object" ? keysObject[keys[2]] : {};
            };

            auxTrace = auxTrace.filter(line => {
                return !getFilterLines().some(filterLine => line.includes(filterLine));
            });
            auxTrace = auxTrace.map(line => {
                let replacedLine = line;

                Object.entries(getReplaceList()).forEach(([key, value]) => {
                    replacedLine = replacedLine.replaceAll(key, value);
                });

                return replacedLine;
            });

            auxTrace = auxTrace.join("\n");

            if (getShortenPath()) {
                auxTrace = auxTrace.replace(/file:\/\/\/([^\s),]+)/g, (match, p1) => {
                    return shortenPath('file:///' + p1);
                });
                auxTrace = auxTrace.replace(/[A-Za-z]:\\[^:\n\r)]+/g, (match, p1) => {
                    return shortenPath(match);
                });
            }

            const getColorByRegex = () => {
                return Array.isArray(keysObject[keys[3]]) ? keysObject[keys[3]] : [];
            };

            function colorizeStack(stack) {
                const colors = {
                    cyan: str => `\x1b[36m${str}\x1b[0m`,
                    yellow: str => `\x1b[33m${str}\x1b[0m`,
                    red: str => `\x1b[31m${str}\x1b[0m`,
                    green: str => `\x1b[32m${str}\x1b[0m`,
                    blue: str => `\x1b[34m${str}\x1b[0m`,
                    magenta: str => `\x1b[35m${str}\x1b[0m`,
                    gray: str => `\x1b[90m${str}\x1b[0m`
                };

                let aux = stack
                    .split('\n')
                    .map(line => {
                        getColorByRegex().forEach(({ check, callback }) => {
                            line = line.replace(check, callback.bind(null, colors));                            
                        })
                        return line;
                    });

                return aux.join('\n');
            }

            auxTrace = colorizeStack(auxTrace);



            pseudoConsole.log(defaultStyle("TRACE"), ...name);
            console.log(auxTrace);
        },
        "dir": (...data) => {
            data.shift(); // @ts-ignore
            pseudoConsole.log(defaultStyle("DIR"));
            console.dir(data);
        },
        "time": (...data) => {
            data.shift(); // @ts-ignore
            pseudoConsole.typeCustom("log", "time", kleur.magenta(`TIME "${kleur.bgBlack().white(data[0] != undefined ? data[0] : "default")}" START`));
            console.time(...data);
        },
        "timeEnd": (...data) => {
            data.shift(); // @ts-ignore
            pseudoConsole.typeCustom("log", "time", kleur.magenta(`TIME "${kleur.bgBlack().white(data[0] != undefined ? data[0] : "default")}" END`));
            console.timeEnd(...data);
        },
        "timeLog": (...data) => {
            data.shift(); // @ts-ignore        
            pseudoConsole.typeCustom("log", "time", kleur.magenta(`TIME "${kleur.bgBlack().white(data[0] != undefined ? data[0] : "default")}" TIMELOG`));
            console.timeLog(...data);
        },
        "assert": (...data) => {
            data.shift();
            if (data[0] == false) {
                data.shift(); // @ts-ignore
                pseudoConsole.error("Assertion failed" + (data.length ? ":" : ""), ...data);
            }
        },
        "group": (...data) => {
            data.shift();
            console.group(...data);
        },
        "count": (...data) => {
            data.shift(); // @ts-ignore
            pseudoConsole.typeCustom("log", "time", kleur.magenta(`COUNT "${kleur.bgBlack().white(data.length ? data[0] : "default")}"`));
            console.count(...data);
        },
        "countReset": (...data) => {
            data.shift(); // @ts-ignore
            pseudoConsole.typeCustom("log", "time", kleur.magenta(`COUNT "${kleur.bgBlack().white(data.length ? data[0] : "default")}" RESET`));
            console.countReset(...data);
        },
        "table": (...data) => {
            data.shift();

            let disabledObj = data[0] === "ignore object";

            if (disabledObj) {
                data.shift(); // @ts-ignore
                pseudoConsole.log(defaultStyle("TABLE"), `{ ${kleur.yellow("...")} }`);

            } else { // @ts-ignore
                pseudoConsole.log(defaultStyle("TABLE FROM:"), ...data);
            }
            console.table(...data);
        },
        "clear": (...data) => {
            data.shift();
            console.clear(); // @ts-ignore
            pseudoConsole.warn("CONSOLE CLEARED" + (data.length ? ":" : ""), ...data);
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

    const pseudoConsole = {
        title: title
    };


    const defaultKleur = () => kleur.underline();
    const defaultStyle = (txt, type = "log") => colors[type].title(defaultKleur(), ` ${txt} `);

    const getTitle = () => pseudoConsole.title;

    const setupValues = (color) => {
        let titleText = getTitle();

        let preText = `${titleText}:`;

        let colorObj = colors[color];
        if (typeof colorObj == "string")
            colorObj = colors[colors[color]];

        if (colorObj && colorObj.title)
            preText = colorObj.title(defaultKleur(), ` ${preText} `);

        return { preText, colorObj };
    }
    const setupData = (preText, type, colorObj, data) => {
        let disabled = data[0] === "disable color";
        if (disabled) data.shift();

        const sentData = data.map(d => {
            if (colorObj && colorObj.text && !disabled) return kleur[colorObj.text](d);
            return d;
        });

        let selectedMethod = customMethods[type] || overrideMethods[type] || console[type];

        return selectedMethod(preText, ...sentData);
    }

    pseudoConsole.typeCustom = (type, color, ...data) => {
        let { preText, colorObj } = setupValues(color);

        return setupData(preText, type, colorObj, data);
    }

    const injectInPseudo = (type) => {

        pseudoConsole[type] = (...data) => {
            let { preText, colorObj } = setupValues(type);
            return setupData(preText, type, colorObj, data);
        }
    }

    for (let type in console)
        injectInPseudo(type);

    for (let type in customMethods)
        injectInPseudo(type);

    for (let type in overrideMethods)
        injectInPseudo(type);

    return pseudoConsole;
}




/* slice-to-generate-cjs */
export default generateConsofy;
export const consofy = generateConsofy();