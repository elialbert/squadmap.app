<script>
  import { slide } from 'svelte/transition';
  import permissions from '../../permissions.js';
  export let shareMap;
  export let sharedMap;
  export let error;


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

  $: isAdmin = (sharers[permissions.sanitizeEmail(user.email)] || {}).admin;

  $: {
    // editingName;
    // newMapName;
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
    {#if visible}
      <div class='rounded box-shadow' id='mapsharing' transition:slide>
        here
      </div>
    {/if}
  </div>
  <div class='col-8'></div>
</div>


<style>
.connections-box {
  padding-bottom: 10px;
}
.connections-link {
  color: '#007bff';
  cursor: pointer;
}
.connections-link:hover {
  text-decoration: underline;
}
.connection-label {
  font-size: 16px;
}
.toggle-icon {
  float: right;
}
</style>