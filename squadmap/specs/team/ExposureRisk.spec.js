import ExposureRisk from '../../src/team/ExposureRisk.js';
import utils from '../utils.js';
import * as yellow from '../fixtures/sampleNodes1.js';
import * as red from '../fixtures/sampleNodes2.js';

const start = function(sample) {
  utils.makeCY(sample);
}

describe('Exposure Risk', () => {
  it('cytoscape hello', () => {
    start(yellow.sample);
    expect(window.cy).not.toBe(null)
  });
  
  it('runs full exposure algorithm for yellow', () => {
    start(yellow.sample);
    ExposureRisk.run();
  
    let result = {
      'Mom + Dad': [ 'risk-factor-home', 'exposure-risk-3' ],
      'Me': [ 'risk-factor-home', 'exposure-risk-3' ],
      'Alice + bf': [ 'risk-factor-office', 'exposure-risk-3' ],
      'Joey and roommate': [ 'risk-factor-hospitality', 'exposure-risk-4' ],
      "Joey's roommate's gf": [ 'risk-factor-hospitality', 'exposure-risk-4' ],
      'Jen': [ 'risk-factor-outdoors', 'exposure-risk-3' ],
    }

    window.cy.nodes().forEach(function(node) {
      expect(node.classes()).toStrictEqual(result[node.data().label]);
    })
  });

  it('runs full exposure algorithm for red', () => {
    start(red.sample);
    ExposureRisk.run();
    
    let result = {
      'Mom + Dad': [ 'risk-factor-home', 'exposure-risk-5' ],
      'Me': [ 'risk-factor-home', 'exposure-risk-5' ],
      'Alice + bf': [ 'risk-factor-office', 'exposure-risk-5' ],
      'Joey and roommate': [ 'risk-factor-hospital', 'exposure-risk-5' ],
      "Joey's roommate's gf": [ 'risk-factor-hospitality', 'exposure-risk-4' ],
      'Jen': [ 'risk-factor-outdoors', 'exposure-risk-5' ],
    }
    window.cy.nodes().forEach(function(node) {
      expect(node.classes()).toStrictEqual(result[node.data().label]);
    })
  });
});

