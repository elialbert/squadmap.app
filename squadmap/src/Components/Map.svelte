<script>
  import Constants from '../team/Constants.js';
  import cytoscape from 'cytoscape';
  import cola from 'cytoscape-cola';
  import { sample } from '../team/Team.js'
  import { showMenu, showEdgeMenu } from '../team/Labels.js'
  import debounce from 'lodash/debounce';
  import Manipulate from '../team/Manipulate.js';

  cytoscape.use(cola);
  let preloaded = JSON.parse( window.localStorage.getItem("cyjson") );
  if (!preloaded) {
    preloaded = {elements: sample}
  }
  
  document.addEventListener('DOMContentLoaded', function(){
    var cy = window.cy = cytoscape({
      container: document.getElementById('cy'),
      autounselectify: true,
      boxSelectionEnabled: false,
      style: Constants.nodeStyles,
      elements: preloaded.elements,
    });

    cy.on('drag', function(event) {
      debounceRefreshLayout();
    });
    cy.on('tap', 'node', function(evt){
      var node = evt.target;
      showMenu(node);
    });

    cy.on('tap', 'edge', function(evt){
      var edge = evt.target;
      showEdgeMenu(edge);
    });

    let storedWeights = JSON.parse(window.localStorage.getItem('weights'));
    let weights = {riskWeights: Constants.riskWeights, connectionWeights: Constants.connectionWeights};
    weights = {...weights, ...storedWeights};
    cy.data('weights', weights);
    cy.data('showLabels', (preloaded.data || {}).showLabels)
    Manipulate.refreshLayout();
    window.cy = cy;
    Manipulate.setLastNode(cy.nodes()[0]);
    Manipulate.save();
  });

  var debounceRefreshLayout = debounce(Manipulate.refreshLayout, 10);

  function resizeAndRefresh() {
    cy.resize();
    Manipulate.refreshLayout();
  };

  if(window.attachEvent) {
    window.attachEvent('onresize', resizeAndRefresh);
  } else if(window.addEventListener) {
    window.addEventListener('resize', resizeAndRefresh, true);
  }
</script>

<div id="cy"></div>

<style>
#cy {
  width: 90%;
  height: 90vh;
  position: absolute;
  top: 60px;
  z-index: 999;
}
</style>