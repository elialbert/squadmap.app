const removeNode = function(node) {
  cy.remove(node);
};

const getNeighbors = function(node) {
  return node.neighborhood().filter(function(x) { return x.data().label; });
};

const getNonNeighbors = function(node) {
  const neighbors = getNeighbors(node);
  return cy.nodes().difference(neighbors.union(node));
};

const connectTo = function(node, connectTo) {
  cy.add({
    group: 'edges',
    data: { source: node.data().id, target: connectTo.data().id }
  })
};

const disconnectFrom = function(node, disconnectFrom) {
  cy.remove(cy.collection(node).edgesWith(cy.collection(disconnectFrom)))
};

export default { removeNode, getNeighbors, getNonNeighbors, connectTo,
  disconnectFrom }
