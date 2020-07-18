import { sample } from './team/Team.js'
import diffcy from './diffcy.js'
import permissions from './permissions.js'

const mapPath = function() {
  if (window.currentMapName == 'your private map') {
    return `maps/${user.uid}`;
  } else {
    return `sharedmaps/${window.currentMapName}/data`;
  }
}

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
  firebase.database().ref(mapPath()).set(data);
};

const save = function() {
  if (cy.data('readOnly')) { return; }
  const data = prepData();
  window.localStorage.setItem('cyjson', JSON.stringify(data));
  if (window.user) {
    saveMap(data);
  }
}

const writeUserData = function() {
  if (!window.user) { return; }
  return permissions.writeUserData(window.user);
}

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
  window.fbRefs.forEach(function(fbRef) {
    fbRef.off();
  });
  window.fbRefs = [];
  var mapRef = firebase.database().ref(mapPath());
  mapRef.once('value', function(snapshot) {
    const d = snapshot.val()
    if (!d) {
      return initCb(loadLocal())
    } else {
      let data = unprepData(d)
      initCb(data);
      window.fbRefs.push(diffcy.setWatchers(mapPath()));
    }
  }, function(err) {
    console.log(err)
  });
};

const reset = function() {
  localStorage.removeItem('cyjson');
  if (window.user) {
    firebase.database().ref(mapPath()).set(null);
  }
  location.reload();
};

const copyMapToShared = function(newName, cb, errCb) {
  let updates = {};

  let testNew = firebase.database().ref(`sharedmaps/${newName}`);
  console.log('going to copy', testNew)
  testNew.once('value', function(snapshot) {
    console.log('already exists', snapshot.val())
    errCb();
    // the map already exists for the user
  }, function() {
    console.log('in new')
    // the map is brand new at least for that uesr
    updates[`sharedmaps/${newName}/data`] = prepData();
    updates[`sharedmaps/${newName}/permissions`] = {}
    updates[`sharedmaps/${newName}/permissions`][`${permissions.sanitizeEmail(user.email)}`] = {read: 1, write: 1, admin: 1};

    console.log('scopy updates', updates)
    firebase.database().ref().update(updates).then(function(res) {
      updates = {};
      updates['sharing/' + permissions.sanitizeEmail(user.email) + '/' + newName] = {read: 1, write: 1, admin: 1};
      firebase.database().ref().update(updates, function(res2) {
        cb();
      })
    }).catch(function(err) {
      // the map exists for another user
      console.log('caught err', err)
      errCb(err);
    });
  });
};

export default {
  writeUserData: writeUserData,
  saveMap: saveMap,
  save: save,
  loadMap: loadMap,
  loadLocal: loadLocal,
  reset: reset,
  copyMapToShared: copyMapToShared
}