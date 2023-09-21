import React, { useState } from 'react';
import { Typography } from '@material-ui/core';

import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithPhoneNumber,
  FacebookAuthProvider,
  RecaptchaVerifier
} from 'firebase/auth';

// // eslint-disable-next-line no-unused-vars
// import firebase from '../utils/firebase';

const auth = getAuth();
const provider = new FacebookAuthProvider();
// get email from provider
provider.addScope('email');
// get phone from provider
// provider.addScope('phone');

provider.setCustomParameters({
  display: 'popup'
});

const FirebaseTest = () => {
  const [cred, setCred] = useState({ email: 'aman.teferi.80@gmail.com', password: '123456' });
  console.log(auth);
  const handleSubmit = () => {
    signInWithEmailAndPassword(auth, cred.email, cred.password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSubmitWithFacebook = () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleSubmitWithPhone = (e) => {
    e.preventDefault();
    configureRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(auth, '+251909841416', appVerifier)
      .then((confirmationResult) => {
        console.log(confirmationResult);
        confirmationResult.confirm('123456').then((userCredential) => {
          console.log(userCredential);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const configureRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      'recaptcha-container',
      {
        size: 'invisible',
        callback: (response) => {
          console.log(response);
        }
      },
      auth
    );
  };

  return (
    <div style={{ position: 'absolute', left: '200px' }}>
      <Typography>Firebase Test</Typography>
      <input
        type="text"
        value={cred.email}
        onChange={(e) => setCred({ ...cred, email: e.target.value })}
      />
      <input
        type="text"
        value={cred.password}
        onChange={(e) => setCred({ ...cred, password: e.target.value })}
      />
      <button type="submit" onClick={handleSubmit}>
        Signin
      </button>
      <br />
      <button type="submit" onClick={handleSubmitWithFacebook}>
        Signin With Facebook
      </button>
      <br />
      <button type="submit" onClick={handleSubmitWithPhone}>
        Signin with Phone Number
      </button>
      <div id="recaptcha-container" />
    </div>
  );
};

export default FirebaseTest;
