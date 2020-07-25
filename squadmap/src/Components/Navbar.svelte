<script>
  import { slide } from 'svelte/transition';
  import { onMount } from 'svelte';
  import Manipulate from '../team/Manipulate.js';
  import { showMenu, removeMenus } from '../team/Labels.js'
  import About from './About.svelte';
  import Numbers from './Numbers.svelte';
  import Sharing from './Sharing/Sharing.svelte';
  import Legend from './Legend.svelte';
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
  let showLegend = false;

  function newNode() {
    let node = Manipulate.newNode();
    showMenu(node);
  };

  function aboutClose() {
    showAbout = false;
  }
  function openAbout() {
    showAbout = !showAbout;
    if (showAbout) {
      showSharing = false;
      showNumbers = false;
      showLegend = false;
      toggleMenu()
    }
  }
  function numbersClose() {
    showNumbers = false;
  }
  function openNumbers() {
    showNumbers = !showNumbers;
    if (showNumbers) {
      showSharing = false;
      showAbout = false;
      showLegend = false;
      toggleMenu()
    }
  }

  function sharingClose() {
    showSharing = false;
  }
  function openSharing() {
    showSharing = !showSharing;
    if (showSharing) {
      showNumbers = false;
      showAbout = false;
      showLegend = false;
      toggleMenu()
    }
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
    removeMenus(cy.nodes());
    if (!canToggleNav) { return; }
    showNavDropdown = !showNavDropdown;
  };

  function toggleShowLegend() {
    showLegend = !showLegend;
    if (showLegend) {
      showAbout = false;
      showSharing = false;
      showNumbers = false;
    }
  }

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

  function signoutWrapper() {
    currentMap = 'your private map';
    location.hash = '#'
    auth.signOut();
  };

  $: readOnlyMode = readOnlyMode = Manipulate.isInReadOnlyMode(sharedMaps, currentMap);
</script>

<nav class="navbar fixed-top navbar-expand-lg navbar-light text-dark bg-transparent">
  <button class="navbar-toggler" id='hiddenIcon' type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon" on:click={toggleMenu}></span>
  </button>

  <!-- svelte-ignore a11y-invalid-attribute -->
  <a class="navbar-brand" href="javascript:void(0)">SquadMap.app</a>
  <div class='legend-link mr-2' on:click={toggleShowLegend}>&#x24D8;</div>

  {#if showNavDropdown}
  <div class={`collapse bg-white navbar-collapse ${showNavDropdown ? 'show' : ''} ${canToggleNav ? 'pl-3 pb-1' : ''}`}
    transition:slide
    id="navbarSupportedContent">
    <ul class="navbar-nav" >
      <li class="nav-item">
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a class="nav-link text-dark" href="javascript:void(0)" on:click={openAbout}>About</a>
      </li>
      {#if user && !loading}
        <li class="nav-item">
          <!-- svelte-ignore a11y-invalid-attribute -->
          <a class="nav-link text-dark" href="javascript:void(0)" on:click={openSharing}>Maps + Sharing</a>
        </li>
      {/if}
      <li class="nav-item">
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a class="nav-link text-dark" href="javascript:void(0)" on:click={openNumbers}>Modify Algorithm Weights</a>
      </li>
      <li class="nav-item">
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a class="nav-link text-dark" href="javascript:void(0)" on:click={toggleColorBlind}>Toggle color-blind mode</a>
      </li>
      {#if currentMap == 'your private map'}
        <li class="nav-item">
          <!-- svelte-ignore a11y-invalid-attribute -->
          <a class="nav-link text-dark" href="javascript:void(0)" on:click={reset}>Reset</a>
        </li>
      {/if}
    </ul>
    <ul class="navbar-nav ml-auto">
      <li class="nav-item">
        {#if loading}
        <!-- svelte-ignore a11y-missing-attribute -->
        <a class="nav-link text-dark">Loading...</a>
        {:else if user}
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a class="nav-link text-dark signout" href="javascript:void(0)" on:click={openSharing}>{user.email} ({currentMap} {#if readOnlyMode}<span>Read Only</span>{/if})</a>
        {:else}
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a class="nav-link text-dark signin" href="javascript:void(0)" on:click={auth.startAuth}>Sign in to Share</a>
        {/if}
      </li>
      <li class="nav-item">
        {#if user}
        <a class="nav-link text-dark signout" href="javascript:void(0)" on:click={signoutWrapper}>Sign Out</a>
        {/if}
      </li>
    </ul>
  </div>
  {/if}
</nav>
<!-- svelte-ignore a11y-invalid-attribute -->
<div  class="new-node-button">
  <span class="new-node-button-inner"
    on:click={newNode}>&#xFF0B;</span>
</div>
{#if showAbout}
  <About closeCB={aboutClose}></About>
{/if}
{#if showNumbers}
  <Numbers closeCB={numbersClose}></Numbers>
{/if}
{#if showSharing}
  <Sharing closeCB={sharingClose} bind:currentMap {sharedMaps}></Sharing>
{/if}

<Legend {showLegend}></Legend>

<style lang='scss'>
  a.navbar-brand {
    padding-bottom: .6125rem;
  }
  a.signin {
    cursor: pointer;
    text-decoration: underline;
  }
  a.signout {
    cursor: pointer
  }

  .nav-link:hover {
    background-color: #f8f9fa;
  }

  .legend-link {
    cursor: pointer;
    font-size: 1.5em;
  }

  .new-node-button-inner {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2em;
    height: 2em;
    padding: 1px;
    cursor: pointer;
    font-weight: bold;
    font-size: 3vh;
    background-color:#0C9;
    border-radius:50px;
    box-shadow: 2px 2px 3px #999;
    border: 2px solid black;
    @media (max-width: 768px) {
      font-size: 3vh;
    }

    @media (max-height: 460px) {
      font-size: 7vh;
      width: 2em;
      height: 2em;
    }
  }

  .new-node-button {
    position: fixed;
    width:60px;
    height:60px;
    bottom:40px;
    right:40px;
    color:#FFF;
    text-align:center;
    z-index: 1030;
    cursor: pointer;
    @media (max-width: 768px) {
      bottom:25px;
      right:25px;
    }
    @media (max-height: 460px) {
      bottom:80px;
      right:25px;
    }
  }

  .collapse {
    @media (max-width: 991px) {
      border-bottom: 2px solid black;
    }
  }
</style>