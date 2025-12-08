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

const funcb = (a) => {
  let result = 0;

  for (let i = 0; i < a.length; i++) {
    let elem = a[i]; // [ '123', ' 45', '  6', '*' ],
    let length = elem[0].length;
    let sign = elem[elem.length - 1];
    let curr = sign === '*' ? 1 : 0;

    for (let j = length - 1; j >= 0; j--) {
      // how many times we're
      let track = '';
      for (let k = 0; k <= elem[k].length + 1; k++) {
        if (elem[k][j] !== ' ') {
          track += elem[k][j];
        }
      }

      if (sign === '*') {
        curr *= Number(track);
      } else {
        curr += Number(track);
      }
    }
    result += curr;
  }

  return result;
};

console.log('sample', funcb(psample));
console.log('txt', funcb(ptxt));

/*
  what needs to be done :

    we need to do the following array[0] times
    we have a number with n digits. we can get that number by getting array[col][0];

    when we are iterating through the number we need to check every row
      array[0][j] j < array[0].length - 1; 
    11156388595076
    11159825706149
    


*/
