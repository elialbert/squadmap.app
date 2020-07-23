<script>
  export let title;
  export let closeCB;
  export let customClass='';
  export let popoverClass='popover-body';
</script>

<div class={`popover fade bs-popover-right show custom-modal ${customClass}`}>
  <h3 class='popover-header'>
    {title}
    <span class="float-right cursor-pointer close-button" on:click={closeCB}>X</span>
  </h3>
  <div class='{popoverClass} popoverbody-overflow'>
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
    background-color: rgba(255, 255, 255, 0.95);
  }

  .popoverbody-overflow {
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 84vh;
  }

  .popover-body-nopadding {
    color: #212529
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .close-button {
    padding: 10px;
    margin: -10px;
  }
</style>