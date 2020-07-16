
const writeUserData = function() {
  if (!window.user) { return; }
  firebase.database().ref('users/' + window.user.uid).set({
    username: user.displayName,
    email: user.email
  });
}

const loadMap = function(cb) {
  if (!window.user) { return; }
  var mapRef = firebase.database().ref('maps/' + window.user.uid);
  mapRef.on('value', function(snapshot) {
    const json_snapshot = snapshot.val()
    let preloaded = JSON.parse(json_snapshot);
    if (!preloaded) { return; }

    const data = JSON.stringify(cy.json());
    if (json_snapshot != data) {
      cb(preloaded)
    }
  });
};

const saveMap = function(data) {
  firebase.database().ref('maps/' + user.uid).set(data);
};

export default {
  writeUserData: writeUserData,
  saveMap: saveMap,
  loadMap: loadMap
}