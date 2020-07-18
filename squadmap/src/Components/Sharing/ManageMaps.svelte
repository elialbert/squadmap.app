<script>
  export let closeCB;
  export let currentMap;
  export let sharedMaps;
  export let privateMap;
  // export let error;

  $: mapNames = Object.keys(sharedMaps);

  function switchToMap(name) {
    currentMap = name;
  };
</script>

<div class='form-group'>
  <h6>
    Currently editing: <span class='font-weight-bold'>{currentMap}</span>
    <p class='pb-1'/>
    {#if mapNames.length > 0}
      Choose a preexisting map to edit it and invite more people.
    {:else}
      Share your private map in the Sharing tab here to be able to switch between maps.
    {/if}
  </h6>
</div>
<table class="table">
  <thead>
    <!-- <tr>
      <th scope="col"><h6>Map Name</h6></th>
      <th scope="col"><h6>Shared with</h6></th>
      <th scope="col"></th>
    </tr> -->
  </thead>
  <tbody>
  <tr>
    <th scope="row">
      <h6>your private map</h6>
    </th>
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
      <!-- <td>
        <h6>1</h6>
      </td> -->
      <td>
        <button type='button' class="btn btn-info btn-sm"
          on:click={() => switchToMap(mapName)} disabled={mapName == currentMap}
        >Switch</button>
      </td>
    </tr>
  {/each}
  </tbody>
</table>
<div class='form-group form-bottom-section'>
  <button type='button' class="btn btn-secondary btn-sm"
    on:click={closeCB}
  >Close</button>
</div>

<style>
  table.table th {
    padding: .25rem;
    vertical-align: middle;
  }
  table.table th h6 {
    margin-bottom: 0px;
  }
  table.table td {
    padding: .25rem;
    vertical-align: middle;
  }
  table.table td h6 {
    margin-bottom: 0px;
  }
</style>
