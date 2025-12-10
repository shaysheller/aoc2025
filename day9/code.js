const { parse, c } = require('../functions.js');
const fs = require('fs');

const sample = parse('./sample.txt')
  .split('\n')
  .map((a) => a.split(',').map(Number));
console.log(sample);
const txt = parse('./txt.txt')
  .split('\n')
  .map((a) => a.split(',').map(Number));

const plot = (a) => {
  const result = [];

  return result;
};

const func = (a) => {
  let result = 0;

  for (let i = 0; i < a.length; i++) {
    let [x, y] = a[i];
    for (let j = 0; j < a.length; j++) {
      if (j === i) continue;
      let [d, f] = a[j];

      result = Math.max((Math.abs(x - d) + 1) * (Math.abs(y - f) + 1), result);
    }
  }

  return result;
};

console.log('sample', func(sample));
console.log('txt', func(txt));
