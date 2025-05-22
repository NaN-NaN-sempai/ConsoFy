#!/usr/bin/env node
import fs from "fs";

import generateConsofy from "./index.js";
const consofy = generateConsofy("consofy");

consofy.log('Starting...');

consofy.warn('Reading "index.js"...');

let mjs = fs.readFileSync("./index.js", "utf-8");

mjs.split("/* slice-to-generate-cjs */")

let cjs = `// AUTO GENERATED IN "generateCjs.js" 
const kleur = require('kleur');
${mjs.split("/* slice-to-generate-cjs */")[1]}
module.exports = generateConsofy;`;

consofy.warn('Writing "index.cjs"...');

fs.writeFileSync("index.cjs", cjs);

consofy.success('"index.cjs" generated successfully!');