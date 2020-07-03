<script>
  import cytoscape from 'cytoscape';
  import cola from 'cytoscape-cola';
  import { elements } from '../team/Team.js'
  import debounce from 'lodash/debounce';

  let mobileMode = window.innerWidth < 656;

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

  function repositionFirstElement() {
    let firstEl = elements.nodes[0];
    if (mobileMode) {
      firstEl.position = {
        x: 10, y: 10
      }
    }
  };
  repositionFirstElement();

  document.addEventListener('DOMContentLoaded', function(){

    var cy = window.cy = cytoscape({
      container: document.getElementById('cy'),

      autounselectify: true,

      boxSelectionEnabled: false,

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
      debounceRefreshLayout();
    });
    cy.on('tap', 'node', function(evt){
      var node = evt.target;
      console.log( 'tapped ' + node.id() );
    });

    refreshLayout();
    window.cy = cy;
  });

  var debounceRefreshLayout = debounce(refreshLayout, 10);

  function resizeAndRefresh() {
    cy.resize();
    refreshLayout();
  }

  function refreshLayout() {
    console.log('in refresh')
    let els;
    if (mobileMode) {
      els = cy.elements().slice(1)
    } else {
      els = cy.elements();
    }
    els.makeLayout(layoutOptions).run()
  }

  if(window.attachEvent) {
    window.attachEvent('onresize', resizeAndRefresh);
  }
  else if(window.addEventListener) {
    window.addEventListener('resize', resizeAndRefresh, true);
  }
  else {
    //The browser does not support Javascript event binding
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