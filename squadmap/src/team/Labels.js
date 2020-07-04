import NodeMenu from '../Components/NodeMenu.svelte'

var makeNodeMenu = function(node) {
  let div = document.createElement('div');
  let menuObj = new NodeMenu({
    target: div,
    props: {
      node: node, 
      closeCB: node.closeCB
    }
  });
  document.body.appendChild( div );
  return div;
};

var showMenu = function(node) {
  cy.nodes().difference(node).forEach(function(n) { n.showingPopper = false; if (n.popperObj) {n.popperObj.remove();} });
  node.showingPopper = !node.showingPopper;
  if (node.showingPopper) {
    node.closeCB = function() {
      node.showingPopper = !node.showingPopper;
      node.popperObj.remove();
    }
    node.popperObj = makeNodeMenu(node, cy.nodes());
  } else {
    node.popperObj.remove();
  }
}

export { showMenu }