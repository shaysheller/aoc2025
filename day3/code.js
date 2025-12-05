const { parse, c } = require('../functions.js');
const fs = require('fs');
const { ResultSetDependencies } = require('mathjs');

let sample = parse('./sample.txt').split(`\n`);

let txt = parse('./text.txt').split('\n');

const func = (a) => {
  let result = 0;

  for (let i = 0; i < a.length; i++) {
    const r = [];
    let buffer = 12;
    let start = 0;
    let curr = start;

    while (buffer >= 0) {
      if (r.length === 12) break;
      r.push(0);
      curr = start;
      while (curr <= a[i].length - buffer) {
        if (Number(a[i][curr]) > r[r.length - 1]) {
          r[r.length - 1] = Number(a[i][curr]);
          start = curr + 1;
        }
        curr++;
      }
      buffer = buffer - 1;
    }
    let sum = r.reduce((a, b) => a.toString() + b.toString(), '');
    result += Number(sum);
  }
  return result;
};

/*
  if bigger = 0 -> Math.max bigger and number
  if curr > bigger -> big = bigger bigger = curr;
  otherwise big = math.max big, curr

*/

// console.log('sample', func(sample));
console.log('text', func(txt));

/*
  can't be rearranged - if you find a number for bigger that is bigger than bigger you always swap unless it's the last number
  when you swap bigger you reset big to 0's because you must find the next digit 

  part 2 thoughts : 

  pick the biggest number for first number - mustt be 11 numbers remaining afterwards
  biggest number for second number - must be 10 numbers remaining afterwards, tie goes to earlier number
    only should scan between first chosen number and 10 remaining 
3121910778619
3121910778619
*/
