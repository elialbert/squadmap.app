import ExposureRisk from './team/ExposureRisk.js';
import Manipulate from './team/Manipulate.js';
const weightEvent = new Event('updateWeights');

const prepCurrentData = function(currentData) {
  let resp = {};
  currentData.forEach(function(el) {
    resp[el.data().id] = el;
  });
  return resp
};

const updateCurrentData = function(el, incoming) {
  el.data(incoming);
};

const makeNewNode = function(incoming) {
  cy.add({
    group: 'nodes',
    data: incoming,
    position: {
      x: 100, y: 100
    }
  });
}

const setWatchers = function() {
  let ref = firebase.database().ref('maps/' + window.user.uid);

  return ref.on('value', function(snapshot) {
    const data = snapshot.val();
    cy.data('weights', data.weights);
    document.dispatchEvent(weightEvent);

    const currentNodes = prepCurrentData(cy.nodes());
    const currentEdges = prepCurrentData(cy.edges());

    // console.log('doing refresh', currentNodes, data)
    Object.keys(data.nodes).forEach(function(nodeId) {
      const currentEl = currentNodes[nodeId];
      if (currentEl) {
        currentEl.touched = true;
        updateCurrentData(currentEl, data.nodes[nodeId]);
      } else {
        makeNewNode(data.nodes[nodeId]);
      }
    });

    Object.keys(currentNodes).forEach(function(elId) {
      const el = data.nodes[elId];
      if (!el) {
        cy.remove(currentNodes[elId]);
      }
    });

    Object.keys(data.edges).forEach(function(edgeId) {
      const currentEdge = currentEdges[edgeId];
      if (currentEdge) {
        currentEdge.touched = true;
        updateCurrentData(currentEdge, data.edges[edgeId]);
      } else {
        cy.add({
          group: 'edges',
          data: data.edges[edgeId]
        });
      }
    });

    Object.keys(currentEdges).forEach(function(elId) {
      const el = data.edges[elId];
      if (!el) {
        cy.remove(currentEdges[elId]);
      }
    });

    Manipulate.refreshLayout();
    ExposureRisk.run();
  });
};

export default {
  setWatchers: setWatchers
}