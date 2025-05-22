<div align="center">

<a href="https://github.com/NaN-NaN-sempai/ConsoFy/">
  <img title="ConsoFy Logo" alt="ConsoFy Logo" width="300px" src="https://raw.githubusercontent.com/NaN-NaN-sempai/ConsoFy/refs/heads/main/images/logo.png" />
  
  # ConsoFy:<br>Your Console Clean and Stylish
</a>

[![npm v9.8.1](https://img.shields.io/badge/npm-v9.8.1-00FF00?style=for-the-badge&logo=npm&color=CB3837)](https://www.npmjs.com/package/consofy)
![Unpacked Size: 223.9 kB](https://img.shields.io/badge/Unpacked_Size-223.9_kB-00FF00?style=for-the-badge&color=5599FF)
<br>
[![Github](https://img.shields.io/badge/github-00FF00?style=for-the-badge&logo=github&color=181717)](https://github.com/NaN-NaN-sempai/ConsoFy)
[![Talk with me](https://img.shields.io/badge/talk_with_me-FFFF00?style=for-the-badge&logoColor=white&logo=whatsapp&color=25D366)](https://wa.me/5574981395580?text=I%20came%20from%20npm!)

</div>

## Table of Content
- [ConsoFy: Your Console Clean and Stylish](#consofyyour-console-clean-and-stylish)
- [Table of content](#table-of-content)
- [Features](#features)
- [Support](#support)
- [About](#about)
- [Installing](#installing)
  - [CDN](#cdn)
- [Example](#example)
  - [Methods](#methods)
  - [Custom Methods](#custom-methods)
- [Credits](#credits)

## Features
- ✅ Simple and clean console formatting
- ✅ Full JS Doc implementation
- ✅ Colored tags for each log type (log, info, warn, error, success, debug...)
- ✅ Custom title/prefix for each instance
- ✅ Native console methods supported (log, error, warn, info, trace, time, count, etc.)
- ✅ Extra methods:
  - `success()` — green success logs
  - `blank()` — prints an empty line
  - `typeCustom()` — apply custom colors to any log type
- ✅ Smart handling for:
  - `table()` — with object hide option (`"ignore object"`)
  - `assert()`, `trace()`, `time()`, `timeLog()`, `timeEnd()`, `count()`, `countReset()`
- ✅ Option to disable colors for any single log (`"disable color"`)
- ✅ Consistent and styled console output for better readability
- ✅ Lightweight, no dependencies besides `kleur`

## Support
<div align="center">

[![ES6 Module](https://img.shields.io/badge/ES6-import-F7DF1E?style=for-the-badge&logo=javascript&logoColor=F7DF1E&color=F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
[![Comonn JS](https://img.shields.io/badge/Common_js-require-F7DF1E?style=for-the-badge&logo=javascript&logoColor=F7DF1E&color=F7DF1E)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
<br>
![Node.js](https://img.shields.io/badge/node.js-FFFF00?style=for-the-badge&logoColor=white&logo=node.js&color=339933)

</div>

## About
Consofy is a simple tool to organize your logs. It's easy to use and works just like the default JavaScript `console` object, behaving in the same way.

The name `ConsoFy` was created to keep the same word structure as the word console, making it easy to write when coding. The suffix `-Fy` was added to suggest the idea of transforming or enhancing the console.

Example:
```javascript
// standard vs consofy
console.log("Hello World!");
consofy.log("Hello World!");
```


About it's usage, the module imports a `generateConsofy` function that recieve a param `title`, the text that will be shown in the console for this `consofy` instance.


## Installing
Install the package using npm:
```css
npm install consofy
```

(optional) Run the test to learn all the supported methods:
```css
consofyTest
```

(optional) Run the test with the javascript console:
```css
consofyTest -- console
```

Once the package is installed, you can import ConsoFy to your project:

```javascript
import generateConsofy from "consofy";

const consofy = generateConsofy("my console");
```

If you are using `CommomJS`:

```javascript
const generateConsofy = require("consofy");

const consofy = generateConsofy("my console");
```

### CDN
Using jsDelivr CDN (browser module): WIP
```html

<script src="https://cdn.jsdelivr.net/npm/consofy@latest/index.js"></script>

```

Using unpkg CDN: WIP
```html

<script src="https://unpkg.com/consofy@latest/index.js"></script>

```

## Example
There is a simple example of usage:

```javascript
consofy.log("Hello World!")
```
Result:

<img src="https://raw.githubusercontent.com/NaN-NaN-sempai/ConsoFy/refs/heads/main/images/helloworld.png" height="60">

Errors and Warnings:
```javascript
consofy.error("This is a error")

consofy.warn("This is a warn")

// in any method if the first argument is "disable color" the text color will be ignored
consofy.error("disable color","This is a error");
```

Result:

<img src="https://raw.githubusercontent.com/NaN-NaN-sempai/ConsoFy/refs/heads/main/images/error.png" height="100">

### Methods
Almost all the methods of the console were recreated in ConsoFy and the ones that weren't can be executed thru Consofy the same way as the javascript console. They may or may not work and if they don't you can simply use the javascript console as usual.

Some methods:

Table:
```javascript
consofy.table([{name: "John", age: 25}, {name: "Bob", age: 30}, {name: "Alice", age: 30}]);

consofy.table({name: "John", surname: "Doe"});

// in the table, if the first argument is "ignore object" the object will be hidden
consofy.table("ignore object", {name: "John", surname: "Doe"});
```

Result:

<img src="https://raw.githubusercontent.com/NaN-NaN-sempai/ConsoFy/refs/heads/main/images/tables.png" height="400">

Time:
```javascript
consofy.time();
setTimeout(() => {
    consofy.timeLog();
},500);
setTimeout(() => {
    consofy.timeEnd();
},1000);
```

<img src="https://raw.githubusercontent.com/NaN-NaN-sempai/ConsoFy/refs/heads/main/images/time.png" height="120">

Named Time:
```javascript
consofy.time("time");
setTimeout(() => {
    consofy.timeLog("time", "my time log");
},500);
setTimeout(() => {
    consofy.timeEnd("time");
},1000);
```


<img src="https://raw.githubusercontent.com/NaN-NaN-sempai/ConsoFy/refs/heads/main/images/namedTime.png" height="100">


You can check more methods runnig test command `consofyTest` and compare with the javascript console `consofyTest -- console`.

### Custom Methods
ConsoFy also has some custom methods:

```javascript
consofy.log("Blank line ↓");
consofy.blank();
consofy.log("Blank line↑");


consofy.success("Success message!");
```
<img src="https://raw.githubusercontent.com/NaN-NaN-sempai/ConsoFy/refs/heads/main/images/custom.png" height="120">


Use `typeCustom` to execute one method with a different style:
```javascript
consofy.typeCustom('log', 'error', 'This message is not an error');

consofy.typeCustom('warn', 'info', 'Remender: This message is a warning');
```
<img src="https://raw.githubusercontent.com/NaN-NaN-sempai/ConsoFy/refs/heads/main/images/custom2.png" height="90">

These are the supported styles:
```javascript
["success", "log", "error", "warn", "info", "debug", "time"]
```



## Credits
I created this tool while organizing a project that i was working on.


To make this `README` i used as reference [Axio's `README`](https://www.npmjs.com/package/axios).





[Go back to top ↑](#consofyyour-console-clean-and-stylish)
