<script>
  import Modal from '../Modal.svelte';
  import database from '../../database.js';
  import ManageMaps from './ManageMaps.svelte';
  import ExistingMap from './ExistingMap.svelte';
  import NewMap from './NewMap.svelte';

  export let closeCB;
  export let currentMap;
  export let sharedMaps;

  let privateMap = false;
  let editingName = '';
  let newMapName = '';

  let managing = false;
  let error;
  let actionVerb;

  $: {
    if (currentMap == 'your private map') {
      privateMap = true;
    } else {
      privateMap = false;
      editingName = currentMap.slice();
    }
  }

  function shareMap() {
    error = '';
    database.copyMapToShared(newMapName, function() {
      currentMap = newMapName.slice();
      newMapName = '';
    }, function(err) {
      error = "That name has already been taken - please try another.";
    });
  };

  function getActionVerb() {
    if (currentMap == 'your private map') { return 'editing'; }
    if (!sharedMaps[currentMap]) { return 'we have an error'; }
    if (sharedMaps[currentMap].admin) { return 'admin of'; }
    if (sharedMaps[currentMap].write) { return 'editing'; }
    if (sharedMaps[currentMap].read) { return 'read only for'; }
  }
  $: {
    currentMap;
    actionVerb = getActionVerb();
  }

</script>
<Modal title={`Maps + Sharing`} {closeCB}>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <!-- svelte-ignore a11y-invalid-attribute -->
      <!-- svelte-ignore a11y-missing-attribute -->
      <a class={`nav-link ${!managing ? 'active' : ''}`}
        on:click={() => {managing = false }}>Sharing</a>
    </li>
    <li class="nav-item">
      <!-- svelte-ignore a11y-invalid-attribute -->
      <!-- svelte-ignore a11y-missing-attribute -->
      <a class={`nav-link ${managing ? 'active' : ''}`}
        on:click={() => {managing = true }}>Your Maps</a>
    </li>
  </ul>
  <form class='p-3'>
    <h6>
      Currently {actionVerb}: <span class='font-weight-bold'>{currentMap}</span>
    </h6>
    {#if managing}
    <ManageMaps {sharedMaps} {closeCB} {privateMap} bind:currentMap></ManageMaps>
    {:else if !privateMap}
      <ExistingMap {closeCB} {editingName} bind:newMapName {shareMap} {error}></ExistingMap>
    {:else}
      <NewMap {closeCB} {shareMap} {error} bind:newMapName></NewMap>
    {/if}
  </form>
</Modal>

<style>
  .nav-link {
    cursor: pointer;
  }
</style>