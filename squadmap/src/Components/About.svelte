<script>
  import Modal from './Modal.svelte';
  export let closeCB;
</script>

<Modal title={"About"} {closeCB}>
  <p class='p-2'>
    Squadmap.app is a tool to help you survive winter 2020. 
  </p>
  <p class='p-2'>
    The idea is to form a trusted squad of friends that you can hang out with indoors, and to be comfortable with the risk that entails.
  </p>
  <p class='p-2'>
    SquadMap.app helps you choose your squad by allowing you to visualize people and connections on a graph. Note that everything is automatically saved in YOUR browser - I don't want your data.
  </p>
  <p class='p-2'>
    Try it out! Click nodes and edges to change the peoples' jobs and interactions, drag nodes to fit on your screen better.
  </p>
  <p class='p-2'>
    If you're feeling adventurous, you can also change the numeric assumptions underlying the algorithm itself.
  </p>      
  <p class='p-2'>
    Thanks, hope you like it! 
    <br/>
    <a href='https://elialbert.com'>Eli</a>
  </p>
  <button type='button' class="btn btn-primary btn-sm"
    on:click={closeCB}
  >Cool ok let's do this</button>
</Modal>
