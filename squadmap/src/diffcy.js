import ExposureRisk from './team/ExposureRisk.js';
const weightEvent = new Event('updateWeights');

const setWatchers = function() {
  let weights = firebase.database().ref('maps/' + window.user.uid + '/weights')

  weights.on('value', function(snapshot) {
    cy.data('weights', snapshot.val());
    ExposureRisk.run();
    document.dispatchEvent(weightEvent);
  });
};

export default {
  setWatchers: setWatchers
}