<script>
  import Modal from './Modal.svelte';
  import debounce from 'lodash/debounce';
  import ExposureRisk from '../team/ExposureRisk.js';
  import Constants from '../team/Constants.js';

  export let closeCB;
  let weights = null;
  let riskWeights;
  let connectionWeights;
  let activityModifier;

  function prepWeights() {
    if (!weights) { return; }
    riskWeights = Object.entries(weights.riskWeights);
    connectionWeights = Object.entries(weights.connectionWeights);
    activityModifier = Object.entries(weights.activityModifier);
  }

  if (window.cy) {
    weights = cy.data('weights');
  } else {
    setTimeout(function(x) {
      weights = cy.data('weights')
    }, 1000)
  }

  $: {
    weights = weights;
    prepWeights();
  }

  function weightUpdate() {
    const weightObj = {
      riskWeights: Object.fromEntries(riskWeights),
      connectionWeights: Object.fromEntries(connectionWeights),
      activityModifier: Object.fromEntries(activityModifier)
    };
    cy.data('weights', weightObj);
    ExposureRisk.run();
    window.localStorage.setItem('weights', JSON.stringify(weightObj));
  }
  var debounceWeightUpdate = debounce(weightUpdate, 10);

  function reset() {
    weights = {riskWeights: Constants.riskWeights,
      connectionWeights: Constants.connectionWeights,
      activityModifier: Constants.activityModifier};
    window.localStorage.setItem('weights', JSON.stringify(weights));
    prepWeights();
  };

</script>

<Modal title={"Modify Algorithm Weights"} {closeCB}>
  {#if weights}
    <h4>Occupation Risk</h4>
    {#each riskWeights as [key, value]}
      <div class='form-group'>
        <label for="connectTo">{key}: {value}</label>
        <div class="slidecontainer">
          <input type="range" min="0" max="1" on:input={debounceWeightUpdate}
            bind:value={value} class="range-slider__range"
            step='0.01'>
        </div>
      </div>
    {/each}
    <hr/>

    <h4>Activity Risk</h4>
    {#each activityModifier as [key, value]}
      <div class='form-group'>
        <label for="connectTo">{key}: {value}</label>
        <div class="slidecontainer">
          <input type="range" min="0" max="0.5" on:input={debounceWeightUpdate}
            bind:value={value} class="range-slider__range"
            step='0.0001'>
        </div>
      </div>
    {/each}
    <hr/>

    <h4>Connection Risk</h4>
    {#each connectionWeights as [key, value]}
      <div class='form-group'>
        <label for="connectTo">{key}: {value}</label>
        <div class="slidecontainer">
          <input type="range" min="0" max="1" on:input={debounceWeightUpdate}
            bind:value={value} class="range-slider__range"
            step='0.01'>
        </div>
      </div>
    {/each}
  {/if}

  <button type='button' class="btn btn-primary btn-sm"
    on:click={closeCB}
  >Done</button>
  <button type='button' class="btn btn-warning btn-sm"
    on:click={reset}
  >Reset</button>
</Modal>

<style>

  .slidecontainer {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%
  }

  .range-slider__range {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    border-radius: 5px;
    outline: none;
    padding: 0;
    margin: 0;
  }
</style>