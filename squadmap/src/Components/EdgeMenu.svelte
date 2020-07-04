<script>import cytoscape from 'cytoscape';

  import Manipulate from '../team/Manipulate.js';
  import Constants from '../team/Constants.js';
  export let edge;

  let node1 = edge.source();
  let node2 = edge.target();
  let closeCB = edge.closeCB;

  function connectionType() {
    return edge.data().connectionType || [...Constants.connectionTypes].pop();
  };
  let connectionTypeValue = connectionType();
  function changeConnectionType() {
    Manipulate.saveData(edge, 'connectionType', connectionTypeValue);
  };

  function doRemove() {
    closeCB();
    cy.remove(edge);
  }
</script>

<div class='popover fade bs-popover-right show node-menu' id={`node-menu-${edge.id}`}>
  <h3 class='popover-header'>
    {node1.data().label} {`<->`} {node2.data().label}
    <span class="float-right cursor-pointer" on:click={closeCB}>X</span>
  </h3>
  <div class='popover-body'>
    <form>
      <div class='form-group'>
        <label for="connectionType">Edit Connection Type (how close)</label>
        <!-- svelte-ignore a11y-no-onchange -->
        <select class="form-control" id="connectionType" 
          bind:value={connectionTypeValue} on:change={() => changeConnectionType()}>
          <option value={null}>{`Choose`}</option>
          {#each Constants.connectionTypes as connectionType}
            <option value={connectionType}>{connectionType}</option>
          {/each}
        </select>
      </div>

      <div class='form-group form-bottom-section'>
        <button type='button' class="btn btn-danger btn-sm float-right"
          on:click={doRemove}
        >Disconnect</button>
        <button type='button' class="btn btn-secondary btn-sm"
          on:click={closeCB}
        >Done</button>
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
    z-index: 9000;
    transform: none;
    background-color: white;
  }

  .cursor-pointer {
    cursor: pointer;
  }
</style>