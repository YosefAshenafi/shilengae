import React, { useState } from 'react';
import { Button, TextField, Typography, Stack } from '@material-ui/core';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { regularRegister } from '../../request/auth';

// eslint-disable-next-line react/prop-types
const SignupWithPhone = ({ auth }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setuserData] = useState({
    first_name: 'Aman',
    last_name: 'Teferi',
    country: 1,
    firebase_uid: '',
    business_user: false,
    business_name: '',
    mobile_country_code: '+251',
    mobile_number: '909841416',
    access_token: ''
  });
  const [error, setError] = useState('');

  const [otp, setOtp] = useState('123456');
  const [confirmationResult, setConfirmationResult] = useState(null);

  const handleSendOtp = (e) => {
    e.preventDefault();
    configureRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(
      auth,
      `${userData.mobile_country_code}${userData.mobile_number}`,
      appVerifier
    )
      .then((confirmationResult) => {
        console.log(confirmationResult);
        alert('OTP has been sent');
        // confirmationResult.confirm('123456').then((userCredential) => {
        //   console.log(userCredential);
        // });
        setConfirmationResult(confirmationResult);
        setIsLoading(false);
        setError('');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleVerifyOtp = () => {
    confirmationResult
      .confirm(otp)
      .then((userCredential) => {
        setuserData({ ...userData, access_token: userCredential._tokenResponse.idToken });
        alert('OTP verified.');
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const handleRegister = () => {
    regularRegister(userData)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        // setError(e.);
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
    <Stack
      direction="column"
      alignItems="left"
      justifyContent="space-between"
      style={{ width: '50%' }}
      my={1}
    >
      <TextField
        label="First Name"
        // onChange={(e) => {
        //   // setFormName(e.target.value);
        // }}
        value={userData.first_name}
        width="50%"
        sx={{ my: 1 }}
      />
      <TextField label="Last Name" width="50%" sx={{ my: 1 }} value={userData.last_name} />

      <TextField label="Country" width="50%" sx={{ my: 1 }} value={userData.country} />

      <TextField label="Firebase UID" width="50%" sx={{ my: 1 }} value={userData.firebase_uid} />

      <TextField label="Business User" width="50%" sx={{ my: 1 }} value={userData.business_user} />

      <TextField label="Business Name" width="50%" sx={{ my: 1 }} value={userData.business_name} />

      <Typography my={1} style={{ color: 'red' }}>
        {error}
      </Typography>

      <TextField
        label="Mobile Country Code"
        width="50%"
        sx={{ my: 1 }}
        value={userData.mobile_country_code}
      />

      <TextField label="Mobile Number" width="50%" sx={{ my: 1 }} value={userData.mobile_number} />
      <Button
        variant="contained"
        disabled={isLoading}
        sx={{ my: 1, mb: 5 }}
        style={{ padding: '10px 20px' }}
        onClick={handleSendOtp}
      >
        Send OTP
      </Button>
      <TextField
        label="OTP"
        width="50%"
        sx={{ my: 1 }}
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <Button
        variant="contained"
        disabled={isLoading}
        sx={{ my: 1, mb: 5 }}
        style={{ padding: '10px 20px' }}
        onClick={handleVerifyOtp}
      >
        Verify OTP
      </Button>
      <TextField
        label="Access Token"
        width="50%"
        sx={{ my: 1 }}
        disabled
        value={userData.access_token}
      />
      <Button
        variant="contained"
        disabled={isLoading}
        sx={{ my: 1 }}
        style={{ padding: '10px 20px' }}
        onClick={handleRegister}
      >
        Register
      </Button>
    </Stack>
  );
};

export default SignupWithPhone;
