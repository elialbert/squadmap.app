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

export { makeNodeMenu }