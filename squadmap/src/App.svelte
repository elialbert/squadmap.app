<script>
  import Map from './Components/Map.svelte';
  import Navbar from './Components/Navbar.svelte';
  import auth from './auth.js'
  import database from './database.js'
  import { onMount } from 'svelte';

  window.user = null;
  let user;
  let loading = true;

  const checkUserCb = function(d) {
    loading = false;
    if (!d) { return; }
  };

  const newUserCb = function(result) {
    user = result.user;
    window.user = user;
    database.writeUserData(user);
    console.log('user ', user)
    loading = false;
  }

  function runAuth() {
    if (location.pathname.indexOf('/__/auth/handler') > -1) {
      auth.continueAuth(newUserCb);
    }
    auth.checkSignin(checkUserCb);
  }

  onMount(runAuth);
</script>

<div class='container-fluid'>
  <Navbar {loading}></Navbar>
	<Map {user}></Map>
</div>

<style>

</style>