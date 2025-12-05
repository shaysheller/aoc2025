const { parse, c } = require('../functions.js');
const fs = require('fs');

let sample = parse('./sample.txt')
  .split(`\n`)
  .map((a) => a.split(''));

let txt = parse('./text.txt')
  .split('\n')
  .map((a) => a.split(''));

const check = (a, col, row) => {
  if (a[col][row] !== '@') return false;

  let count = 0;
  for (let i = -1; i <= 1; i++) {
    let dc = col + i;
    if (dc < 0 || dc >= a.length) continue;

    for (let j = -1; j <= 1; j++) {
      let dr = row + j;

      if (dr < 0 || dr >= a[0].length || (dr === row && dc === col)) continue;

      if (a[dc][dr] === '@') {
        count++;
      }
    }
    if (count >= 4) return false;
  }
  return true;
};

const func = (a) => {
  let result = 0;

  while (true) {
    const cache = [];

    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < a[i].length; j++) {
        if (check(a, i, j)) {
          cache.push([i, j]);
        }
      }
    }
    result += cache.length;

    if (!cache.length) {
      return result;
    }

    for (let i = 0; i < cache.length; i++) {
      let [col, row] = cache[i];
      a[col][row] = '.';
    }
  }
};

console.log('sample', func(sample));
console.log('text', func(txt));

/*
  how to check -> 
    -1 0 +1 col
    -1 0 +1 row 


  part 2 -> 
    remove the forklifts after each loop then run the loop again until we are done. 

*/
