const { parse, c } = require('../functions.js');
const fs = require('fs');
const { map } = require('mathjs');

let sample = parse('./sample.txt').split(`\n`);

let txt = parse('./text.txt').split('\n');

console.log(sample);

let curr = 50;
let count = 0;

const func = (a) => {
  for (let i = 0; i < a.length; i++) {
    let c = a[i];
    let dir = c.slice(0, 1) === 'L' ? 0 : 1;
    let number = Number(c.slice(1));

    if (dir === 0) {
      console.log('C', c);
      while (curr < number) {
        number = number - curr;
        curr = 100;
        count++;
        console.log('count updated', count);
      }
      if (number > 0) {
        curr = curr - number;
        if (curr === 0) {
          count++;
          console.log('count updated', count);
        }
      }
    } else {
      while (number + curr >= 100) {
        number = number - (100 - curr);
        curr = 0;
        count++;
        console.log('count updated', count);
      }
      if (number > 0) {
        curr = curr + number;
        if (curr === 100) {
          count++;
          console.log('count updated', count);
        }
      }
    }
  }
  return count;
};

const funcb = (a) => {
  for (let i = 0; i < a.length; i++) {
    let c = a[i];
    let dir = c.slice(0, 1) === 'L' ? 0 : 1;
    let number = Number(c.slice(1));

    count = count + Math.floor(number / 100);

    number = number % 100;

    if (number > 0) {
      if (dir === 0) {
        if (curr - number <= 0) {
          if (curr !== 0) {
            count++;
          }

          curr = 100 - (number - curr);
        } else {
          curr = curr - number;
        }
      } else {
        if (curr + number >= 100) {
          if (curr !== 100) {
            count++;
          }

          curr = (curr + number) % 100;
        } else {
          curr = curr + number;
        }
      }
      console.log(c);
    }
    curr = curr % 100;
  }
  return count;
};

// console.log('sample', funcb(sample));
curr = 50;
count = 0;
console.log('txt', funcb(txt));
