// import { sentenceCase } from 'change-case';
import React from 'react';
// material
import { Stack, Container, Typography } from '@material-ui/core';

import {
  getAuth,
  // signInWithEmailAndPassword,
  // signInWithPopup,
  FacebookAuthProvider
} from 'firebase/auth';

// components
import Page from '../components/Page';
import SignupWithFacebook from '../components/authentication/SignupWithFacebook';
import SignupWithPhone from '../components/authentication/SignupWithPhone';
import LoginWithPhone from '../components/authentication/LoginWithPhone';
import LoginWithFacebook from '../components/authentication/LoginWithFacebook';

// eslint-disable-next-line no-unused-vars
import firebase from '../utils/firebase';

const auth = getAuth();
const provider = new FacebookAuthProvider();
// get email from provider
provider.addScope('email');
// get phone from provider
// provider.addScope('phone');

provider.setCustomParameters({
  display: 'popup'
});

export default function CreateForm() {
  return (
    <Page title="Create Form | Shilengae">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mt={10}>
          <Typography variant="h4" gutterBottom>
            Authentication Flow
          </Typography>
        </Stack>
        <SignupWithPhone auth={auth} />
        <LoginWithPhone auth={auth} />
        <LoginWithFacebook auth={auth} />
        <SignupWithFacebook auth={auth} />
      </Container>
      <div id="recaptcha-container" />
    </Page>
  );
}

// a little function to help us with reordering the result
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
