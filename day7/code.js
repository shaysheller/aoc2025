const { parse, c } = require('../functions.js');
const fs = require('fs');

const sample = parse('./sample.txt').split(`\n`);
const txt = parse('./txt.txt').split(`\n`);

const func = (a) => {
  let result = 0;
  const visited = new Map();

  const dfs = (row, col) => {
    if (row >= a.length) {
      return 1;
    }
    if (visited.has(`${row},${col}`)) {
      return visited.get(`${row},${col}`);
    }

    if (a[row][col] === '^') {
      let left = dfs(row + 1, col - 1);
      let right = dfs(row + 1, col + 1);
      visited.set(`${row},${col}`, left + right);
    } else {
      let incr = dfs(row + 1, col);
      visited.set(`${row},${col}`, incr);
    }
    return visited.get(`${row},${col}`);
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


  part 2 this seems like dp 

    When you hit a square you've been to before you can know how many paths to this point 
    extend from that path. If you know for example htat hitting one ^ will give you 5 more
    endings no matter what you acn just increment result by the number of endings that we know


  
  
  how to actually do part 2:

    dp problem. at each coordinate save how many answers will branch from that path

    if you ever hit the same coord just auto incr the reuslt since there's no reason to
    compute further








*/
