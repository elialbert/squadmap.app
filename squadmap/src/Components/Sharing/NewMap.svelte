<script>
  export let closeCB;
  export let shareMap;
  export let error;

  export let newMapName = '';
</script>
<div class='form-group'>
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
</div>
<div class='form-group form-bottom-section'>
  <button type='button' class="btn btn-secondary btn-sm"
    on:click={closeCB}
  >Close</button>
  <br/>

</div>
