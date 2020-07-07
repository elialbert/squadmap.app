<script>
  import Modal from './Modal.svelte';
  export let closeCB;
</script>

<Modal title={"About"} {closeCB}>
  <p class='p-2'>
    Squadmap.app is a tool to help you survive winter 2020. 
  </p>
  <p class='p-2'>
    The idea is to to feel empowered in the decisions you make around who you share space with and how you do it.
  </p>
  <p class='p-2'>
    Note that everything is automatically saved in your browser - as of right now nothing is shared online.
  </p>
  <p class='p-2'>
    Try it out! Click nodes and edges to change peoples' jobs and interactions, and watch how the colors change. Or turn off colors in the menu for color-blindedness.
  </p>
  <p class='p-2'>
    Node colors reflect the overall risk to that person, and edge gradients reflect that person's independent risk.
  </p>      
  <p class='p-2'>
    Thanks, hope you like it! 
    <br/>
    <a href='https://elialbert.com' target='_blank'>Eli</a>
  </p>
  <button type='button' class="btn btn-primary btn-sm"
    on:click={closeCB}
  >Cool ok let's do this</button>
</Modal>
