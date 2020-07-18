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

  $: {
    if (currentMap == 'your private map') {
      privateMap = true;
    } else {
      privateMap = false;
      editingName = currentMap;
    }
  }

  function shareMap(newMapName) {
    try {
      database.copyMapToShared(newMapName, function() {
        currentMap = newMapName;
        newMapName = '';
      });
    } catch(err) {
      console.log(err);
      error = "That name has already been taken - please try another.";
    }
  };

</script>
<Modal title={`Maps + Sharing`} {closeCB}>
  <ul class="nav nav-tabs">
    <li class="nav-item">
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a href="#" class={`nav-link ${!managing ? 'active' : ''}`}
        on:click={() => {managing = false }}>Sharing</a>
    </li>
    <li class="nav-item">
      <!-- svelte-ignore a11y-invalid-attribute -->
      <a href="#" class={`nav-link ${managing ? 'active' : ''}`}
        on:click={() => {managing = true }}>Your Maps</a>
    </li>
  </ul>
  <form class='p-3'>
    {#if managing}
    <ManageMaps {sharedMaps} {privateMap} bind:currentMap></ManageMaps>
    {:else if !privateMap}
      <ExistingMap {editingName} {newMapName} {shareMap} {error}></ExistingMap>
    {:else}
      <NewMap {closeCB} {shareMap} {error} {newMapName}></NewMap>
    {/if}
  </form>
</Modal>