<script>
  import Constants from '../team/Constants.js';
  import cytoscape from 'cytoscape';
  import cola from 'cytoscape-cola';

  import { showMenu, showEdgeMenu } from '../team/Labels.js'
  import debounce from 'lodash/debounce';
  import Manipulate from '../team/Manipulate.js';
  import database from '../database.js'

  export let user;
  export let loading;

  let domLoaded = false;
  console.log('init map')

  cytoscape.use(cola);
  const startCy = function(cydata) {
    console.log('starting cy with', cydata);
    var cy = window.cy = cytoscape({
      container: document.getElementById('cy'),
      autounselectify: true,
      boxSelectionEnabled: false,
      style: Constants.nodeStyles,
      elements: cydata.elements,
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

    let storedWeights = cydata.weights;
    let weights = {riskWeights: Constants.riskWeights, connectionWeights: Constants.connectionWeights,
      activityModifier: Constants.activityModifier};
    weights = {...weights, ...storedWeights};
    cy.data('weights', weights);
    cy.data('showLabels', cydata.showLabels);
    Manipulate.refreshLayout();
    window.cy = cy;
    Manipulate.setLastNode(cy.nodes()[0]);
    Manipulate.save();
  }

  document.addEventListener('DOMContentLoaded', () => domLoaded = true);

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

  $: {
    if (domLoaded && !loading) {
      window.user = user;
      if (user) {
        console.log('auth load')
        database.loadMap(startCy)
      } else {
        console.log('unauth load')
        startCy(database.loadLocal())
      }
    }
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