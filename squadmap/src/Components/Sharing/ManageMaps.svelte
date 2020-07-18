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

  function deleteMap(mapName) {
    if (confirm(`Are you sure you want to totally remove ${mapName} and everyone's access to it?`)) {
      let needToSwitch = currentMap == mapName;

      permissions.deleteMap(mapName, function() {
        if (needToSwitch) { switchToMap('your private map'); }
      });
    }
  }
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
    <th scope="row" class='wider'>
      <h6>your private map</h6>
    </th>
    <td class='wider'>
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
      <th scope="row" class='wider'>
        <h6>{mapName}</h6>
      </th>
      <td class='wider'>
        <h6>{permissions.permToEnglish(sharedMaps[mapName])}</h6>
      </td>
      <td>
        <button type='button' class="btn btn-info btn-sm"
          on:click={() => switchToMap(mapName)} disabled={mapName == currentMap}
        >Switch</button>
        {#if sharedMaps[mapName].admin}
          <button type='button' class="btn btn-danger btn-sm"
            on:click={() => deleteMap(mapName)}
          >Delete</button>
        {/if}
      </td>

    </tr>

  {/each}
</ModalTable>

<div class='form-group form-bottom-section'>
  <button type='button' class="btn btn-secondary btn-sm"
    on:click={closeCB}
  >Close</button>
</div>
