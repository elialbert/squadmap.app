<script>
  import ModalTable from '../ModalTable.svelte';
  import { slide } from 'svelte/transition';
  import permissions from '../../permissions.js';
  export let mapName;
  export let sharedMaps;
  export let deleteMap;

  let visible = false;
  let sharers = {};
  let sharersForDisplay = [];
  let shareWithEmail = '';
  function toggleVisible() {
    visible = !visible;
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
    permissions.shareMapWithEmail(mapName, shareWithEmail.trim(), {read: 1, write: 1}, function() {
      shareWithEmail = '';
      getSharers();
    });
  };

  function getSharers() {
    permissions.getSharers(mapName, function(res) {
      sharers = res;
      prepSharing();
    })
  };

  function changePerm(sharedWith) {
    if (sharedWith.perm === null) { console.log('exit early');return; }
    let perm = permissions.englishToPerm(sharedWith.perm);
    permissions.shareMapWithEmail(mapName, sharedWith.email, perm, function() {
      getSharers();
    });
  };
  $: disableNewMap = permissions.adminOfTooMany(sharedMaps);
  $: isAdmin = (sharers[permissions.sanitizeEmail(user.email)] || {}).admin;
  $: {
    mapName;
    getSharers();
  }

</script>
<div class='row'>
  <div class='col-4'>
    <label for="mapsharing" on:click={toggleVisible} class='connections-link'>
      <h6 class='connections-link'>Sharing
        {#if visible}<span class='toggle-icon'>&#9650;</span>{/if}
        {#if !visible}<span class='toggle-icon'>&#9660;</span>{/if}
      </h6>
    </label>
  </div>
  <div class='col-8'>
    <button type='button' class="btn btn-danger btn-sm"
      on:click={() => deleteMap(mapName)}
    >Delete</button>
  </div>
</div>
{#if visible}
  <div class='rounded box-shadow' id='mapsharing' transition:slide>
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
          value={`https://squadmap.app/#/shared/${mapName}`}>
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
  </div>
{/if}


<style>
.connections-link {
  color: '#007bff';
  cursor: pointer;
}
.connections-link:hover {
  text-decoration: underline;
}
.toggle-icon {
  float: right;
}
</style>