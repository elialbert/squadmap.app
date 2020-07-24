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

  let managing = true;
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

  function copyMap() {
    error = '';
    let nmn = newMapName.trim();
    database.copyMapToShared(nmn, function() {
      currentMap = nmn.slice();
      nmn = '';
    }, function(err) {
      error = "That name has already been taken - please try another.";
    });
  };

  // function getActionVerb() {
  //   if (currentMap == 'your private map') { return 'editing'; }
  //   if (!sharedMaps[currentMap]) { return 'we have an error'; }
  //   if (sharedMaps[currentMap].admin) { return 'admin of'; }
  //   if (sharedMaps[currentMap].write) { return 'editing'; }
  //   if (sharedMaps[currentMap].read) { return 'read only for'; }
  // }
  $: {
    currentMap;
    // actionVerb = getActionVerb();
  }

</script>
<Modal title={`Maps + Sharing`} {closeCB} popoverClass={'popover-body-nopadding'}>
  <!-- <ul class="nav nav-tabs">
    <li class="nav-item">
      <a class={`nav-link ${!managing ? 'active' : ''}`}
        on:click={() => {managing = false }}>Sharing</a>
    </li>
    <li class="nav-item">
      <a class={`nav-link ${managing ? 'active' : ''}`}
        on:click={() => {managing = true }}>Your Maps</a>
    </li>
  </ul> -->
  <form >
    <!-- <h6>
      Currently {actionVerb}: <span class='font-weight-bold'>{currentMap}</span>
    </h6> -->
    {#if managing}
      <ManageMaps {sharedMaps} {closeCB} {privateMap} bind:currentMap></ManageMaps>
    {/if}
      <!-- <ExistingMap {closeCB} {editingName} {sharedMaps}
        bind:newMapName {shareMap} {error}></ExistingMap>
      <NewMap {closeCB} {shareMap} {sharedMaps}
        {error} bind:newMapName></NewMap> -->
  </form>
</Modal>

<style>
  /* .nav-link {
    cursor: pointer;
  } */
</style>