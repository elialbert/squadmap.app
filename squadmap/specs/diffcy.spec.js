import diffcy from '../src/diffcy.js';
import utils from './utils.js'
import * as yellow from './fixtures/sampleNodes1.js';

const start = function(sample) {
  utils.makeCY(sample);
}

describe('Data Diffing', () => {
  it('removes everything', () => {
    start(yellow.sample);
    expect(window.cy).not.toBe(null)

    const data = {
      nodes: [], edges: [], weights: {}
    };

    diffcy.runDiff(data);
    expect(window.cy.nodes().length).toEqual(0);
    expect(window.cy.edges().length).toEqual(0);
  });

  it('keeps everything the same', () => {
    start(yellow.sample);
    const data = {
      nodes: diffcy.prepCurrentData(cy.nodes()),
      edges: diffcy.prepCurrentData(cy.edges()),
      weights: {}
    };
    diffcy.runDiff(data);
    expect(window.cy.nodes().length).toEqual(6);
    expect(window.cy.edges().length).toEqual(6);
  });

  it('removes node 1', () => {
    start(yellow.sample);
    let data = {
      nodes: diffcy.prepCurrentData(cy.nodes()),
      edges: diffcy.prepCurrentData(cy.edges()),
      weights: {}
    };
    delete data.nodes['1']
    diffcy.runDiff(data);
    expect(window.cy.nodes().length).toEqual(5);
    expect(window.cy.edges().length).toEqual(4);
  });

  it('removes node 1 and adds some data', () => {
    start(yellow.sample);
    let data = {
      nodes: diffcy.prepCurrentData(cy.nodes()),
      edges: diffcy.prepCurrentData(cy.edges()),
      weights: {}
    };
    delete data.nodes['1']
    data.nodes['44'] = {
      id: '44', label: 'test'
    };
    data.edges['abcd'] = {
      source: '44',
      target: '2'
    }
    diffcy.runDiff(data);
    expect(window.cy.nodes().length).toEqual(6);
    expect(window.cy.edges().length).toEqual(5);
  });
});

