<script>
  import debounce from 'lodash/debounce';
  import ExposureRisk from '../team/ExposureRisk.js';
  import Constants from '../team/Constants.js';

  export let closeCB;
  let weights = null;
  let riskWeights;
  let connectionWeights;

  function prepWeights() {
    if (!weights) { return; }
    riskWeights = Object.entries(weights.riskWeights);
    connectionWeights = Object.entries(weights.connectionWeights);
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
      connectionWeights: Object.fromEntries(connectionWeights)
    };
    cy.data('weights', weightObj);
    ExposureRisk.run();
    window.localStorage.setItem('weights', JSON.stringify(weightObj));
  }
  var debounceWeightUpdate = debounce(weightUpdate, 10);
  
  function reset() {
    weights = {riskWeights: Constants.riskWeights, connectionWeights: Constants.connectionWeights};
    window.localStorage.setItem('weights', JSON.stringify(weights));
    prepWeights();
  };

</script>

<div class='popover fade bs-popover-right show numbers'>
  <h3 class='popover-header'>
    Modify Algorithm Weights
    <span class="float-right cursor-pointer" on:click={closeCB}>X</span>
  </h3>
  <div class='popover-body'>
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
  </div>
</div>

<style>
  .popover.numbers {
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
  /* &::-webkit-slider-thumb {
    appearance: none;
    width: $range-handle-size;
    height: $range-handle-size;
    border-radius: 50%;
    background: $range-handle-color;
    cursor: pointer;
    transition: background .15s ease-in-out;

    &:hover {
      background: $range-handle-color-hover;
    }
  }

  &:active::-webkit-slider-thumb {
    background: $range-handle-color-hover;
  }

  &::-moz-range-thumb {
    width: $range-handle-size;
    height: $range-handle-size;
    border: 0;
    border-radius: 50%;
    background: $range-handle-color;
    cursor: pointer;
    transition: background .15s ease-in-out;

    &:hover {
      background: $range-handle-color-hover;
    }
  }

  &:active::-moz-range-thumb {
    background: $range-handle-color-hover;
  }
  
  // Focus state
  &:focus {
    
    &::-webkit-slider-thumb {
      box-shadow: 0 0 0 3px $shade-0,
                  0 0 0 6px $teal;
    }
  }
} */

</style>