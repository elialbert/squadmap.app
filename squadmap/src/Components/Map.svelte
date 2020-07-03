<script>
  import cytoscape from 'cytoscape';
  import cola from 'cytoscape-cola';
  import { elements } from '../team/Team.js'
  import debounce from 'lodash/debounce';

  cytoscape.use( cola );

  var layoutOptions = {
    name: 'cola',
    // maxSimulationTime: 2000,
    // convergenceThreshold: 100,
    fit: true,
    padding: 1,
    //refresh: 1,
    //nodeSpacing: function( node ){ return 1; },
    //edgeLength: 45
    // flow: { axis: 'y', minSeparation: 30 }
  }

  document.addEventListener('DOMContentLoaded', function(){

    var cy = window.cy = cytoscape({
      container: document.getElementById('cy'),

      autounselectify: true,

      boxSelectionEnabled: false,

      layout: layoutOptions,

      style: [
        {
          selector: 'node',
          css: {
            'background-color': '#f92411'
          }
        },

        {
          selector: 'edge',
          css: {
            'line-color': '#f92411'
          }
        }
      ],

      elements: elements
    });

    cy.on('drag', function(event) {
      console.log('yo')
      debounceRefreshLayout();
    });
    cy.on('tap', 'node', function(evt){
      var node = evt.target;
      console.log( 'tapped ' + node.id() );
    });
    window.cy = cy;
  });

  var debounceRefreshLayout = debounce(refreshLayout, 10);

  function refreshLayout() {
    cy.makeLayout(layoutOptions).run();
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

h1 {
  opacity: 0.5;
  font-size: 1em;
}
</style>