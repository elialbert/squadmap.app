import { sample } from './team/Team.js'
import diffcy from './diffcy.js'

const prepData = function() {
  let d = {nodes: {}, edges: {}, weights: cy.data('weights') || {}};
  cy.nodes().forEach(function(node) {
    d.nodes[node.data().id] = node.data();
  });
  cy.edges().forEach(function(edge) {
    d.edges[edge.data().id] = edge.data();
  });
  return d;
};

// take in storage object, return cy object
const unprepData = function(data) {
  // handle old format
  if (data.elements) { return data; }
  return {
    elements: {
      nodes: Object.values(data.nodes).map(x => { return {"data": x} }),
      edges: Object.values(data.edges).map(x => { return {"data": x} })
    },
    weights: data.weights
  };
};

const saveMap = function(data) {
  firebase.database().ref('maps/' + user.uid).set(data);
};

const save = function() {
  const data = prepData();
  window.localStorage.setItem('cyjson', JSON.stringify(data));
  if (window.user) {
    saveMap(data);
  }
}

const writeUserData = function() {
  if (!window.user) { return; }
  firebase.database().ref('users/' + window.user.uid).set({
    username: user.displayName,
    email: user.email
  });
};

const loadLocal = function() {
  let data = JSON.parse( window.localStorage.getItem("cyjson") );
  if (!data) {
    data = {elements: sample}
  } else {
    data = unprepData(data);
  }
  return data;
}

window.fbRefs = [];

const loadMap = function(initCb) {
  if (!window.user) { return; }

  // unload any previous
  window.fbRefs.forEach(function(fbRef) { fbRef.off(); });
  var mapRef = firebase.database().ref('maps/' + window.user.uid);
  mapRef.once('value', function(snapshot) {
    const d = snapshot.val()
    if (!d) {
      console.log('falling back to local for now')
      return initCb(loadLocal())
    } else {
      let data = unprepData(d)
      initCb(data);
      window.fbRefs.push(diffcy.setWatchers());
    }
  });
};

const reset = function() {
  localStorage.removeItem('cyjson');
  if (window.user) {
    firebase.database().ref('maps/' + user.uid).set(null);
  }
  location.reload();
};

export default {
  writeUserData: writeUserData,
  saveMap: saveMap,
  save: save,
  loadMap: loadMap,
  loadLocal: loadLocal,
  reset: reset
}