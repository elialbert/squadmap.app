import Constants from './Constants.js';

const nodekey = function(n) {
  return n.data().id;
};

const nodeskey = function(n1, n2) { 
  return [n1.data().id, n2.data().id].sort().join(' - ');
}

const reversePath = function(path) {
  let t = [];
  path.forEach(function(x) { t.push(x) });
  return t.reverse();
}

const rollup = function(n1, path) {
  let prob = 0;
  let checked = [];
  let lastNodeRisk = null;
  const reversed = reversePath(path);
  reversed.forEach(function(el) {
    const eld = el.data()
    if (eld.riskFactor) {
      lastNodeRisk = Constants.riskWeights[eld.riskFactor];
      checked.push(eld.id);
    } else if (eld.connectionType) {
      // console.log(prob, lastNodeRisk, Constants.connectionWeights[eld.connectionType],prob + (
      //   lastNodeRisk *
      //   Constants.connectionWeights[eld.connectionType]
      // ))
      prob = prob + (
        lastNodeRisk *
        Constants.connectionWeights[eld.connectionType]
      );
    }
  });
  return {checked: checked, prob: prob}
}

const alg = function(n1) {
  console.log('alg for : ', n1.data())
  let prob = 0;
  let d = cy.elements().dijkstra(n1);
  let data = [];
  cy.nodes().difference(n1).forEach(function(n2) { 
    data.push({n1: n1, n2: n2, distance: d.distanceTo(n2), path: d.pathTo(n2)});
  });
  data = data.sort(function(a,b) { return a.distance - b.distance  }).reverse();
  console.log('algdata', data)
  let checked = [];
  data.forEach(function(pathInfo) {
    let n2Data = pathInfo.n2.data();
    let roll = rollup(n1, pathInfo.path);
    console.log('r', n2Data, roll);
    if (checked.indexOf(n2Data.id) < 0) {
      console.log('not checked', n2Data)
      prob += roll.prob;
      checked = checked.concat(roll.checked);
    } else { console.log('checked', n2Data)}
    
  });
  console.log('prob!', prob)
  return prob 
}

const mapToExposure = function(p) {
  if (p > 0 && p <= 0.2) {
    return 1;
  }
  if (p > 0.2 && p <= 0.4) {
    return 2;
  }
  if (p > 0.4 && p <= 0.6) {
    return 3;
  }
  if (p > 0.6 && p <= 0.8) {
    return 4;
  }
  if (p > 0.8 && p <= 1) {
    return 5;
  }
}

const exposureClass = function(num) {
  return `exposure-risk-${mapToExposure(num)}`;
}

const run = function() {
  cy.nodes().forEach(function(node) {
    let riskFactor = node.data().riskFactor;
    if (riskFactor) {
      riskFactor = Constants.riskFactorClasses[riskFactor]
    } else { riskFactor = ''; }
    const expc = exposureClass(alg(node)) || '';
    console.log(expc)
    node.classes([riskFactor, expc]);
  });

  cy.edges().forEach(function(edge) {
    let connectionType = edge.data().connectionType;
    if (connectionType) {
      edge.classes([Constants.connectionTypeClasses[connectionType]]);
    }
  });
};

export default {run: run};