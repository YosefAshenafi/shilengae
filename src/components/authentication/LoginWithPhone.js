import React, { useState } from 'react';
import { Stack, TextField, Button, Typography } from '@material-ui/core';

import { loginWithPhone } from '../../request/auth';

const LoginWithPhone = () => {
  const [mobile_number, setMobileNumber] = useState('');
  const [mobile_country_code, setMobileCountryCode] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    loginWithPhone({ mobile_number, mobile_country_code, password })
      .then(() => {
        setIsLoading(false);
        setStatus('Logged in successfully');
        setError('');
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
        setStatus('');
      });
  };

  return (
    <Stack>
      <Stack sx={{ mt: 10, width: '50%' }}>
        <hr />
        <Typography variant="h4" gutterBottom>
          Phone Number Login Demo
        </Typography>
      </Stack>
      <Stack
        direction="column"
        alignItems="left"
        justifyContent="space-between"
        style={{ width: '50%' }}
        my={1}
      >
        <TextField
          label="Mobile Country Code"
          width="50%"
          sx={{ my: 1 }}
          onChange={(e) => setMobileCountryCode(e.target.value)}
        />
        <TextField
          label="Mobile Number"
          width="50%"
          sx={{ my: 1 }}
          onChange={(e) => setMobileNumber(e.target.value)}
        />
        <TextField
          label="Password"
          width="50%"
          sx={{ my: 1 }}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          disabled={isLoading}
          sx={{ my: 1, mb: 5 }}
          style={{ padding: '10px 20px' }}
          onClick={handleLogin}
        >
          Sign in With Phone
        </Button>
        <p>{error}</p>
        <p>{status}</p>
        <hr />
      </Stack>
    </Stack>
  );
};

export default LoginWithPhone;
