import NodeMenu from '../Components/NodeMenu.svelte';
import EdgeMenu from '../Components/EdgeMenu.svelte';

const makeEdgeMenu = function(edge) {
  removeMenus(cy.nodes());
  let div = document.createElement('div');
  let menuObj = new EdgeMenu({
    target: div,
    props: {
      edge: edge
    }
  });
  document.body.appendChild( div );
  return div;
};

const showEdgeMenu = function(edge) {
  removeMenus(cy.nodes())
  removeEdgeMenus(cy.edges().difference(edge));
  edge.showingMenu = !edge.showingMenu;
  if (edge.showingMenu) {
    edge.closeCB = function() {
      edge.showingMenu = !edge.showingMenu;
      edge.menuObj.remove();
    }
    edge.menuObj = makeEdgeMenu(edge);
  } else {
    edge.menuObj.remove();
  }
};

const removeMenus = function(nodes) {
  nodes.forEach(function(n) { n.showingPopper = false; if (n.popperObj) {n.popperObj.remove();} });
};

const removeEdgeMenus = function(edges) {
  edges.forEach(function(n) { n.showingMenu = false; if (n.menuObj) {n.menuObj.remove();} });
}

const makeNodeMenu = function(node) {
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

const showMenu = function(node) {
  removeMenus(cy.nodes().difference(node));
  removeEdgeMenus(cy.edges());
  node.showingPopper = !node.showingPopper;
  if (node.showingPopper) {
    node.closeCB = function() {
      node.showingPopper = !node.showingPopper;
      node.popperObj.remove();
    }
    node.popperObj = makeNodeMenu(node);
  } else {
    node.popperObj.remove();
  }
}

export { showMenu, showEdgeMenu }