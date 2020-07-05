<script>
  import Manipulate from '../team/Manipulate.js';
  import Constants from '../team/Constants.js';
  import { slide } from 'svelte/transition';
  export let node;
  export let runDisconnect;
  export let neighbors;

  let visible = false;
  
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

  function toggleVisible() {
    visible = !visible;
  }
  
</script>

<div class='form-group connections-box'>
  <!-- svelte-ignore a11y-invalid-attribute -->
  <label for="disconnectFrom" on:click={toggleVisible} class='connections-link'><a class='connections-link' href='#'>Connections 
    {#if visible}<span class='toggle-icon'>&#9650;</span>{/if}
    {#if !visible}<span class='toggle-icon'>&#9660;</span>{/if}
  </a>
  </label>
  {#if visible}
  <div class='rounded box-shadow' transition:slide>
    {#each neighbors as neighbor}
      <div class='media pb-3'>
        <div class='media-body pb-1 mb-0 medium lh-125 border-bottom border-gray'>
          <strong class='pr-1 text-truncate connection-label'>
            {neighbor.data().label}
          </strong>
          <button type='button' class="btn btn-warning btn-sm float-right"
              on:click={() => runDisconnect(neighbor)}
            >Disconnect</button>

          <div class='connection-label'>Risk: {riskFactor(neighbor)}</div>
          <div class='connection-label'>Edit Connection Type:</div>
          <!-- svelte-ignore a11y-no-onchange -->
          <select class="form-control" id="connectionType" 
            bind:value={neighborConnectionTypes[neighbor.data().id]} on:change={() => changeConnectionType(neighbor)}>
            <option value={null}>{`Choose`}</option>
            {#each Constants.connectionTypes as connectionType}
              <option value={connectionType}>{connectionType}</option>
            {/each}
          </select>
        </div>
      </div>
    {/each}
  </div>
  {/if}
</div>

<style>
  .connections-box {
    min-height: 300px;
  }
  .connections-link {
    color: '#007bff';
    cursor: pointer;
  }
  .connections-link:hover {
    text-decoration: underline;
  }
  .connection-label {
    font-size: 16px;
  }
  .toggle-icon {
    float: right;
  }
</style>