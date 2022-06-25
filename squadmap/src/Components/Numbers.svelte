<script>
  import Modal from './Modal.svelte';
  import * as _ from 'lodash';
  import ExposureRisk from '../team/ExposureRisk.js';
  import Constants from '../team/Constants';

  import database from '../database.js';

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
      weights = cy.data('weights');
    }, 1000)
  }

  document.addEventListener('updateWeights', function(x) {
    weights = cy.data('weights');
  });

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
    database.save();
  }
  var debounceWeightUpdate = _.debounce(weightUpdate, 10);

  function reset() {
    weights = {riskWeights: Constants.riskWeights,
      connectionWeights: Constants.connectionWeights,
      activityModifier: Constants.activityModifier};
    cy.data('weights', weights);
    database.save();
    prepWeights();
  };
  let polyMode = !window.process

</script>

<Modal title={"Modify Algorithm Weights"} {closeCB}>
  {#if weights}
    {#if polyMode}
      <h4>Frequency of new partners</h4>
    {:else}
      <h4>Occupation Risk</h4>
    {/if}
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

    {#if polyMode}
      <h4>Protection level with new partners</h4>
    {:else}
      <h4>Activity Risk</h4>
    {/if}
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

    {#if polyMode}
      <h4>Connection Type Risks</h4>
    {:else}
      <h4>Connection Risk</h4>
    {/if}
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