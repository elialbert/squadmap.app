<script>
  import { fade } from 'svelte/transition';

  let show = false;
  function close() {
    show = false;
  }
</script>
{#if show}
  <div class='sticky-legend' transition:fade="{{duration: 200}}">
    <h3 class='close-button-wrapper'>
      <span class="float-right cursor-pointer close-button" on:click={close}>X</span>
    </h3>
    <div class='legend-inner'>
      <div class='d-flex justify-content-center'>
        <div class='legend-item'>
          <figure class='legend-image figure'>
            <img src='https://res.cloudinary.com/tiz2/image/upload/v1595162669/eli/node1.png' alt='a node' class='figure-img img-fluid rounded'>
            <figcaption class='figure-caption'>The color of a node represents the overall exposure risk to that person (green is best, red is worst)</figcaption>
          </figure>
        </div>
        <div class='legend-item'>
          <figure class='legend-image figure'>
            <img src='https://res.cloudinary.com/tiz2/image/upload/v1595162669/eli/edge2.png' alt='a node' class='figure-img img-fluid rounded'>
            <figcaption class='figure-caption'>The solidness of an edge represents how much contact two nodes have</figcaption>
          </figure>
        </div>
        <div class='legend-item'>
          <figure class='legend-image figure'>
            <img src='https://res.cloudinary.com/tiz2/image/upload/v1595162669/eli/edge3.png' alt='a node' class='figure-img img-fluid rounded'>
            <figcaption class='figure-caption'>The starting gradient of an edge represents each node's individual risk to those connected to it</figcaption>
          </figure>
        </div>
      </div>
    </div>
  </div>
{/if}
<div class='sticky-legend-button' on:click={() => {show = !show}}>
  &#10067;
</div>

<style lang='scss'>
  .sticky-legend-button {
    position: fixed;
    left: 93vw;
    top: 91vh;
    z-index: 1030;
    font-size: 4vh;
    background-color: white;
    border: 2px solid black;
    border-radius: 84px;
    cursor: pointer;

    @media (max-width: 768px) {
      left: 83vw;
      top: 91vh;
      font-size: 4vh;
    }
  }

  .sticky-legend {
    position: fixed;
    width: 100vw;
    height: 20vh;
    z-index: 1031;
    background-color: white;
    top: 80vh;
    border-top: 2px solid black;
    margin-left: -23px;
    @media (max-width: 768px) {
      height: 50vh;
      top: 50vh;
    }
  }

  .close-button {
    padding: 10px;
    margin: -10px;
    cursor: pointer;
  }

  .legend-inner {
    margin: 10px;
    padding: 10px;
  }
  .close-button-wrapper {
    margin-top: .3rem;
    margin-right: .5rem;
    @media (min-width: 768px) {
      margin-top: .8rem;
      margin-right: 1rem;
    }
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