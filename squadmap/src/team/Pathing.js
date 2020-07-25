import * as _ from 'lodash';

import Manipulate from './Manipulate.js'
const DEPTH = 10;
const NUMEACH = 20;

const verbose = false;

const log = function(...args) {
  if (verbose) {
    console.log(args.join(' - '));
  }
}

const included = function(pathAttempt, results) {
  let found = false;
  const ids = _.map(pathAttempt, function(x) { return x.id(); })
  results.forEach(function(result) {
    const compare = _.map(result, function(x) { return x.id(); })
    if (_.isEqual(compare,ids)) {
      found = true;
    }
  });
  return found;
}

const smkey = function(neighbors) {
  return _.map(neighbors, function(x) { return x.id}).join('-')
}

const newNextNeighbor = function(searchMemo, neighbors) {
  let key = smkey(neighbors)
  let leftover;
  let res = searchMemo[key];
  if (res) {
    leftover = neighbors.difference(cy.collection().add(res));
  } else {
    leftover = neighbors;
    res = [];
  }
  let picked = leftover[Math.floor(Math.random()*leftover.length)];
  searchMemo[key] = _.concat(res, picked);
  return picked;
}

const pathBetween = function(n1, n2, path, d, searchMemo, neighborMemo) {
  // return any path between two nodes,
  // that does not repeat an element
  // and is not already in the path list,
  // and has a max length of DEPTH
  let aneighbors;
  if (neighborMemo[n1.id()]) {
    aneighbors = neighborMemo[n1.id()]
  } else {
    aneighbors = Manipulate.getNeighbors(n1)
    neighborMemo[n1.id()] = aneighbors;
  }
  // log('nei', aneighbors, path)
  const neighbors = aneighbors.difference(cy.collection().add(path))
  log('man',n1.data().label, 'neighb', _.map(neighbors, function(x) { return x.data().label}))
  if (!neighbors.length) { return; }

  const nextNeighbor = newNextNeighbor(searchMemo, neighbors);

  if (!nextNeighbor) { console.log('ah ewell'); return; }
  //const nextNeighbor = neighbors[Math.floor(Math.random()*neighbors.length)]

  log('nn', nextNeighbor.data().label, _.map(path, function(x) { return x.data().label}))
  if (nextNeighbor.id() == n2.id()) {
    log('found end')
    path.push(nextNeighbor);
    return path;
  } else if (_.indexOf(path, nextNeighbor) == -1) {
    log('pushing ', nextNeighbor.data().label)
    path.push(nextNeighbor);
    return pathBetween(nextNeighbor, n2, path, d + 1, searchMemo, neighborMemo)
  } else if (d >= DEPTH) {
    return;
  } else {
    log('falling through on ', nextNeighbor.data().label)
  }
}

// get a list of paths from n1 to all other nodes using pathBetween
const findPaths = function(n1) {
  log('running findpaths', n1.data().label)
  let result = [];
  let neighborMemo = {};
  cy.nodes().difference(n1).forEach(function(n2) {
    log('^^^^^^^^^^^^^^^^^^^^^^^^^^^^searching for ', n2.data().label)
    let n2Result = [];
    let attempts = 0;
    while((n2Result.length < NUMEACH) && (attempts < NUMEACH)) {
      let searchMemo = {};
      attempts += 1;
      log('st pathbetween', n1.data().label, n2.data().label)
      let pathAttempt = pathBetween(n1, n2, [n1], 0, searchMemo, neighborMemo);
      log('******************************got ', _.map(pathAttempt, function(x) { return x.data().label}))
      if (pathAttempt && pathAttempt.length && !included(pathAttempt, n2Result)) {
        n2Result.push(pathAttempt);
      }
    }
    result = _.concat(result, n2Result);
    log('n1.', n2.data().label)
    log(
      _.map(n2Result, function(x) { return _.map(x, function(y) { return y.data().label})})

    )
  });
  return result;
}

// find every (max numEach) nonrepeating path
// from node to every other node with a max depth of (depth)
const run = function(node) {
  return findPaths(node);
}

export default {
  run: run
}