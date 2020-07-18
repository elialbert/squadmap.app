const sanitizeEmail = function(e) {
  return e.replace('.', '%2E');
}

const getShared = function(cb) {
  let ref = firebase.database().ref('sharing/' + sanitizeEmail(window.user.email));
  ref.on('value', function(snapshot) {
    cb(snapshot.val());
  })
};

const getSharers = function(cb) {
  if (window.currentMapName == 'your private map') {
    return [];
  }
  let ref = firebase.database().ref(`sharedmaps/${window.currentMapName}/permissions`);
  ref.once('value', function(snapshot) {
    cb(snapshot.val());
  })
}

const writeUserData = function(u) {
  if (!u) { return; }
  firebase.database().ref('users/' + u.uid).set({
    username: u.displayName,
    email: u.email
  });
};

const shareMapWithEmail = function(mapName, email, cb) {
  let updates = {};
  updates['sharing/' + sanitizeEmail(email) + '/' + mapName] = {read: 1, write: 1};
  updates['sharedmaps/' + mapName + '/permissions/' + sanitizeEmail(email)] = {read: 1, write: 1};
  firebase.database().ref().update(updates, cb);
};

export default {
  getShared: getShared,
  writeUserData: writeUserData,
  shareMapWithEmail: shareMapWithEmail,
  sanitizeEmail: sanitizeEmail,
  getSharers: getSharers
}