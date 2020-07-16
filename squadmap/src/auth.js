const startAuth = function() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
};

const continueAuth = function(cb) {
  firebase.auth().getRedirectResult().then(cb).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    console.log('err', errorCode, errorMessage, email, credential)
    // ...
  });
};

const signOut = function() {
  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
};

const checkSignin = function(cb) {
  return firebase.auth().onAuthStateChanged(cb)
}

export default {
  startAuth: startAuth,
  continueAuth: continueAuth,
  checkSignin: checkSignin,
  signOut: signOut
}