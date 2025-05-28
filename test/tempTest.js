import generateConsofy from "../index.js";
import { consofy } from "../index.js";


consofy.title = "MY CONSOLE"

consofy.trace({
    replace: {
        "lubiz": "<user>",
        "Downloads/Coisas/Programa%C3%A7%C3%A3o/ConsoFy": "<path>"
    }
},'This is a trace');


consofy.blank();
consofy.blank();
// Trace With options
consofy.trace({
    shortenPath: true, // hides most part of the paths shown in the console
    filterLines: ["ModuleJob"], // hides the lines that contain any value of the array
    replace: { // replace the text in the stack trace that is equal to the key of the object by the value
        "traceFunction": "<my replaced string>"
    },
    colorByRegex: [ // colorize the text in the stack trace that matches the regex
        {
            check: /(["'])(.*?)(\1)/g,
            callback: (colors, _, quote, content) => `${quote}${colors.yellow(content)}${quote}`
        },
        {
            check: /undefined/g,
            callback: (colors) => colors.red("undefined")
        },
        {
            check: /<my replaced string>/g,
            callback: (colors, content) => colors.cyan(content)
        }
    ]
},'This is a trace with options');