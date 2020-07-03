<script>
  import Manipulate from '../team/Manipulate.js';
  export let node;
  export let closeCB;
  let data = node.data();
  let nodes = cy.nodes();
  let connectToValue;
  let disconnectFromValue;
  let riskFactorValue = riskFactor(node);

  let neighbors;
  let nonNeighbors;
  function computeNeighbors() {
    neighbors = Manipulate.getNeighbors(node);
    nonNeighbors = Manipulate.getNonNeighbors(node);
  }
  computeNeighbors();
  
  function doRemove() {
    closeCB();
    Manipulate.removeNode(node);
  }

  function runConnect() {
    if (!connectToValue) { return; }
    Manipulate.connectTo(node, connectToValue);
    connectToValue = null;
    computeNeighbors();
  }

  function runDisconnect() {
    if (!disconnectFromValue) { return; }
    Manipulate.disconnectFrom(node, disconnectFromValue);
    disconnectFromValue = null;
    computeNeighbors();
  };

  function changeRiskFactor() {
    if (!riskFactorValue) { return; }
    node.data('riskFactor', riskFactorValue);
  };

  const riskFactors = [
    'low', 'medium', 'high'
  ];

  function connectionType(node1, node2) {
    return Manipulate.edgeBetween(node1, node2).data().connectionType || 'hang outside';
  }

  function riskFactor(node) {
    return node.data().riskFactor || 'medium';
  };
</script>

<div class='popover fade bs-popover-right show node-menu' id={`node-menu-${data.id}`}>
  <h3 class='popover-header'>
    Edit Info for {data.label}
    <span class="float-right cursor-pointer" on:click={closeCB}>X</span>
  </h3>
  <div class='popover-body'>
    <form>
      <div class='form-group'>
        <label for="riskFactor">Risk Factor</label>
        <!-- svelte-ignore a11y-no-onchange -->
        <select class="form-control" id="riskFactor" bind:value={riskFactorValue} on:change={changeRiskFactor}>
          {#each riskFactors as riskFactor}
            <option value={riskFactor}>{riskFactor}</option>
          {/each}
        </select>
      </div>
      <div class='form-group'>
        <label for="connectTo">Connect To</label>
        <!-- svelte-ignore a11y-no-onchange -->
        <select class="form-control" id="connectTo" bind:value={connectToValue} on:change={runConnect}>
          <option value={null}>{nonNeighbors.length > 0 ? `New connection` : `Connected to everyone!`}</option>
          {#each nonNeighbors as nonNeighbor}
            <option value={nonNeighbor}>{nonNeighbor.data().label}</option>
          {/each}
        </select>
      </div>

      <div class='form-group'>
        <label for="disconnectFrom">Connections</label>
        <div class='bg-white rounded box-shadow'>
          {#each neighbors as neighbor}
            <div class='media pt-3'>
              <p class='media-body pb-3 mb-0 small lh-125 border-bottom border-gray'>
                <strong class='d-block'>
                  {neighbor.data().label}
                </strong>
                Risk factor: {riskFactor(neighbor)}<br/>
                Connection type: {connectionType(node, neighbor)}
              </p>
            </div>
          {/each}
        </div>
      </div>
      <div class='form-group stick-to-bottom'>
        <button type='button' class="btn btn-danger"
          on:click={doRemove}
        >Remove {node.data().label}</button>
      </div>
      
    </form>

    <div class='container-fluid'>
      <div class='row'></div>
    </div>
  </div>
</div>

<style>
  .popover.node-menu {
    position: absolute;
    top: 100px;
    left: 50px;
    width: 80vw;
    height: 80vh;
    z-index: 9000;
    transform: none;
    background-color: white;
  }

  .cursor-pointer {
    cursor: pointer;
  }
  .stick-to-bottom {
    position: absolute;
    bottom: 0
  }
</style>