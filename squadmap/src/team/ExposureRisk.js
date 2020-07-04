import Constants from './Constants.js';

const run = function() {
  cy.nodes().forEach(function(node){
    let riskFactor = node.data().riskFactor;
    if (riskFactor) {
      node.classes([Constants.riskFactorClasses[riskFactor]]);
    }
  });

  cy.edges().forEach(function(edge) {
    let connectionType = edge.data().connectionType;
    if (connectionType) {
      edge.classes([Constants.connectionTypeClasses[connectionType]]);
    }
  })
};

export default {run: run};