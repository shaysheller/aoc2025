// import * as fs from 'fs';
const fs = require('fs');
const parse = (txt) => {
  const out = fs.readFileSync(txt, 'utf-8');
  return out;
};

const c = (label, string) => {
  if (string !== undefined) console.log(label, string);
  else console.log(label);
};

module.exports = { parse, c };
