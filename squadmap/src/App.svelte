<script>
  import Map from './Components/Map.svelte';
  import Navbar from './Components/Navbar.svelte';

  function refreshLayout() {
    let els;
    els = cy.elements();
    els.makeLayout(layoutOptions).run();
  }
</script>

<div class='container-fluid'>
  <Navbar></Navbar>
	<Map></Map>
</div>

<style>
	
</style>