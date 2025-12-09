const { parse, c } = require('../functions.js');
const fs = require('fs');
const { map } = require('mathjs');

const sample = parse('./sample.txt')
  .split(`\n`)
  .map((a) => a.split(',').map((b) => Number(b)));
const txt = parse('./txt.txt')
  .split(`\n`)
  .map((a) => a.split(',').map((b) => Number(b)));

console.log('sample', sample);

const distance = (a, b) => {
  let d = Math.sqrt(
    (a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2
  );
  return d;
};

const distanceArray = (a) => {
  const result = [];
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length; j++) {
      if (j === i) continue;
      result.push([distance(a[i], a[j]), i, j]);
    }
  }
  return result;
};
const sampleDistances = distanceArray(sample)
  .sort((a, b) => a[0] - b[0])
  .map((a) => [a[1], a[2]]);

console.log('sampledistances', sampleDistances.slice(0, 40));

// const txtDistances = distanceArray(txt).sort((a, b) => b[0] - a[0]);

const func = (a, top) => {
  let result = 1;
  const map = new Map(); // num, size
  let clusters = 0;

  const visited = new Map(); // node, what maps it's part of
  let i = 0;
  while (i < top) {
    let [first, second] = a[i];
    if (!visited.has(first) && !visited.has(second)) {
      visited.set(first, clusters);
      visited.set(second, clusters);

      map.set(clusters, new Set().add(first).add(second));
      clusters++;
    } else if (visited.has(first)) {
      const currCluster = map.get(visited.get(first));
      currCluster.add(second);
    } else if (visited.has(second)) {
      const currCluster = map.get(visited.get(second));
      currCluster.add(first);
    } else if (visited.has(first) && visited.has(second)) {
      continue;
    }
    i++;
  }
  console.log('final map', map);

  const allClusters = [];

  map.forEach((a) => {
    allClusters.push(a.size);
  });
  allClusters.sort((a, b) => b - a);
  console.log('allclusters', allClusters);
  for (let i = 0; i < 3; i++) {
    if (allClusters[i]) {
      result *= allClusters[i];
    } else {
      break;
    }
  }
  console.log('all clusters');
  console.log(allClusters);

  return result;
};

console.log('sample', func(sampleDistances, 10));
console.log('should be:', 40);
// console.log('txt', func(txt));

/*
  in my bones I feel this is a graph problem. somehow i need to iterate through and find the nodes remaining that are closest to each other and then add
  those to an adj list 

  once we get the different adj lists we can multiply the counts together. 

  what do I get when I multiply the size of the largest 3 circuits
  map of circuits ? 

  do i actually need an adj list -> if we add a node anywhere we can just add it to what it's connected 
  to and count the size 

  ex. map with random indicies = push to an array if it's touchign something in there
  when we fill out the visited map we can just put which cluster it's a part of
  when we're done we can sort through the map and find the 3 biggest sizes and mult them together

  my hands are cold so i'm taking a break, but the next step we fuckedu p is that we need to map J to a circuit 
  at same time as I. it can still be closest to another node though so still need to check it. 
  the reason for this is because i and j will be connected no matter what so should add to cluster simultaneously




*/

// --- Helper for parsing input ---
function parseInput(input) {
  return input
    .trim()
    .split('\n')
    .map((line) => {
      const [x, y, z] = line.split(',').map(Number);
      return { x, y, z };
    });
}

// --- Helper for calculating Euclidean distance (squared to avoid Math.sqrt for sorting) ---
// Using squared distance is sufficient for sorting, as sqrt is monotonic.
function calculateDistanceSquared(p1, p2) {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  const dz = p1.z - p2.z;
  return dx * dx + dy * dy + dz * dz;
}

// --- Disjoint Set Union (DSU) implementation ---
class DSU {
  constructor(n) {
    this.parent = new Array(n);
    this.size = new Array(n);
    for (let i = 0; i < n; i++) {
      this.parent[i] = i;
      this.size[i] = 1;
    }
    this.numComponents = n; // Initially, each node is a component
  }

