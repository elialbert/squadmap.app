<script>
  import permissions from '../../permissions.js';
  export let closeCB;
  export let shareMap;
  export let error;
  export let sharedMaps;

  export let newMapName = '';
  $: disableNewMap = permissions.adminOfTooMany(sharedMaps);
</script>
<div class='form-group'>
  {#if disableNewMap}
    <h6 class='text-danger'>
      Note: You are already admin for 5 maps - please delete one before you make another.
    </h6>
  {:else}
    <h6 class='pb-2'>
      Name this map to copy and share it!
    </h6>
    <div class="input-group">
      <input type='text' class='form-control' id='name' placeholder='New Map Name'
        bind:value={newMapName} />
      <div class='input-group-append'>
        <button type='button' class="btn btn-primary"
          on:click={shareMap} disabled={!newMapName}
        >Copy Map</button>
      </div>
    </div>
    {#if error}
      <h6 class='p-2 text-danger'>
        {error}
      </h6>
    {/if}
  {/if}
</div>
<div class='form-group form-bottom-section'>
  <button type='button' class="btn btn-secondary btn-sm"
    on:click={closeCB}
  >Close</button>
  <br/>

</div>
