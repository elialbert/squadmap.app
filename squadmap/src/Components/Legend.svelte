<script>
  import { slide } from 'svelte/transition';

  let show = false;
  function close() {
    show = false;
  }
</script>
{#if show}
  <div class='sticky-legend' transition:slide>
    <h3 class='close-button-wrapper'>
      <span class="float-right cursor-pointer close-button" on:click={close}>X</span>
    </h3>
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
<div class='sticky-legend-button' on:click={() => {show = !show}}>
  &#x24D8;
</div>

<style lang='scss'>
  .sticky-legend-button {
    position: fixed;
    left: 96vw;
    top: 6vh;
    z-index: 1030;
    font-size: 4vh;
    background-color: white;
    // border: 2px solid black;
    // border-radius: 84px;
    cursor: pointer;

    @media (max-width: 768px) {
      left: 90vw;
      top: 9vh;
      font-size: 4vh;
    }

    @media (max-height: 460px) {
      left: 94vw;
      top: 12vh;
      font-size: 7vh;
    }
  }

  .sticky-legend {
    position: fixed;
    width: 100vw;
    height: 30vh;
    z-index: 1031;
    background-color: white;
    top: 4vh;
    border-bottom: 2px solid black;
    margin-left: -23px;
    @media (max-width: 768px) {
      height: 44vh;
      top: 7vh;
    }
    @media (max-height: 460px) {
      height: 80vh;
      top: 12vh;
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
    @media (max-height: 460px) {
      margin-right: 4rem;
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