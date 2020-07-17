const sanitizeEmail = function(e) {
  return e.replace('.', '%2E');
}

const getShared = function() {
  let ref = firebase.database().ref('sharing/' + sanitizeEmail(window.user.email));
  ref.on('value', function(snapshot) {
    const shared = snapshot.val();
    console.log('got shared', shared)
  })
};

const writeUserData = function(u) {
  if (!u) { return; }
  firebase.database().ref('users/' + u.uid).set({
    username: u.displayName,
    email: u.email
  });
};

const doShare = function(mapName, email) {
  let updates = {};
  updates['sharing/' + sanitizeEmail(email) + '/' + mapName] = 1;
  updates['sharedmaps/' + mapName + '/permissions/' + sanitizeEmail(email)] = {read: 1, write: 1};
  let ref = firebase.database().ref().update(updates);
};

export default {
  getShared: getShared,
  writeUserData: writeUserData,
  doShare: doShare
}