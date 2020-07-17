<script>
  import Manipulate from '../team/Manipulate.js';
  import { showMenu } from '../team/Labels.js'
  import About from './About.svelte';
  import Numbers from './Numbers.svelte';
  import auth from '../auth.js';
  import database from '../database.js';

  export let loading;

  let showAbout = false;
  let showNumbers = false;
  function newNode() {
    let node = Manipulate.newNode();
    showMenu(node);
  }

  function aboutClose() {
    showAbout = false;
  }
  function openAbout() {
    showAbout = true;
  }
  function numbersClose() {
    showNumbers = false;
  }
  function openNumbers() {
    showNumbers = true;
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
</script>

<nav class="navbar fixed-top navbar-expand-lg navbar-light text-dark bg-transparent">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <button class='btn btn-sm btn-primary mr-md-3'
    on:click={newNode}>
    + Add Someone
  </button>
  <!-- svelte-ignore a11y-invalid-attribute -->
  <a class="navbar-brand" href="#">SquadMap.app</a>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav">
      <li class="nav-item">
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a class="nav-link" href="#" on:click={openAbout}>About</a>
      </li>
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

  {#if loading}
    <span class="ml-md-3">Loading...</span>
  {:else if window.user}
    <span class="ml-md-3 signout" on:click={auth.signOut}>{window.user.email}</span>
  {:else}
    <span class="ml-md-3 signin" on:click={auth.startAuth}>Sign in to Share</span>
  {/if}
</nav>
{#if showAbout}
  <About closeCB={aboutClose}></About>
{/if}
{#if showNumbers}
  <Numbers closeCB={numbersClose}></Numbers>
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