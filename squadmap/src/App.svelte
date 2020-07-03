<script>
  import Map from './Components/Map.svelte';
</script>

<main>
	<h1>Squadmap.app</h1>
	<Map></Map>
</main>
<!-- type="text/scss" -->
<style>
	main {
		/* text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto; */
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>