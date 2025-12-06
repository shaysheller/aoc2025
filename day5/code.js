const { parse, c } = require('../functions.js');
const fs = require('fs');

const sample = parse('./sample.txt').split(`\n\n`);

const txt = parse('./text.txt').split('\n\n');

const merge = (a) => {
  const result = [];

  result.push(a[0]);

  let index = 1;

  while (index < a.length) {
    let prev = result.at(-1)[1];
    let curr = a[index];

    if (curr[0] > prev) {
      result.push(curr);
    } else {
      result[result.length - 1][1] = Math.max(curr[1], result.at(-1)[1]);
    }
    index++;
  }
  // console.log('merged', result);

  return result;
};

const check = (intervals, numbers) => {
  let result = 0;
  // console.log(intervals, numbers);

  for (let i = 0; i < numbers.length; i++) {
    let a = numbers[i];

    for (let j = 0; j < intervals.length; j++) {
      let [min, max] = intervals[j];
      // console.log(min, max);

      if (a >= min && a <= max) {
        result++;
        break;
      }
      if (a < min) {
        break;
      }
    }
  }

  return result;
};

const func = (a) => {
  const aInterval = a[0].split('\n').map((elem) => {
    return [
      Number(elem.slice(0, elem.indexOf('-'))),
      Number(elem.slice(elem.indexOf('-') + 1)),
    ];
  });
  const aCheck = a[1].split('\n').map((elem) => Number(elem));
  aInterval.sort((a, b) => a[0] - b[0]);

  const merged = merge(aInterval);

  let result = 0;

  result += check(merged, aCheck);

  return result;
};

console.log('sample:', func(sample));
console.log('text:', func(txt));

/*
  plan: 
    sort inputs by first number
    merge common inputs
    store in data structure
    scan through to see how many fit

*/
