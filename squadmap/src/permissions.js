const sanitizeEmail = function(e) {
  return e.split('.').join('%2E');
};

const unsanitizeEmail = function(e) {
  return e.split('%2E').join('.');
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
  });
}

const writeUserData = function(u) {
  if (!u) { return; }
  firebase.database().ref('users/' + u.uid).set({
    username: u.displayName,
    email: u.email
  });
};

const shareMapWithEmail = function(mapName, email, perm, cb) {
  let updates = {};
  updates['sharing/' + sanitizeEmail(email) + '/' + mapName] = perm;
  updates['sharedmaps/' + mapName + '/permissions/' + sanitizeEmail(email)] = perm;
  firebase.database().ref().update(updates, cb);
};

const perms = ['Read Only', 'Editor', 'Owner', 'Remove'];

const permToEnglish = function(d) {
  if (!d) { return ''; }
  if (d.admin) {
    return 'Owner';
  }
  if (d.write) {
    return 'Editor';
  }
  if (d.read) {
    return 'Read Only';
  }
};

const englishToPerm = function(d) {
  if (d == 'Owner') {
    return {admin: 1, write: 1, read: 1};
  }
  if (d == 'Editor') {
    return {write: 1, read: 1};
  }
  if (d == 'Read Only') {
    return {read: 1};
  }
  if (d == 'Remove') {
    return null;
  }
};

const deleteMap = function(mapName, cb) {
  let updates = {};
  updates['sharing/' + sanitizeEmail(user.email) + '/' + mapName] = null;
  updates['sharedmaps/' + mapName] = null;
  firebase.database().ref().update(updates).then(function(res) {
    cb();
  }).catch(function(err) {
    console.log('caugh', err)
  })
};

const adminOfTooMany = function(sharedMaps) {
  if (!sharedMaps) { return false }
  return Object.values((sharedMaps || {})).filter(function(x) { return x.admin }).length > 4;
};

export default {
  getShared: getShared,
  writeUserData: writeUserData,
  shareMapWithEmail: shareMapWithEmail,
  sanitizeEmail: sanitizeEmail,
  unsanitizeEmail: unsanitizeEmail,
  getSharers: getSharers,
  permToEnglish: permToEnglish,
  perms: perms,
  englishToPerm: englishToPerm,
  deleteMap: deleteMap,
  adminOfTooMany: adminOfTooMany
}