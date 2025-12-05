const { parse, c } = require('../functions.js');
const fs = require('fs');

let sample = parse('./sample.txt').split(`\n`);

let txt = parse('./text.txt').split('\n');

const func = (a) => {
  let result = 0;

  return result;
};

console.log('sample:', func(sample));
console.log('text:', func(txt));
