<script>
  import ModalTable from '../ModalTable.svelte';
  export let closeCB;
  export let currentMap;
  export let sharedMaps;
  export let privateMap;
  import permissions from '../../permissions.js';
  // export let error;

  $: mapNames = Object.keys(sharedMaps);

  function switchToMap(name) {
    currentMap = name;
  };
</script>

<div class='form-group'>
  <h6>
    <p class='pb-1'/>
    {#if mapNames.length > 0}
      Choose a map to view, edit, and share.
    {:else}
      Share your private map in the Sharing tab here to be able to switch between maps.
    {/if}
  </h6>
</div>
<ModalTable>
  <tr>
    <th scope="row">
      <h6>your private map</h6>
    </th>
    <td>
      <h6>
        Editor
      </h6>
    </td>
    <td>
      <button type='button' class="btn btn-info btn-sm"
        on:click={() => switchToMap('your private map')} disabled={privateMap}
      >Switch</button>
    </td>
  </tr>
  {#each mapNames as mapName}
    <tr>
      <th scope="row">
        <h6>{mapName}</h6>
      </th>
      <td>
        <h6>{permissions.permToEnglish(sharedMaps[mapName])}</h6>
      </td>
      <td>
        <button type='button' class="btn btn-info btn-sm"
          on:click={() => switchToMap(mapName)} disabled={mapName == currentMap}
        >Switch</button>
      </td>
    </tr>
  {/each}
</ModalTable>

<div class='form-group form-bottom-section'>
  <button type='button' class="btn btn-secondary btn-sm"
    on:click={closeCB}
  >Close</button>
</div>
