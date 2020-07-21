<script>
  import ModalTable from '../ModalTable.svelte';
  import permissions from '../../permissions.js';

  export let closeCB;
  export let editingName;
  export let shareMap;
  export let sharedMaps;
  export let error;

  export let newMapName = '';

  let sharers = {};
  let sharersForDisplay = [];
  let shareWithEmail = '';

  let valid = false;
  function validate () {
    valid = newMapName && !!newMapName.match(/^[a-zA-Z0-9]+$/g);
    if (newMapName && !valid) {
      error = 'Just letters and numbers, please.';
    } else {
      error = '';
    }
  }

  function prepSharing() {
    sharersForDisplay = [];
    Object.keys(sharers).forEach(function(email) {
      if (permissions.unsanitizeEmail(email) !== user.email) {
        sharersForDisplay.push({
          email: permissions.unsanitizeEmail(email),
          permissions: sharers[email],
          perm: permissions.permToEnglish(sharers[email])
        });
      }
    });
  };

  function shareWith() {
    permissions.shareMapWithEmail(editingName, shareWithEmail.trim(), {read: 1, write: 1}, function() {
      shareWithEmail = '';
      getSharers();
    });
  };

  function getSharers() {
    permissions.getSharers(function(res) {
      sharers = res;
      prepSharing();
    })
  };

  function changePerm(sharedWith) {
    if (sharedWith.perm === null) { console.log('exit early');return; }
    let perm = permissions.englishToPerm(sharedWith.perm);
    permissions.shareMapWithEmail(editingName, sharedWith.email, perm, function() {
      getSharers();
    });
  };

  $: disableNewMap = permissions.adminOfTooMany(sharedMaps);
  $: isAdmin = (sharers[permissions.sanitizeEmail(user.email)] || {}).admin;

  $: {
    editingName;
    newMapName;
    getSharers();
  }
</script>
<div class='form-group'>
  {#if sharersForDisplay.length > 0}
    <h6>
      Currently shared with:
    </h6>
    <ModalTable>
      {#each sharersForDisplay as sharedWith}
        <tr>
          <th scope="row">
            <h6>{sharedWith.email}</h6>
          </th>
          {#if isAdmin}
            <td>
              <!-- svelte-ignore a11y-no-onchange -->
              <select class="form-control perms" bind:value={sharedWith.perm} on:change={() => changePerm(sharedWith)}>
                {#each permissions.perms as perm}
                  <option value={perm}>{perm}</option>
                {/each}
              </select>
            </td>
          {/if}
        </tr>
        {/each}
    </ModalTable>

    <h6 class='pb-1'>
      Copy this link to the people above:
      <input type='text' class='form-control mt-1' onclick="this.select()" readonly
        value={`https://squadmap.app/#/shared/${editingName}`}>
      They will have to sign in to google with the specified email address.
    </h6>

  {/if}

  {#if isAdmin}
    <p class='pb-1'/>
    <h6>
      Enter a google email address to share this map.
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
  {:else}
  <h6 class='text-info'>
    Note: You do not have privileges to modify sharing for this map.
  </h6>
  {/if}

  {#if disableNewMap}
    <h6 class='text-danger'>
      Note: You are already the owner for 5 maps - please delete one before you make another.
    </h6>
  {:else}
    <p class='pb-2'/>
    <h6>
      Choose a new name to copy this map again and share it separately.
    </h6>
    <div class="input-group">
      <input type='text' class='form-control' id='name' placeholder='New Map Name'
        bind:value={newMapName}
        on:input={() => validate()}>
      <button type='button' class="btn btn-primary"
        on:click={shareMap} disabled={!newMapName || !valid}
      >Copy Map</button>
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
</div>

<style>
  select.perms {
    min-width: 100px;
  }
</style>