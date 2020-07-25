<script>
  import { slide } from 'svelte/transition';

  export let showLegend;
</script>

{#if showLegend}
<div class='sticky-legend' transition:slide>
  <div class='legend-inner'>
    <div class='d-flex justify-content-center'>
      <div class='legend-item'>
        <figure class='legend-image figure'>
          <img src='https://res.cloudinary.com/tiz2/image/upload/v1595162669/eli/node2.png' alt='a node' class='figure-img img-fluid rounded'>
          <figcaption class='figure-caption'>The color of a node represents the overall exposure risk to that person (green is best, red is worst)</figcaption>
        </figure>
      </div>
      <div class='legend-item'>
        <figure class='legend-image figure'>
          <img src='https://res.cloudinary.com/tiz2/image/upload/v1595162669/eli/edge2.png' alt='an edge' class='figure-img img-fluid rounded'>
          <figcaption class='figure-caption'>The solidness of an edge represents how much contact two nodes have</figcaption>
        </figure>
      </div>
      <div class='legend-item'>
        <figure class='legend-image figure'>
          <img src='https://res.cloudinary.com/tiz2/image/upload/v1595251741/eli/menu.png' alt='a menu' class='figure-img img-fluid rounded'>
          <figcaption class='figure-caption'>Click a node to see and edit data about risk factors</figcaption>
        </figure>
      </div>
    </div>
  </div>
</div>
{/if}

<style lang='scss'>

  .sticky-legend {
    position: fixed;
    width: 100vw;
    height: 300px;
    z-index: 1031;
    background-color: white;
    top: 61px;
    border-bottom: 2px solid black;
    margin-left: -23px;
    @media (max-width: 768px) {
      height: 400px;
    }
  }

  .legend-inner {
    margin: 10px;
    padding: 10px;
  }

  .figure-caption {
    max-width: 250px;
  }

  .legend-item {
    @media (min-width: 768px) {
      margin-left: 50px;
      margin-right: 50px;
    }
  }

  .legend-image {
    padding: 10px;
  }
  .figure-img {
    border: 2px solid black;
    border-radius: 20px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
</style>