interface ConsofyConsole {
    /** Standard log output. */
    log(...data: any[]): void;

    /** Error output (red). If the first argument is "disable color", the error text will not have a color. */
    error(...data: any[]): void;

    /** Warning output (yellow). If the first argument is "disable color", the error text will not have a color. */
    warn(...data: any[]): void;

    /** Informational output (blue). If the first argument is "disable color", the error text will not have a color. */
    info(...data: any[]): void;

    /** Debug output (black). */
    debug(...data: any[]): void;

    /** Shows the stack trace of execution. ⚠️ Passing large objects might generate very long output.
     *    The first argument can be a Object containing some options to treat the output.
     * "shortenPath", "filterLines", "replace", "colorByRegex"
     *    - shortenPath: boolean - Shorten the path of the file. Default: false.
     *    - filterLines: Array<string> - Hide the lines of the stack trace that contain any of the strings in the array. Default: [].
     *    - replace: Object - Replace the text in the stack trace that is equal to the key of the object by the value. Default: {}.
     *      - Example: { "value to be replaced": "new value" }
     *    - colorByRegex: Array<Object> - Color the text in the stack trace that matches the regex. Default: [].
     *      - Example: 
     * 
     *      [{ // colorize the text between quotes
     * 
     *          check: /(["'])(.*?)(\1)/g,
     * 
     *          callback: (colors, _, quote, content) => `${quote}${colors.yellow(content)}${quote}` )
     * 
     *      }];
     *      - The supported colors are:
     * 
     *      [cyan, yellow, red, green, blue, magenta, gray] */
    trace(...data: any[]): void;

    /** Displays a list of all properties of a specified object. */
    dir(...data: any[]): void;

    /** Starts a timer with a label, label is optional. */
    time(...data: any[]): void;

    /** Stops the timer started by `time` and logs the elapsed time. Optional label. */
    timeEnd(...data: any[]): void;

    /** Logs the current time of an active timer without stopping it. Optional label. */
    timeLog(...data: any[]): void;

    /** Throws an error if the first expression is false. */
    assert(...data: any[]): void;

    /** Starts a new message group in the console. */
    group(...data: any[]): void;

    /** Counts how many times this count has been called with the same label, label is optional. */
    count(...data: any[]): void;

    /** Resets the counter for `count`. Optional label. */
    countReset(...data: any[]): void;

    /** Displays data as a table in the console. If the first argument is "ignore object", the object will be hidden. */
    table(...data: any[]): void;

    /** Clears the console and shows a message if provided. */
    clear(...data: any[]): void;

    /** [CONSOFY ONLY] Success log (green) for positive or confirmation messages. */
    success(...data: any[]): void;

    /** [CONSOFY ONLY] Prints a blank line in the console. */
    blank(...data: any[]): void;

    /** [CONSOFY ONLY] Logs a custom message with a given type and colorScheme. Supported colorScheme: ["success", "log", "error", "warn", "info", "debug", "time"] */
    typeCustom(type: string, colorScheme: string, ...data: any[]): void;
}

/**
 * Generates a customized console instance with styled and titled outputs.
 *
 * @param title The prefix title that appears before every console message.
 * @returns A custom console instance.
 */
declare function generateConsofy(title: string): ConsofyConsole {
    return {
        log: (...data: any[]) => console.log(title, ...data),
        error: (...data: any[]) => console.error(title, ...data),
        warn: (...data: any[]) => console.warn(title, ...data),
        info: (...data: any[]) => console.info(title, ...data),
        debug: (...data: any[]) => console.debug(title, ...data),
        trace: (...data: any[]) => console.trace(title, ...data),
        dir: (...data: any[]) => console.dir(...data),
        time: (...data: any[]) => console.time(...data),
        timeEnd: (...data: any[]) => console.timeEnd(...data),
        timeLog: (...data: any[]) => console.timeLog(...data),
        assert: (...data: any[]) => console.assert(...data),
        group: (...data: any[]) => console.group(...data),
        count: (...data: any[]) => console.count(...data),
        countReset: (...data: any[]) => console.countReset(...data),
        table: (...data: any[]) => console.table(...data),
        clear: (...data: any[]) => console.clear(),
        success: (...data: any[]) => console.log(`%c✔ ${title}`, "color: green", ...data),
        blank: () => console.log(''),
        typeCustom: (type: string, colorScheme: string, ...data: any[]) => {
            console[type](`%c${title}`, `color: ${colorScheme}`, ...data);
        },
    };
}

export default generateConsofy;
export const consofy = generateConsofy();