import NodeMenu from '../../src/Components/NodeMenu.svelte';
import { render, cleanup, fireEvent, waitForElement, waitFor } from '@testing-library/svelte'
import utils from '../utils.js';
import * as green from '../fixtures/sampleNodes3.js';

const start = function(sample, nodeId) {
  utils.makeCY(sample.sample);
  let node = cy.nodes().filter(function(n) { return n.data().id == nodeId })[0]
  let props = {closeCB: ()=>{}, node: node};
  return render(NodeMenu, { props: props });
}

describe('Node Menu Component', () => {
  it('renders, changes data', async () => {
    let component = start(green, '1');
    let node = window.cy.nodes()[0];
    let rfel = component.container.querySelector('#riskFactor')
    expect(rfel.value).toEqual('Works at home')
    fireEvent.change(rfel, {
      target: {value: 'Works in an office'}
    });
    expect(rfel.value).toEqual('Works in an office')

    await waitFor(() => {
      expect(node.data().riskFactor).toEqual('Works in an office');
    });

    let ael = component.container.querySelector('#activities')
    expect(ael.value).toEqual('Hides at home')
    fireEvent.change(ael, {
      target: {value: 'Goes to restaurants'}
    });
    expect(ael.value).toEqual('Goes to restaurants')

    await waitFor(() => {
      expect(node.data().activity).toEqual('Goes to restaurants');
    });
    await waitFor(() => {
      expect(node.classes()).not.toEqual([])
      expect(node.classes()).toStrictEqual([ 'risk-factor-office', 'exposure-risk-4' ])
    })
  });

  it('makes a new connection', async () => {
    let component = start(green, '10');
    let node = cy.nodes().filter(function(n) { return n.data().id == '10' })[0];

    let rfel = component.container.querySelector('#riskFactor')

    fireEvent.change(rfel, {
      target: {value: 'Works in a hospital'}
    });
    expect(rfel.value).toEqual('Works in a hospital')

    await waitFor(() => {
      expect(node.classes()).toStrictEqual([ 'risk-factor-hospital', 'exposure-risk-5' ])
    });

    let otherNode = cy.nodes().filter(function(n) { return n.data().id == '8' })[0]
    await waitFor(() => {
      expect(otherNode.classes()).toStrictEqual([ 'risk-factor-home', 'exposure-risk-1' ])
    });


    let cel = component.container.querySelector('#connectTo')

    fireEvent.change(cel, {
      target: {value: otherNode.data().id}
    });

    let nmccontainer;
    await waitFor(() => {
       nmccontainer = component.container.querySelector('#nodemenuconnections');
       expect(nmccontainer).not.toEqual(null);
    });

    await waitFor(() => {
      expect(cy.collection(node).edgesWith(cy.collection(otherNode))[0]).not.toEqual(null);
    });
    // set connection type to very close
    let ctel = null;
    await waitFor(() => {
      ctel = nmccontainer.querySelector('#connectionType-8');
      expect(ctel).not.toEqual(null);

    });
    fireEvent.change(ctel, {
      target: {value: 'Close as can be'}
    });

    otherNode = cy.nodes().filter(function(n) { return n.data().id == '8' })[0]
    await waitFor(() => {
      expect(otherNode.classes()).toStrictEqual([ 'risk-factor-home', 'exposure-risk-4' ])
    });
  });
});