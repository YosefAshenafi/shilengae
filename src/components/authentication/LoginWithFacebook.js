import React, { useState } from 'react';
import { Stack, Typography, Button } from '@material-ui/core';
import { signInWithPopup, FacebookAuthProvider } from 'firebase/auth';

import { loginWithFacebook } from '../../request/auth';

const provider = new FacebookAuthProvider();
// get email from provider
provider.addScope('email');
// get phone from provider
// provider.addScope('phone');

provider.setCustomParameters({
  display: 'popup'
});

// eslint-disable-next-line react/prop-types
const LoginWithFacebook = ({ auth }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        // console.log('UserCredential');
        // console.log(userCredential._tokenResponse.idToken);
        setIsLoading(true);
        setError('');
        setStatus('');
        loginWithFacebook({ access_token: userCredential._tokenResponse.idToken })
          .then((res) => {
            setIsLoading(false);
            setStatus(res.status);
          })
          .catch((err) => {
            setIsLoading(false);
            setError(err.message);
          });
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <Stack>
      <Stack sx={{ mt: 10, width: '50%' }}>
        <hr />
        <Typography variant="h4" gutterBottom>
          Facebook Login Demo
        </Typography>
      </Stack>
      <Stack
        direction="column"
        alignItems="left"
        justifyContent="space-between"
        style={{ width: '50%' }}
        my={1}
      >
        <Button
          variant="contained"
          disabled={isLoading}
          sx={{ my: 1, mb: 5 }}
          style={{ padding: '10px 20px' }}
          onClick={handleLogin}
        >
          Sign in With Facebook
        </Button>
        <p>{error}</p>
        <p>{status}</p>
        <hr />
      </Stack>
    </Stack>
  );
};

export default LoginWithFacebook;
