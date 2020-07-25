import * as _ from 'lodash';

import Constants from './Constants.js';
import Pathing from './Pathing.js'

const verbose = true;

const log = function(...args) {
  if (verbose) {
    console.log(args.join(' - '));
  }
}

const edgeBetween = function(node1, node2) {
  return cy.collection(node1).edgesWith(cy.collection(node2))[0];
};

const mapToExposure = function(p) {
  if (p > 0 && p <= 0.1) {
    return 1;
  }
  if (p > 0.1 && p <= 0.2) {
    return 2;
  }
  if (p > 0.2 && p <= 0.4) {
    return 3;
  }
  if (p > 0.4 && p <= 0.6) {
    return 4;
  }
  if (p > 0.6) {
    return 5;
  }
}

const exposureClass = function(num) {
  return `exposure-risk-${num}`;
}

const riskClassLookupByWeight = function(weights) {
  let a = {};
  Object.entries(weights.riskWeights).forEach(function(x) {
    a[x[1]] = x[0];
  });
  return a;
}

const reversePath = function(path) {
  // let t = [];
  // path.forEach(function(x) { t.push(x) });
  // return t.reverse();
  return path.reverse();
}

const adjustedRiskWeight = function(weights, elData) {
  const riskWeight = weights.riskWeights[elData.riskFactor];
  const activityModifier = weights.activityModifier[elData.activity] || 0;
  log('adjrisk: ', riskWeight + activityModifier)
  return riskWeight + activityModifier;
}

const rollup = function(n1, path, weights, checked) {
  let prob = 0;
  // let checked = [];
  let lastNodeRisk = null;
  // const reversed = reversePath(path);
  let previous = n1;
  path.forEach(function(el) {
    const eld = el.data()
    const edge = edgeBetween(previous, el);
    //console.log('edge is ', edge, previous, el)


    // if (eld.riskFactor) {
      log('rollup got to node ', eld.label)
      lastNodeRisk = (prob + adjustedRiskWeight(weights, eld));
      // checked.push(eld.id);
    //} else if (eld.connectionType) {
    if (edge) {
      const edgeD = edge.data()
      // log('checked', checked.indexOf(edgeD.id))
      if (checked.indexOf(edgeD.id) < 0) {
        log(`internal: prob: ${prob}, adj: ${lastNodeRisk}, conn: ${weights.connectionWeights[edgeD.connectionType]}, res: ${(
          lastNodeRisk *
          weights.connectionWeights[edgeD.connectionType]
        )}`)
        prob = (
          lastNodeRisk *
          weights.connectionWeights[edgeD.connectionType]
        );
        checked.push(edgeD.id);
      } else {
        // console.log('checked already for ', edgeD.id)
      }
    }
    previous = el;
  });
  return {checked: checked, prob: prob}
}

const alg = function(n1, weights) {
  log('****************alg for : ', n1.data().label)
  let prob = adjustedRiskWeight(weights, n1.data());

  //let d = cy.elements().dijkstra(n1);
  let data = Pathing.run(n1);
  // cy.nodes().difference(n1).forEach(function(n2) {
  //   data.push({n1: n1, n2: n2, distance: d.distanceTo(n2), path: d.pathTo(n2)});
  // });
  // data = data.sort(function(a,b) { return a.distance - b.distance  }).reverse();
  let checked = [];

  data.forEach(function(pathInfo) {
    let n2Data = _.last(pathInfo).data();
    log('rolling up ', n2Data.label)
    let roll = rollup(n1, pathInfo, weights, checked);
    log('ROLLUP RESULT ', n2Data.label, roll.prob);
    //if (checked.indexOf(n2Data.id) < 0) {
      prob += roll.prob;
      log('total new prob now', prob)
      //checked = checked.concat(roll.checked);
    //} else { log('checked, skipping', n2Data.label)}

  });
  log('prob!', prob)
  return prob
}

const runNodes = function() {

  const weights = cy.data('weights');
  const showLabels = parseInt(localStorage.getItem('showLabels') || 0);

  cy.nodes().forEach(function(node) {
    let riskFactor = node.data().riskFactor;
    if (riskFactor) {
      riskFactor = Constants.riskFactorClasses[riskFactor]
    } else { riskFactor = ''; }
    const probResult = alg(node, weights);

    if (showLabels) {
      node.classes(['node-number-label']);
      node.data('probResult', `${node.data('label')}: ${probResult.toFixed(2)}`);
    } else {
      node.exposureClassNum = mapToExposure(probResult);
      const expc = exposureClass(node.exposureClassNum) || '';
      node.classes([riskFactor, expc]);
    }
    log('end: ', node.data().label, node.classes())
  });
}

const runEdges = function() {
  const showLabels = parseInt(localStorage.getItem('showLabels') || 0);
  const weights = cy.data('weights');

  const sortedRisks = Object.entries(weights.riskWeights).sort(function(a,b) { return a[1] - b[1] });
  const riskLookup = riskClassLookupByWeight(weights);
  cy.edges().forEach(function(edge) {
    let connectionType = edge.data().connectionType;
    let classesToAdd = [];
    if (connectionType) {
      const connectionTypeClass = Constants.connectionTypeClasses[connectionType];
      classesToAdd.push(connectionTypeClass)
    }
    const sourceClass = edge.source().exposureClassNum;
    const targetClass = edge.target().exposureClassNum;
    if (sourceClass && targetClass) {
      classesToAdd.push(`er-${sourceClass}-${targetClass}`)
    }
    edge.classes(classesToAdd);
    log(edge.source().data().label, ' - ', edge.target().data().label, edge.classes())
  });
}

const run = function() {
  runNodes();
  runEdges();
};

export default {run: run};