<script>
  import Manipulate from '../team/Manipulate.js';
  import Constants from '../team/Constants.js';
  import NodeMenuConnections from './NodeMenuConnections.svelte';
  export let node;
  export let closeCB;
  let data = node.data();
  let connectToValue;
  let riskFactorValue = riskFactor(node);

  let neighbors;
  let nonNeighbors;
  function computeNeighbors() {
    neighbors = Manipulate.getNeighbors(node);
    nonNeighbors = Manipulate.getNonNeighbors(node);
    // neighbors.forEach(function(neighbor) {
    //   neighbor.data('connectionType', connectionType(node, neighbor));
    // });
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

  function runDisconnect(neighbor) {
    if (!neighbor) { return; }
    Manipulate.disconnectFrom(node, neighbor);
    computeNeighbors();
  };

  function riskFactor(node) {
    return node.data().riskFactor || Constants.riskFactors[0];
  };

  function changeRiskFactor() {
    if (!riskFactorValue) { return; }
    node.data('riskFactor', riskFactorValue);
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
          {#each Constants.riskFactors as riskFactor}
            <option value={riskFactor}>{riskFactor}</option>
          {/each}
        </select>
      </div>
      <div class='form-group'>
        <label for="connectTo">Connect To</label>
        <!-- svelte-ignore a11y-no-onchange -->
        <select class="form-control" id="connectTo" bind:value={connectToValue} on:change={runConnect}>
          <option value={null}>{nonNeighbors.length > 0 ? `Choose` : `Connected to everyone!`}</option>
          {#each nonNeighbors as nonNeighbor}
            <option value={nonNeighbor}>{nonNeighbor.data().label}</option>
          {/each}
        </select>
      </div>

      <NodeMenuConnections
        {node} {runDisconnect} {neighbors} {nonNeighbors}
      ></NodeMenuConnections>      
      
      <div class='form-group form-bottom-section'>
        <button type='button' class="btn btn-secondary btn-sm"
          on:click={closeCB}
        >Close</button>
        <button type='button' class="btn btn-danger btn-sm float-right"
          on:click={doRemove}
        >Remove {node.data().label}</button>
      </div>
    </form>
  </div>
</div>

<style>
  .popover.node-menu {
    position: absolute;
    top: 100px;
    left: 50px;
    width: 80vw;
    min-height: 80vh;
    z-index: 9000;
    transform: none;
    background-color: white;
  }

  .popover-body {
    min-height: 60vw;
  }

  .cursor-pointer {
    cursor: pointer;
  }
</style>