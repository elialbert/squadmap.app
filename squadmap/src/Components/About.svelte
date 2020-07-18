<script>
  import Modal from './Modal.svelte';
  export let closeCB;
</script>

<Modal title={"About"} {closeCB}>
  <div class='p-2'>
    <h4 class='p-2'>
      Squadmap.app is a tool to help you survive winter 2020.
    </h4>
    <h6 class='p-2'>
      The idea is to to feel empowered in the decisions you make about who you share space with and how you do it.
    </h6>
    <h6 class='p-2'>
      Note that everything is automatically saved in your browser - but if you sign in with google, you can save to the cloud and share live with anyone.
    </h6>
    <h6 class='p-2'>
      Try it out! Click nodes and edges to change peoples' jobs and interactions, and watch how the colors change. Or turn off colors in the menu for color-blindedness.
    </h6>
    <h6 class='p-2'>
      Node colors reflect the overall risk to that person, and edge gradients reflect that person's independent risk.
    </h6>
    <h6 class='p-2'>
      Thanks, hope you like it!
      <br/>
      <a href='https://elialbert.com' target='_blank'>Eli</a>
    </h6>
  </div>
  <button type='button' class="btn btn-primary btn-sm"
    on:click={closeCB}
  >Cool ok let's do this</button>
  <a href='https://github.com/elialbert/squadmap.app' target='_blank' class='float-right'>Open Source</a>
</Modal>
