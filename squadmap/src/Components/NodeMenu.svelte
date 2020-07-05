<script>
  import Modal from './Modal.svelte';
  import Manipulate from '../team/Manipulate.js';
  import Constants from '../team/Constants.js';
  import NodeMenuConnections from './NodeMenuConnections.svelte';
  export let node;
  export let closeCB;
  import { onMount } from 'svelte';

  let connectionsVisible = false;

  let data = node.data();
  Manipulate.setLastNode(node)
  let connectToValue;
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
    connectionsVisible = true;
  }

  function runDisconnect(neighbor) {
    if (!neighbor) { return; }
    Manipulate.disconnectFrom(node, neighbor);
    computeNeighbors();
  };

  function riskFactor(node) {
    return node.data().riskFactor || [...Constants.riskFactors].pop();
  };

  function changeRiskFactor() {
    if (!riskFactorValue) { return; }
    Manipulate.saveData(node, 'riskFactor', riskFactorValue);
  };  

  let name = node.data().label || 'New';
  let nameInput;
  onMount(() => { if (name == 'New') { nameInput.focus() } });

  function changeName() {
    Manipulate.saveData(node, 'label', name);
    data = node.data();
  }
</script>
<Modal title={`Edit Info for ${data.label}`} {closeCB}>
  <form>
    <div class='form-group'>
      <label for="name">Name</label>
      <div class="input-group">
        <input type='text' class='form-control' id='name' 
          bind:this={nameInput}
          bind:value={name} on:change={changeName} />
      </div>
    </div>
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
      {node} {runDisconnect} {neighbors} {nonNeighbors} bind:visible={connectionsVisible}
    ></NodeMenuConnections>      
    
    <div class='form-group form-bottom-section'>
      <button type='button' class="btn btn-secondary btn-sm"
        on:click={closeCB}
      >Done</button>
      <br/>
      <button type='button' class="btn btn-danger btn-sm"
        on:click={doRemove}
      >Remove {data.label}</button>
    </div>
  </form>
</Modal>