const { parse, c } = require('../functions.js');
const fs = require('fs');

const sample = parse('./sample.txt').split(`\n`);
const txt = parse('./txt.txt').split(`\n`);

const func = (a) => {
  let result = 0;
  const visited = new Map();

  const dfs = (row, col) => {
    if (col >= a[0].length || row >= a.length || visited.has(`${row},${col}`)) {
      return 0;
    }
    visited.set(`${row},${col}`);

    if (a[row][col] === '^') {
      let left = dfs(row + 1, col - 1);
      let right = dfs(row + 1, col + 1);
      return 1 + left + right;
    } else {
      return dfs(row + 1, col);
    }
  };

  result = dfs(0, a[0].indexOf('S'));

  return result;
};

console.log('sample', func(sample));
console.log('txt', func(txt));

/*
  plan: 
    dfs honeslty seems easier 

    follow one beam all the way down, and keep a cache of the coordinates of where we've already been 
    and short circuit if we're at a duplicate






*/
