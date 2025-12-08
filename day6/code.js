const { parse, c } = require('../functions.js');
const fs = require('fs');
const { string } = require('mathjs');

const sample = parse('./sample.txt').split(`\n`);

/*
  plan: we have it split into 4 or 5 indicies right now,
  i'm thinking we can go string by string and push each 'problem' into a single index
  of a new array and then do the operation on that.

*/

const p = (a) => {
  const r = [];

  let index = 0;
  const substr = a[a.length - 1].split('');

  while (substr.length) {
    index = 0;
    let sign = substr[0];

    substr.shift();
    while (substr[0] === ' ') {
      index++;
      substr.shift();
    }
    if (substr.length === 0) {
      index++;
    }

    const curr = [];

    for (let i = 0; i < a.length - 1; i++) {
      let elem = a[i];
      a[i] = a[i].slice(index + 1);
      curr.push(elem.slice(0, index));
    }
    curr.push(sign);
    r.push(curr);
  }
  return r;
};

const txt = parse('./text.txt').split('\n');

let psample = p(sample);
let ptxt = p(txt);
console.log(psample);

const func = (a) => {
  let result = 0;

  for (let i = 0; i < a.length; i++) {
    let elem = a[i];
    let sign = elem[elem.length - 1];
    let curr = 0;

    if (sign === '*') {
      curr = 1;
    }

    let num = '';

    for (let j = 0; j < elem[0].length; j++) {
      let currIndex = 0;

      while (currIndex < elem.length - 1) {
        if (elem[j][currIndex] !== ' ') {
          console.log('adding this num', elem[j][currIndex]);
          num += elem[j][currIndex];
        }
        currIndex++;
      }
      if (sign === '*') {
        curr *= Number(num);
      } else {
        curr += Number(num);
      }
      // console.log('num', num);
      result += curr;
    }
  }

  return result;
};

console.log('sample', func(psample));
// console.log('txt', func(txt));