  // Find with path compression
  find(i) {
    if (this.parent[i] === i) {
      return i;
    }
    return (this.parent[i] = this.find(this.parent[i]));
  }

  // Union by size
  union(i, j) {
    let rootI = this.find(i);
    let rootJ = this.find(j);

    if (rootI !== rootJ) {
      if (this.size[rootI] < this.size[rootJ]) {
        [rootI, rootJ] = [rootJ, rootI]; // Swap to ensure rootI is the larger tree
      }
      this.parent[rootJ] = rootI;
      this.size[rootI] += this.size[rootJ];
      this.numComponents--; // Merged two components
      return true; // Union successful
    }
    return false; // Already in the same set
  }

  getComponentSizes() {
    const componentSizes = {};
    for (let i = 0; i < this.parent.length; i++) {
      const root = this.find(i);
      componentSizes[root] = this.size[root];
    }
    return Object.values(componentSizes);
  }
}

// --- Main solver function ---
function solve(input, connectionsToMake) {
  const points = parseInput(input);
  const n = points.length; // Number of junction boxes

  if (n === 0) return 0;
  if (n === 1) return 1; // Or handle as per problem specific output for single node

  // 1. Calculate all pairwise distances
  const distances = [];
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      distances.push({
        p1Index: i,
        p2Index: j,
        distSq: calculateDistanceSquared(points[i], points[j]),
      });
    }
  }

  // 2. Sort distances
  distances.sort((a, b) => a.distSq - b.distSq);

  // 3. Initialize DSU
  const dsu = new DSU(n);
  let connectionsMade = 0;

  // 4. Iterate through sorted distances and make connections
  for (const { p1Index, p2Index } of distances) {
    if (connectionsMade >= connectionsToMake) {
      break;
    }

    // Try to union the two points
    if (dsu.union(p1Index, p2Index)) {
      connectionsMade++;
    }
  }

  // 5. Get and sort component sizes
  const componentSizes = dsu.getComponentSizes();
  componentSizes.sort((a, b) => b - a); // Sort descending

  // 6. Multiply the sizes of the three largest circuits
  if (componentSizes.length < 3) {
    // Handle cases with fewer than 3 distinct circuits
    // The example multiplies 5, 4, and ONE of the 2's, implying distinct values aren't needed,
    // just the largest actual component sizes.
    // So if sizes are [5,4,2,2,1], it takes 5,4,2.
    // If sizes are [5,4], it takes 5*4*1 or 0 depending on problem definition.
    // Given the example, we should just multiply what's available or return 0/1.
    // The example result is 40. For [5,4,2,2,1], it takes 5,4,2. So we take the top 3 numerical values.

    // For cases where there are fewer than 3 components (e.g., [5,4]), take what's available.
    // Or if there's only 1 component, just use it (1*1*1 for default empty).
    let product = 1;
    for (let i = 0; i < Math.min(3, componentSizes.length); i++) {
      product *= componentSizes[i];
    }
    return product;
  } else {
    // Multiply the top 3 largest sizes
    return componentSizes[0] * componentSizes[1] * componentSizes[2];
  }
}

// --- Example Input ---
const exampleInput = `162,817,812
57,618,57
906,360,560
592,479,940
352,342,300
466,668,158
542,29,236
431,825,988
739,650,466
52,470,668
216,146,977
819,987,18
117,168,530
805,96,715
346,949,466
970,615,88
941,993,340
862,61,35
984,92,344
425,690,689`;

// --- Test with Example ---
const exampleResult = solve(exampleInput, 10);
console.log(`Example Result (10 connections): ${exampleResult}`); // Expected: 40

// --- Your Actual Puzzle Input (Placeholder) ---
const puzzleInput = `<!-- PASTE YOUR ACTUAL PUZZLE INPUT HERE -->`;

// --- Solve for Your Puzzle Input ---
// const finalResult = solve(puzzleInput, 1000);
// console.log(`Final Puzzle Answer (1000 connections): ${finalResult}`);
