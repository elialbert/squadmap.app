<script>
  import { removeNode } from '../team/Manipulate.js';
  export let node;
  export let closeCB;
  export let nodes;
  let data = node.data();

  console.log(nodes)

  function doRemove() {
    closeCB();
    removeNode(node);
  }
</script>

<div class='popover fade bs-popover-right show node-menu' id={`node-menu-${data.id}`}>
  <h3 class='popover-header'>
    Edit Info for {data.label}
    <span class="float-right cursor-pointer" on:click={closeCB}>X</span>
  </h3>
  <div class='popover-body'>
    <form>
      <div class='form-group'>
        <label for="connectTo">Connect To</label>
        <select class="form-control" id="connectTo">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>

      <div class='form-group'>
        <label for="disconnectFrom">Disconnect From</label>
        <select class="form-control" id="disconnectFrom">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
      </div>
      <div class='form-group'>
        <button type='button' class="btn btn-danger"
          on:click={doRemove}
        >Remove Node</button>
      </div>
      
    </form>
  </div>
</div>

<style>
  .popover.node-menu {
    position: absolute;
    top: 100px;
    left: 50px;
    width: 80vw;
    height: 80vh;
    z-index: 9000;
    transform: none;
    background-color: white;
  }

  .cursor-pointer {
    cursor: pointer;
  }
</style>