<script>
  import { slide } from 'svelte/transition';
  import { onMount } from 'svelte';
  import Manipulate from '../team/Manipulate.js';
  import { showMenu } from '../team/Labels.js'
  import About from './About.svelte';
  import Numbers from './Numbers.svelte';
  import Sharing from './Sharing/Sharing.svelte';
  import auth from '../auth.js';
  import database from '../database.js';

  export let loading;
  export let currentMap;
  export let sharedMaps;
  export let user;

  let showAbout = false;
  let showNumbers = false;
  let showSharing = false;
  let showNavDropdown = true;
  let canToggleNav = false;

  function newNode() {
    let node = Manipulate.newNode();
    showMenu(node);
  }

  function aboutClose() {
    showAbout = false;
  }
  function openAbout() {
    showAbout = true;
    toggleMenu()
  }
  function numbersClose() {
    showNumbers = false;
  }
  function openNumbers() {
    showNumbers = true;
    toggleMenu()
  }

  function sharingClose() {
    showSharing = false;
  }
  function openSharing() {
    showSharing = true;
    toggleMenu()
  }

  function reset() {
    if (confirm("Are you sure you want to clear all your changes and start over with the demo?")) {
      database.reset();
    }
  }

  function toggleColorBlind() {
    let colorBlind = parseInt(localStorage.getItem('showLabels') || 0);
    if (!colorBlind) {
      localStorage.setItem('showLabels', 1);
    } else {
      localStorage.setItem('showLabels', 0);
    }
    Manipulate.save();
  };

  function toggleMenu() {
    if (!canToggleNav) { return; }
    showNavDropdown = !showNavDropdown
  };

  function checkNav() {
    if (!document.getElementById('hiddenIcon')) { return; }
    if (getComputedStyle(document.getElementById('hiddenIcon')).getPropertyValue('display') == 'block') {
      canToggleNav = true;
      showNavDropdown = false;
    } else {
      canToggleNav = false;
      showNavDropdown = true;
    }
  }
  onMount(checkNav);
  if(window.attachEvent) {
    window.attachEvent('onresize', checkNav);
  } else if(window.addEventListener) {
    window.addEventListener('resize', checkNav, true);
  }
</script>

<nav class="navbar fixed-top navbar-expand-lg navbar-light text-dark bg-transparent">
  <button class="navbar-toggler" id='hiddenIcon' type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon" on:click={toggleMenu}></span>
  </button>
  <button class='btn btn-sm btn-primary mr-md-3'
    on:click={newNode}>
    + Add Someone
  </button>
  <!-- svelte-ignore a11y-invalid-attribute -->
  <a class="navbar-brand" href="#">SquadMap.app</a>
  {#if showNavDropdown}
  <div class={`collapse bg-white navbar-collapse ${showNavDropdown ? 'show' : ''} ${canToggleNav ? 'pl-3 pb-1' : ''}`}
    transition:slide
    id="navbarSupportedContent">
    <ul class="navbar-nav" >
      <li class="nav-item">
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a class="nav-link" href="#" on:click={openAbout}>About</a>
      </li>
      {#if user && !loading}
        <li class="nav-item">
          <!-- svelte-ignore a11y-invalid-attribute -->
          <a class="nav-link" href="#" on:click={openSharing}>Maps + Sharing</a>
        </li>
      {/if}
      <li class="nav-item">
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a class="nav-link" href="#" on:click={openNumbers}>Modify Algorithm Weights</a>
      </li>
      <li class="nav-item">
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a class="nav-link" href="#" on:click={toggleColorBlind}>Toggle color-blind mode</a>
      </li>
      <li class="nav-item">
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a class="nav-link" href="#" on:click={reset}>Reset</a>
      </li>
    </ul>
  </div>
  {/if}

  <span class={`ml-3 bg-white ${canToggleNav ? 'pb-2 pr-2 rounded' : ''}`}>
    {#if loading}
      <span class="">Loading...</span>
    {:else if user}
      <span class=" signout" on:click={auth.signOut}>{user.email} (editing {currentMap})</span>
    {:else}
      <span class=" signin" on:click={auth.startAuth}>Sign in to Share</span>
    {/if}
  </span>
</nav>
{#if showAbout}
  <About closeCB={aboutClose}></About>
{/if}
{#if showNumbers}
  <Numbers closeCB={numbersClose}></Numbers>
{/if}
{#if showSharing}
  <Sharing closeCB={sharingClose} bind:currentMap {sharedMaps}></Sharing>
{/if}

<style>
  a.navbar-brand {
    padding-bottom: .6125rem;
  }
  span.signin {
    cursor: pointer;
    text-decoration: underline;
  }
  span.signout {
    cursor: pointer
  }
</style>