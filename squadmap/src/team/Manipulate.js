const setLastNode = function(node) {
  saveData(cy, 'lastNode', node.data().id)
}

const removeNode = function(node) {
  cy.remove(node);
  setLastNode(cy.nodes()[0]);
  save();
};

const getNeighbors = function(node) {
  return node.neighborhood().filter(function(x) { return x.data().label; });
};

const getNonNeighbors = function(node) {
  const neighbors = getNeighbors(node);
  return cy.nodes().difference(neighbors.union(node));
};

const connectTo = function(node, connectTo) {
  setLastNode(connectTo);
  cy.add({
    group: 'edges',
    data: { source: node.data().id, target: connectTo.data().id }
  });
  save();
};

const edgeBetween = function(node1, node2) {
  return cy.collection(node1).edgesWith(cy.collection(node2))[0];
};

const disconnectFrom = function(node, disconnectFrom) {
  setLastNode(node);
  cy.remove(edgeBetween(node, disconnectFrom));
  save();
};

const refreshLayout = function() {
  let els = cy.elements();
  els.makeLayout({
    name: 'cola',
    fit: true,
    padding: 1,
  }).run();
}

const newNode = function() {
  let res = cy.add({
    group: 'nodes',
    data: {
      label: 'New'
    },
    position: {
      x: 100, y: 100
    }
  });
  connectTo(cy.nodes().filter(function(n) { return n.data().id == cy.data().lastNode })[0], res);
  refreshLayout();
  return res;
};

const save = function() {
  window.localStorage.setItem('cyjson', JSON.stringify(cy.json()));
}

const saveData = function(obj, key, value) {
  obj.data(key, value);
  save();
};

export default { removeNode, getNeighbors, getNonNeighbors, connectTo,
  disconnectFrom, edgeBetween, newNode, refreshLayout, setLastNode, saveData }