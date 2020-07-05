import Constants from '../src/team/Constants';
import cytoscape from 'cytoscape';

const makeCY = function(elements) {
  let weights = {riskWeights: Constants.riskWeights, connectionWeights: Constants.connectionWeights};
  
  window.cy = cytoscape({
    // container: document.getElementById('cy'),
    autounselectify: true,
    boxSelectionEnabled: false,
    style: Constants.nodeStyles,
    elements: elements,
  });
  window.cy.data('weights', weights);
}
export default {
  makeCY
}