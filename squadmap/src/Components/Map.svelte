<script>
  import Constants from '../team/Constants.js';
  import cytoscape from 'cytoscape';
  import cola from 'cytoscape-cola';

  import { showMenu, showEdgeMenu } from '../team/Labels.js'
  import debounce from 'lodash/debounce';
  import Manipulate from '../team/Manipulate.js';
  import ExposureRisk from '../team/ExposureRisk.js';
  import database from '../database.js'

  export let user;
  export let currentMap;
  export let loading;
  export let sharedMaps;

  let domLoaded = false;

  cytoscape.use(cola);
  const startCy = function(cydata) {
    var cy = window.cy = cytoscape({
      container: document.getElementById('cyEl'),
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
    Manipulate.refreshLayout();
    window.cy = cy;
    Manipulate.setLastNode(cy.nodes()[0]);
    Manipulate.setReadOnly(sharedMaps, currentMap);
    ExposureRisk.run();
  }

  document.addEventListener('DOMContentLoaded', () => domLoaded = true);

  var debounceRefreshLayout = debounce(Manipulate.refreshLayout, 10);

  function resizeAndRefresh() {
    if (!window.cy) { return; }
    cy.resize();
    Manipulate.refreshLayout();
  };

  if(window.attachEvent) {
    window.attachEvent('onresize', resizeAndRefresh);
  } else if(window.addEventListener) {
    window.addEventListener('resize', resizeAndRefresh, true);
  }

  $: {
    // user is loaded
    if (domLoaded && !loading) {
      window.user = user;
      if (user) {
        let urlSpecified = location.hash.split('#/shared/')[1];
        if (urlSpecified && urlSpecified != window.currentMapName) {
        } else {
          database.loadMap(startCy)
        }
      } else {
        startCy(database.loadLocal())
      }
    }
  }

  $: {
    // handle map change
    if (user && currentMap && (currentMap != window.currentMapName)) {
      console.log('in current map change watcher', currentMap)
      window.currentMapName = currentMap;
      if (currentMap != 'your private map') {
        location.hash = `#/shared/${currentMap}`
      } else {
        location.hash = `#`;
      }
      database.loadMap(startCy);
    }
  }
</script>

<div id="cyEl"></div>

<style>
#cyEl {
  width: 90%;
  height: 90vh;
  position: absolute;
  top: 60px;
  z-index: 999;
}
</style>