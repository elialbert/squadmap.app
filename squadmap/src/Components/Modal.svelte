<script>
  export let title;
  export let closeCB;
  export let customClass='';
</script>

<div class={`popover fade bs-popover-right show custom-modal ${customClass}`}>
  <h3 class='popover-header'>
    {title}
    <span class="float-right cursor-pointer" on:click={closeCB}>X</span>
  </h3>
  <div class='popover-body'>
    <slot></slot>
  </div>
</div>


<style>
  .popover.custom-modal {
    position: absolute;
    font-size: 20px;
    top: 8%;
    left: 8%;
    width: 80vw;
    max-width: 360px;
    z-index: 9000;
    transform: none;
    background-color: rgba(255, 255, 255, 0.7);
  }

  .popover-body {
    overflow-y: auto;
    max-height: 84vh;
  }

  .cursor-pointer {
    cursor: pointer;
  }
</style>