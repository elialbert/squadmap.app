<script>
  import cytoscape from 'cytoscape';
  import cola from 'cytoscape-cola';
  import { elements } from '../team/Team.js'
  import { makeNodeMenu } from '../team/Labels.js'
  import debounce from 'lodash/debounce';

  let mobileMode = window.innerWidth < 656;

  cytoscape.use(cola);

  var layoutOptions = {
    name: 'cola',
    fit: true,
    padding: 1,
  }

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
      elements: elements
    });

    cy.on('drag', function(event) {
      debounceRefreshLayout();
    });
    cy.on('tap', 'node', function(evt){
      var node = evt.target;
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
    });

    refreshLayout();
    window.cy = cy;
  });

  var debounceRefreshLayout = debounce(refreshLayout, 10);

  function resizeAndRefresh() {
    cy.resize();
    refreshLayout();
  };

  function refreshLayout() {
    let els;
    els = cy.elements();
    els.makeLayout(layoutOptions).run();
  }

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

h1 {
  opacity: 0.5;
  font-size: 1em;
}
</style>