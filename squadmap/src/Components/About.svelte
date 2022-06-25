<script>
  import Modal from './Modal.svelte';
  export let closeCB;
</script>

<Modal title={"About"} {closeCB}>
  <div class='p-2'>
    <h4 class='p-2'>
      Squadmap.app is a tool to help you plan your polycule!
    </h4>
    <h6 class='p-2'>
      The idea is to to feel empowered in the decisions you make about who you hook up with and how you do it.
    </h6>
    <h6 class='p-2'>
      Note that everything is automatically saved in your browser - but if you sign in with google, you can save to the cloud and share live with anyone.
    </h6>
    <h6 class='p-2'>
      Try it out! Click nodes and edges to change peoples' risks and interactions, and watch how the colors change to signify risk. Or turn off colors in the menu for color-blindedness.
    </h6>
    <h6 class='p-2'>
      One last note - this tool use to be for pandemicule planning. Let me know if you're still using that, and I can bring it back.
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
