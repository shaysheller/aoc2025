const { parse, c } = require('../functions.js');
const fs = require('fs');

const sample = parse('./sample.txt').split(`\n`);
const txt = parse('./txt.txt').split(`\n`);

/*
  in my bones I feel this is a graph problem. somehow i need to iterate through and find the nodes remaining that are closest to each other and then add
  those to an adj list 

  once we get the different adj lists we can multiply the counts together. 


*/
