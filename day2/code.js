const { parse, c } = require('../functions.js');
const fs = require('fs');
const { map } = require('mathjs');

let sample = parse('./sample.txt').split(`,`);

let txt = parse('./text.txt').split(',');

// console.log(sample);

const func = (a) => {
  let result = 0;
  const cache = new Map();

  for (let i = 0; i < a.length; i++) {
    let curr = a[i];
    let [left, right] = [
      curr.slice(0, curr.indexOf('-')),
      curr.slice(curr.indexOf('-') + 1),
    ];

    let L = Number(left);
    let R = Number(right);

    while (L <= R) {
      lString = L.toString();
      for (let i = 0; i < Math.floor(lString.length / 2); i++) {
        let subString = lString.slice(0, i + 1);
        if (lString.length % subString.length === 0) {
          if (
            lString.split(subString).length ===
            lString.length / subString.length + 1
          ) {
            result += L;
            break;
          }
        }
      }
      L++;
    }
  }

  return result;
};

console.log('result', func(sample));
console.log('result', func(txt));

/*

  part 2 plan: 

  check if the length and the substring length are mod 0 with each other if not just skip

  split the string into equal parts and check if it's the length it should be ? 
  if we split by the number we're currently on it will have + 1 length as the number repeated. if it doesn't have that length it doens't work
*/
