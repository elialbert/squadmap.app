<script>
  import Map from './Components/Map.svelte';
  import Navbar from './Components/Navbar.svelte';
  import auth from './auth.js'
  import { onMount } from 'svelte';

  let user = null;
  let loading = true;

  const checkUserCb = function(d) {
    loading = false;
    if (d) {
      user = d;
      console.log('user ', user)
    }
  };

  const newUserCb = function(result) {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // ...
    }
    // The signed-in user info.
    user = result.user;
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
  <Navbar {loading} {user}></Navbar>
	<Map {user}></Map>
</div>

<style>

</style>