<script>
  import Manipulate from '../team/Manipulate.js';
  import Constants from '../team/Constants.js';
  export let node;
  export let runDisconnect;
  export let neighbors;
  
  function connectionType(node1, node2) {
    return Manipulate.edgeBetween(node1, node2).data().connectionType || [...Constants.connectionTypes].pop();
  };

  function riskFactor(node) {
    return node.data().riskFactor || Constants.riskFactors[0];
  };

  function makeNeighborConnectionTypes() {
    let nct = {};
    neighbors.forEach(function(neighbor) {
      nct[neighbor.data().id] = connectionType(node, neighbor);
    });
    return nct;
  };
  $: neighborConnectionTypes = makeNeighborConnectionTypes();

  function changeConnectionType(neighbor) {
    Manipulate.saveData(
      Manipulate.edgeBetween(node, neighbor), 
      'connectionType', 
      neighborConnectionTypes[neighbor.data().id]
    );
  };
  
</script>

<div class='form-group connections-box'>
  <label for="disconnectFrom">Connections</label>
  <div class='rounded box-shadow'>
    {#each neighbors as neighbor}
      <div class='media pb-3'>
        <p class='media-body pb-1 mb-0 medium lh-125 border-bottom border-gray'>
          <strong class='pr-1 text-truncate connection-label'>
            {neighbor.data().label}
          </strong>
          <button type='button' class="btn btn-warning btn-sm float-right"
              on:click={() => runDisconnect(neighbor)}
            >Disconnect</button>
          <br />
            Risk: {riskFactor(neighbor)}
          
          <!-- svelte-ignore a11y-no-onchange -->
          <select class="form-control" id="connectionType" 
            bind:value={neighborConnectionTypes[neighbor.data().id]} on:change={() => changeConnectionType(neighbor)}>
            <option value={null}>{`Choose`}</option>
            {#each Constants.connectionTypes as connectionType}
              <option value={connectionType}>{connectionType}</option>
            {/each}
          </select>
        </p>
      </div>
    {/each}
  </div>
</div>

<style>
  .connections-box {
    min-height: 300px;
  }
  .connection-label {
    font-size: 16px;
  }
</style>