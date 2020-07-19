import Numbers from '../../src/Components/Numbers.svelte';
import { render, cleanup, fireEvent, waitForElement, waitFor } from '@testing-library/svelte'
import utils from '../utils.js';
import * as yellow from '../fixtures/sampleNodes1.js';

const start = function(sample) {
  utils.makeCY(sample);
}

describe('Algorithm Weights Component', () => {
  it('renders, changes slider', async () => {
    start(yellow);
    let props = {closeCB: ()=>{}};

    let {getByText, getByTestId, container} = render(Numbers, { props: props });
    getByText('Occupation Risk')
    let slider = container.querySelectorAll('input.range-slider__range')[0]

    fireEvent.input(slider, {
      target: { value: 1, valueAsNumber: 1 }
    });

    await waitFor(() => {
      expect(cy.data('weights').riskWeights['Works at home']).toEqual(1)
    });
  })
});