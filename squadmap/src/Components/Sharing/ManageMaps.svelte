<script>
  import ModalTable from '../ModalTable.svelte';
  import MapSharing from './MapSharing.svelte';
  import permissions from '../../permissions.js';

  export let closeCB;
  export let currentMap;
  export let sharedMaps;
  export let privateMap;

  $: mapNames = Object.keys(sharedMaps);

  function switchToMap(name) {
    if (currentMap !== name) {
      currentMap = name;
    }
  };

  function deleteMap(mapName) {
    if (confirm(`Are you sure you want to totally remove ${mapName} and everyone's access to it?`)) {
      let needToSwitch = currentMap == mapName;

      permissions.deleteMap(mapName, function() {
        if (needToSwitch) { switchToMap('your private map'); }
      });
    }
  }

  function isAdmin(mapName) {
    return (sharedMaps[mapName] || {}).admin
  }
</script>

<div class='form-group m-1'>
  <h6>
    {#if mapNames.length > 0}
      Choose a map to view, edit, and share.
    {:else}
      Share your private map in the Sharing tab here to be able to switch between maps.
    {/if}
  </h6>
</div>
<ModalTable>
  <div class='maprow'>
    <div class='row {privateMap ? 'bg-info': ''}'
      on:click={() => switchToMap('your private map')}>
      <div class='col-7'>
        <h6 class='font-weight-bold'>your private map</h6>
      </div>
    </div>
  </div>
  {#each mapNames as mapName}
    <div class='maprow'>
      <div class='row {mapName == currentMap ? 'bg-info': ''}'
        on:click={() => switchToMap(mapName)}>
        <div class='col-7'>
          <h6 class='font-weight-bold'>{mapName}</h6>
        </div>
        <div class='col-5'>
          <h6>{permissions.permToEnglish(sharedMaps[mapName])}</h6>
        </div>
      </div>
      {#if isAdmin(mapName)}
        <MapSharing {mapName} {sharedMaps} {deleteMap}
          ></MapSharing>
      {/if}
    </div>
  {/each}
</ModalTable>

<div class='form-group form-bottom-section'>
  <button type='button' class="btn btn-secondary btn-sm"
    on:click={closeCB}
  >Close</button>
</div>
<style lang='scss'>

  .maprow {
    border-bottom: 1px solid gray;

    margin-top: 6px;
    padding-top: 6px;

  }

  .row {
    cursor: pointer;
    &:hover {
      background-color: lightgray;
    }
  }
</style>