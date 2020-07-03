<script>
  import Manipulate from '../team/Manipulate.js';
  export let node;
  export let closeCB;
  let data = node.data();
  let nodes = cy.nodes();
  let connectToValue;
  let disconnectFromValue;

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
  }
</script>

<div class='popover fade bs-popover-right show node-menu' id={`node-menu-${data.id}`}>
  <h3 class='popover-header'>
    Edit Info for {data.label}
    <span class="float-right cursor-pointer" on:click={closeCB}>X</span>
  </h3>
  <div class='popover-body'>
    <form>
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
        <label for="disconnectFrom">Disconnect From</label>
        <!-- svelte-ignore a11y-no-onchange -->
        <select class="form-control" id="disconnectFrom" bind:value={disconnectFromValue} on:change={runDisconnect}>
          <option value={null}>{nonNeighbors.length > 0 ? `Choose a connection` : `Connected to no one!`}</option>
          {#each neighbors as neighbor}
            <option value={neighbor}>{neighbor.data().label}</option>
          {/each}
        </select>
      </div>
      <div class='form-group'>
        <button type='button' class="btn btn-danger"
          on:click={doRemove}
        >Remove Node</button>
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
    height: 80vh;
    z-index: 9000;
    transform: none;
    background-color: white;
  }

  .cursor-pointer {
    cursor: pointer;
  }
</style>