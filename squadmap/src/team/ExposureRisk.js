import Constants from './Constants.js';
const verbose = false;

const log = function(...args) {
  if (verbose) {
    console.log(args.join(' - '));
  }
}

const adjustedRiskWeight = function(weights, elData) {
  const riskWeight = weights.riskWeights[elData.riskFactor];
  const activityModifier = weights.activityModifier[elData.activity] || 0;
  log('activity modifier', activityModifier, riskWeight, riskWeight + (activityModifier))
  return riskWeight + (activityModifier);
}

const reversePath = function(path) {
  let t = [];
  path.forEach(function(x) { t.push(x) });
  return t.reverse();
}

const rollup = function(n1, path, weights) {
  let prob = 0;
  let checked = [];
  let lastNodeRisk = null;
  const reversed = reversePath(path);
  reversed.forEach(function(el) {
    const eld = el.data()
    if (eld.riskFactor) {
      lastNodeRisk = (prob + adjustedRiskWeight(weights, eld));
      checked.push(eld.id);
    } else if (eld.connectionType) {
      log('internal: ',prob, lastNodeRisk, weights.connectionWeights[eld.connectionType],(
        lastNodeRisk *
        weights.connectionWeights[eld.connectionType]
      ))
      prob = (
        lastNodeRisk *
        weights.connectionWeights[eld.connectionType]
      );
    }
  });
  return {checked: checked, prob: prob}
}

const alg = function(n1, weights) {
  log('****************alg for : ', n1.data().label)
  let prob = adjustedRiskWeight(weights, n1.data());
  let d = cy.elements().dijkstra({
    root: n1,
    weight: function(edge) {
      return 1 - weights.connectionWeights[edge.data().connectionType] ;
    }
  });
  let data = [];
  cy.nodes().difference(n1).forEach(function(n2) {
    data.push({n1: n1, n2: n2, distance: d.distanceTo(n2), path: d.pathTo(n2)});
  });
  data = data.sort(function(a,b) { return a.distance - b.distance  }).reverse();
  let checked = [];
  data.forEach(function(pathInfo) {
    let n2Data = pathInfo.n2.data();
    let roll = rollup(n1, pathInfo.path, weights);
    log('r', n2Data.label, roll.prob);
    if (checked.indexOf(n2Data.id) < 0) {
      prob += roll.prob;
      log('not checked: new prob now', prob)
      checked = checked.concat(roll.checked);
    } else { log('checked, skipping', n2Data.label)}

  });
  log('prob!', prob)
  return prob
}

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
    log('n: ', node.data().label, node.classes())
  });
}

const runEdges = function() {
  const showLabels = parseInt(localStorage.getItem('showLabels') || 0);

  cy.edges().forEach(function(edge) {
    let connectionType = edge.data().connectionType;
    let classesToAdd = [];
    if (connectionType) {
      const connectionTypeClass = Constants.connectionTypeClasses[connectionType];
      classesToAdd.push(connectionTypeClass)
    }
    const sourceClass = edge.source().exposureClassNum;
    const targetClass = edge.target().exposureClassNum;
    if (sourceClass && targetClass && !showLabels) {
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