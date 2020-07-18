<script>
  import permissions from '../../permissions.js';

  export let closeCB;
  export let editingName;
  export let shareMap;
  export let error;

  export let newMapName = '';

  let sharers = {};
  let sharersForDisplay = [];
  let shareWithEmail = '';

  function prepSharing() {
    sharersForDisplay = [];
    Object.keys(sharers).forEach(function(email) {
      if (email.replace('%2E', '.') !== user.email) {
        sharersForDisplay.push({
          email: email.replace('%2E', '.'),
          permissions: sharers[email]
        });
      }
    });
  };

  function shareWith() {
    permissions.shareMapWithEmail(editingName, shareWithEmail.trim(), function() {
      shareWithEmail = '';
      getSharers();
    });
  };

  function getSharers() {
    permissions.getSharers(function(res) {
      sharers = res;
      prepSharing();
    })
  }

  $: {
    editingName;
    newMapName;
    getSharers();
  }
</script>
<div class='form-group'>
  <h6>
    Currently editing: <span class='font-weight-bold'>{editingName}</span>
  </h6>

  {#if sharersForDisplay.length > 0}
    <h6>
      Currently shared with:
      <p class='pb-1'/>
      <ul>
        {#each sharersForDisplay as sharedWith}
        <li class='pb-1'>
          {sharedWith.email}
        </li>
        {/each}
      </ul>
    </h6>
    <h6 class='pb-1'>
      Copy this link to the people above:
      <input type='text' class='form-control mt-1' onclick="this.select()" readonly
        value={`https://squadmap.app/#/shared/${editingName}`}>
      They will have to sign in to google with the specified email address.
    </h6>

  {/if}
  <p class='pb-1'/>
  <h6>
    Enter an email address to share this map.
  </h6>
  <div class="input-group">
    <input type='text' class='form-control' id='name' placeholder='Share with an email'
      bind:value={shareWithEmail}>
    <div class='input-group-append'>
      <button type='button' class="btn btn-primary float-right"
        on:click={() => shareWith()} disabled={!shareWithEmail}
        >Share</button>
    </div>
  </div>

  <p class='pb-2'/>
  <h6>
    Choose a new name to copy this map again and share it separately.
  </h6>
  <div class="input-group">
    <input type='text' class='form-control' id='name' placeholder='New Map Name'
      bind:value={newMapName}>
    <button type='button' class="btn btn-primary"
      on:click={shareMap} disabled={!newMapName}
    >Copy Map</button>
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

</div>
