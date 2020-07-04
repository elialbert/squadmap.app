<script>
  import cytoscape from 'cytoscape';
  import cola from 'cytoscape-cola';
  // import { elements } from '../team/Team.js'
  import { showMenu, showEdgeMenu } from '../team/Labels.js'
  import debounce from 'lodash/debounce';
  import Manipulate from '../team/Manipulate.js';
  
  cytoscape.use(cola);
  document.addEventListener('DOMContentLoaded', function(){
    var cy = window.cy = cytoscape({
      container: document.getElementById('cy'),
      autounselectify: true,
      boxSelectionEnabled: false,
      style: [
        {
          selector: 'node',
          css: {
            'background-color': 'white',
            'border-color': 'black',
            'border-width': 2,
            'text-valign': 'center',
            'text-halign': 'center',
            'height': '60px',
            'width': '60px',
            "text-background-opacity": 1,
            "text-background-color": "white",
            "label": "data(label)",
            "text-wrap": "wrap",
            "text-max-width": "50px",
            "font-size": "12px"
          }
        },
        {
          selector: 'edge',
          css: {
            'line-color': 'black',
            'width': 2
          }
        }
      ],
      elements: JSON.parse( window.localStorage.getItem("cyjson") ).elements
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

    Manipulate.refreshLayout();
    window.cy = cy;
    Manipulate.setLastNode(cy.nodes()[0]);
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