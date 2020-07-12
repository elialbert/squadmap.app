import ExposureRisk from '../../src/team/ExposureRisk.js';
import utils from '../utils.js';
import * as yellow from '../fixtures/sampleNodes1.js';
import * as red from '../fixtures/sampleNodes2.js';
import * as green from '../fixtures/sampleNodes3.js';
import * as red2 from '../fixtures/sampleNodes4.js';

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

  it('runs full exposure algorithm for green', () => {
    start(green.sample);
    ExposureRisk.run();

    let result = {
      'Mom + Dad': [ 'risk-factor-home', 'exposure-risk-1' ],
      'Me': [ 'risk-factor-home', 'exposure-risk-1' ],
      'Alice + bf': [ 'risk-factor-home', 'exposure-risk-1' ],
      'Joey and roommate': [ 'risk-factor-home', 'exposure-risk-1' ],
      "Joey's roommate's gf": [ 'risk-factor-home', 'exposure-risk-1' ],
      'Jen': [ 'risk-factor-outdoors', 'exposure-risk-2' ],
    }
    window.cy.nodes().forEach(function(node) {
      expect(node.classes()).toStrictEqual(result[node.data().label]);
    })
  });

  it('runs full exposure algorithm for green modified by activity', () => {
    start(red2.sample);
    ExposureRisk.run();

    let result = {
      'Mom + Dad': [ 'risk-factor-home', 'exposure-risk-5' ],
      'Me': [ 'risk-factor-home', 'exposure-risk-5' ],
      'Alice + bf': [ 'risk-factor-home', 'exposure-risk-5' ],
      'Joey and roommate': [ 'risk-factor-home', 'exposure-risk-3' ],
      "Joey's roommate's gf": [ 'risk-factor-home', 'exposure-risk-1' ],
      'Jen': [ 'risk-factor-outdoors', 'exposure-risk-5' ],
    }
    window.cy.nodes().forEach(function(node) {
      expect(node.classes()).toStrictEqual(result[node.data().label]);
    })
  });
});

