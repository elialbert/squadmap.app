<script>
  import Manipulate from '../team/Manipulate.js';
  import { showMenu } from '../team/Labels.js'

  function newNode() {
    let node = Manipulate.newNode();
    showMenu(node);
  }
</script>

<nav class="navbar fixed-top navbar-expand-lg navbar-light text-dark bg-transparent">
  
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <button class='btn btn-sm btn-primary mr-3'
    on:click={newNode}>
    + Add
  </button>
  <!-- svelte-ignore a11y-invalid-attribute -->
  <a class="navbar-brand" href="#">squadmap.app</a>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav">
      <li class="nav-item">
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a class="nav-link" href="#">About</a>
      </li>
      <li class="nav-item">
        <!-- svelte-ignore a11y-invalid-attribute -->
        <a class="nav-link" href="#">Thing</a>
      </li>
    </ul>
  </div>
</nav>