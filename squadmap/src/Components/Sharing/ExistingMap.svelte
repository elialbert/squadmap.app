<script>

  export let closeCB;
  export let editingName;
  export let shareMap;
  export let error;

  export let newMapName = '';

</script>
<div class='form-group'>
  <h6>
    Currently editing: <span class='font-weight-bold'>{editingName}</span>
    <br/>
    Choose a new name to copy and share separately.
  </h6>
  <label for="name">Name</label>
  <div class="input-group">
    <input type='text' class='form-control' id='name'
      bind:value={newMapName} />
  </div>
  {#if error}
    <p class='p-2 text-danger'>
      {error}
    </p>
  {/if}
</div>
<div class='form-group form-bottom-section'>
  <button type='button' class="btn btn-secondary btn-sm"
    on:click={closeCB}
  >Cancel</button>
  <button type='button' class="btn btn-primary btn-sm float-right"
    on:click={() => shareMap(newMapName)} disabled={!newMapName}
  >Create Shared Map</button>
</div>
