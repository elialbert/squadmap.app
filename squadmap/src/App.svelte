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
    user = d;
    window.user = d;
    database.writeUserData(user);
    console.log('user ', user)
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
    try {
      auth.checkSignin(checkUserCb);
    } catch(err) {
      loading = false;
    }
  }

  onMount(runAuth);
</script>

<div class='container-fluid'>
  <Navbar {loading}></Navbar>
	<Map {user} {loading}></Map>
</div>

<style>

</style>