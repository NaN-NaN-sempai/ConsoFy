/* import generateConsofy from '../index.js';

const consofy = generateConsofy('consofy');

const args = process.argv.slice(2);

let consoleTest;



if(args[0] == "console") consoleTest = console;
else consoleTest = consofy; */


/* 

consoleTest.clear();
consoleTest.log('.log - This is a log message');
consoleTest.info('.info - This is an info message');
consoleTest.warn('.warn - This is a warning');
consoleTest.error('.error - This is an error');
consoleTest.error('disable color', '.error - This error has no color, the first argument is "disable color"');
consoleTest.debug('.debug - This is a debug message');

consoleTest.log('.success - Success method test, works only with consofy ↓');
if(consoleTest.success)
    consoleTest.success('.success - This is a success message (this is a custom method)');
consoleTest.log('.success - There should be a green log ↑');

consoleTest.log('.blank - Blank method test, works only with consofy ↓');
if(consoleTest.blank)
    consoleTest.blank();
consoleTest.log('.blank - There should be a blank line ↑');

console.log('');
consoleTest.trace('.trace - This is a trace');
console.log('');
consoleTest.dir({ method: '.dir', example: 'Shows object structure' });

console.log('');
consoleTest.assert(false, '.assert - This should trigger assert');
console.log('');

consoleTest.log('.group - Group Log ↓');
consoleTest.group('');
consoleTest.log('.log - begin of group 1');
consoleTest.group('');
consoleTest.log('.log - begin of group 2');
consoleTest.group('');
consoleTest.warn('.warn - in of group 3');
consoleTest.groupEnd('');
consoleTest.error('.error - end of group 3');
consoleTest.groupEnd('');
consoleTest.log('.log - end of group 2');
consoleTest.groupEnd('');
consoleTest.log('.log - end of group 1');

console.log('');

consoleTest.log('.group - Named group Log ↓');
consoleTest.group('Layer 1');
consoleTest.log('.log - begin of group 1');
consoleTest.group('Layer 2');
consoleTest.log('.log - begin of group 2');
consoleTest.group('Layer 3');
consoleTest.warn('.warn - begin of group 3');
consoleTest.groupEnd('');
consoleTest.error('.error - end of group 3');
consoleTest.groupEnd('');
consoleTest.log('.log - end of group 2');
consoleTest.groupEnd('');
consoleTest.log('.log - end of group 1');
console.log('');

consoleTest.log('.count - Counter ↓');
consoleTest.count('myCounter');
consoleTest.count('myCounter');
console.log('');
consoleTest.countReset('myCounter');
console.log('');
consoleTest.count();
console.log('');
consoleTest.countReset();
console.log('');

consoleTest.table([
    { method: '.table', name: 'Alice', age: 25 },
    { method: '.table', name: 'Bob', age: 30 }
]);
console.log('');
consoleTest.log('This table does not show the object structure, the first argument is "ignore object" ↓');
consoleTest.table('ignore object', [
    { method: '.table', name: 'Alice', age: 25 },
    { method: '.table', name: 'Bob', age: 30 }
]);
console.log('');

consoleTest.log('.time - Time counters ↓');
consoleTest.time('time');
setTimeout(() => {
    consoleTest.timeLog('time', 'my time log');
    console.log('');

    consoleTest.time();
    setTimeout(() => {
    consoleTest.timeEnd('time');
        consoleTest.timeEnd();

        consoleTest.log(`Test executed with ${args[0] == "console"? "console" : "consofy"}`);
        if(args[0] != "console")
            consoleTest.log('To run the test for the javascript console, run "npm test -- console"');
    }, 500);
}, 500);

 */


import generateConsofy from '../index.js';

let consofy = generateConsofy('my console')

consofy.blank();
consofy.blank();
consofy.typeCustom('log', 'error', 'This message is not an error');
consofy.blank();
consofy.blank();
consofy.typeCustom('warn', 'info', 'Reminder: This message is a warning');
consofy.blank();
