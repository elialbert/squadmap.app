import NodeMenu from '../Components/NodeMenu.svelte'

var makeNodeMenu = function(node, nodes) {
  let div = document.createElement('div');
  let menuObj = new NodeMenu({
    target: div,
    props: {
      node: node, 
      closeCB: node.closeCB,
      nodes: nodes
    }
  });
  document.body.appendChild( div );
  return div;
}

export { makeNodeMenu }