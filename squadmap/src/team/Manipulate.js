import ExposureRisk from './ExposureRisk.js';
import database from '../database.js'

const setLastNode = function(node) {
  window.cy.data('lastNode', node.data().id);
}

const removeNode = function(node) {
  window.cy.remove(node);
  setLastNode(window.cy.nodes()[0]);
  save();
};

const getNeighbors = function(node) {
  return node.neighborhood().filter(function(x) { return x.data().label; });
};

const getNonNeighbors = function(node) {
  const neighbors = getNeighbors(node);
  return window.cy.nodes().difference(neighbors.union(node));
};

const connectTo = function(node, connectTo) {
  setLastNode(connectTo);
  window.cy.add({
    group: 'edges',
    data: { source: node.data().id, target: connectTo.data().id,
      connectionType: 'Close as can be' }
  });
  save();
};

const edgeBetween = function(node1, node2) {
  return window.cy.collection(node1).edgesWith(window.cy.collection(node2))[0];
};

const disconnectFrom = function(node, disconnectFrom) {
  setLastNode(node);
  window.cy.remove(edgeBetween(node, disconnectFrom));
  console.log('removing')
  save();
};

const disconnect = function(edge) {
  window.cy.remove(edge);
  save();
}

const refreshLayout = function() {
  let els = window.cy.elements();
  els.makeLayout({
    name: 'cola',
    fit: true,
    padding: 1,
    edgeLength: 98
  }).run();
}

const newNode = function() {
  let res = window.cy.add({
    group: 'nodes',
    data: {
      label: 'New'
    },
    position: {
      x: 100, y: 100
    }
  });
  connectTo(window.cy.nodes().filter(function(n) { return n.data().id == window.cy.data().lastNode })[0], res);
  refreshLayout();
  return res;
};

const save = function() {
  ExposureRisk.run();
  database.save();
};

const saveData = function(obj, key, value) {
  obj.data(key, value);
  save();
};

const isInReadOnlyMode = function(sharedMaps, currentMap) {
  return (sharedMaps && currentMap && (sharedMaps[currentMap] ||{}).read && !(sharedMaps[currentMap] ||{}).write);
}
const setReadOnly = function(sharedMaps, currentMap) {
  if (isInReadOnlyMode(sharedMaps, currentMap)) {
    window.cy.data('readOnly', true);
  } else {
    window.cy.data('readOnly', false);
  }
}

export default { removeNode, getNeighbors, getNonNeighbors, connectTo,
  disconnectFrom, disconnect, edgeBetween, newNode, refreshLayout,
  setLastNode, saveData, save, setReadOnly, isInReadOnlyMode }
