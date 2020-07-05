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
    top: 100px;
    left: 50px;
    width: 80vw;
    z-index: 9000;
    transform: none;
    background-color: white;
  }

  .cursor-pointer {
    cursor: pointer;
  }
</style>