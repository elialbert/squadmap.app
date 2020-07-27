<script>
  import Map from './Components/Map.svelte';
  import Navbar from './Components/Navbar.svelte';
  import auth from './auth.js'
  import database from './database.js'
  import permissions from './permissions.js'
  import { onMount } from 'svelte';

  window.user = null;
  let user;
  let loading = true;
  let sharedMaps = {};

  window.currentMapName = 'your private map';
  let currentMap = 'your private map';

  const postSignin = function() {
    database.writeUserData(window.user);

    permissions.getShared(function(sharedMapData) {
      sharedMaps = sharedMapData || {};
      Object.keys(sharedMaps).forEach(function(name) {
        if (location.hash.indexOf(`#/shared/${name}`) == 0) {
          currentMap = name;
        }
      });
    });
  };

  const checkUserCb = function(d) {
    loading = false;
    if (!d) { return; }
    user = d;
    window.user = d;
    postSignin();
    console.log('user ', user)
  };

  const newUserCb = function(result) {
    user = result.user;
    window.user = user;
    postSignin();
    loading = false;
  }

  // function checkCy() {
  //   if (!window.cy) { alert('We seem to have had an issue while loading - please try refreshing the page?'); }
  // }

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

  function runMount() {
    // checkCy();
    runAuth();
  }

  onMount(runMount);
</script>

<div class='container-fluid'>
  <Navbar bind:currentMap {loading} {sharedMaps} {user}></Navbar>
  <Map {user} {loading} {currentMap} {sharedMaps}></Map>

</div>

<style>

</style>