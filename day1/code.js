const { parse, c } = require('../functions.js');
const fs = require('fs');
const { map } = require('mathjs');

let sample = parse('./sample.txt').split(`\n`);

let txt = parse('./text.txt', `\n`);

console.log(sample);

let curr = 50;

const func = (a) => {
  for (let i = 0; i < a.length; i++) {
    let c = a[i];
    let dir = c.slice(0, 1) === 'L' ? 0 : 1;
    let number = Number(c.slice(1));
    console.log(dir, number);
  }
};

func(sample);
