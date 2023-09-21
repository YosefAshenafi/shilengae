import { useEffect, useState } from 'react';
// material
import {
  Stack,
  Container,
  Typography,
  Button,
  FormControlLabel,
  Switch,
  TextField,
  Snackbar,
  Alert
} from '@material-ui/core';
import Page from '../components/Page';
import { getAdPreferences, updateAdPreferences } from '../request/ad';
import { updateAppVersion, getAppVersion } from '../request/api';

export default function CreateForm() {
  const [preference, setPreference] = useState({ adExpiryDays: 0, adExpiryEnabled: false });
  const [appVersion, setAppVersion] = useState({
    app_version: 0,
    min_android_version: 0,
    max_android_version: 0,
    min_ios_version: 0,
    max_ios_version: 0
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    getAdPreferences().then((res) => {
      // console.log(res);
      setPreference(res);
    });
    getAppVersion().then((res) => {
      setAppVersion(res);
    });
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
    <Page title="Settings | Shilengae">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Shilengae Settings
          </Typography>
        </Stack>
        <Stack direction="column" alignItems="left" mb={2}>
          <FormControlLabel
            sx={{ mb: 2 }}
            control={
              <Switch
                checked={preference.adExpiryEnabled}
                name="adExpiry"
                onChange={() =>
                  setPreference({ ...preference, adExpiryEnabled: !preference.adExpiryEnabled })
                }
              />
            }
            InputLabelProps={{ shrink: true }}
            label="Enable Ad Expiry"
          />
          <TextField
            sx={{ width: '200px', mb: 4 }}
            label="Ad Expiry Days"
            value={preference.adExpiryDays}
            onChange={(e) => setPreference({ ...preference, adExpiryDays: e.target.value })}
          />
          <Button
            variant="contained"
            sx={{ width: '120px', mb: 4 }}
            onClick={() => {
              updateAdPreferences(preference).then(() => {
                setOpen(true);
              });
            }}
          >
            Update
          </Button>
          <FormControlLabel
            sx={{ mb: 2 }}
            control={
              <Switch
                checked={appVersion.force_update}
                name="forceUpdate"
                onChange={() =>
                  setAppVersion({ ...appVersion, force_update: !appVersion.force_update })
                }
              />
            }
            InputLabelProps={{ shrink: true }}
            label="Force Update App"
          />
          <TextField
            sx={{ width: '200px', mb: 2 }}
            label="Legacy App Version"
            value={appVersion.app_version}
            onChange={(e) => setAppVersion({ ...appVersion, app_version: e.target.value })}
          />
          <TextField
            sx={{ width: '200px', mb: 2 }}
            label="Minimum Android Version"
            value={appVersion.min_android_version}
            onChange={(e) => setAppVersion({ ...appVersion, min_android_version: e.target.value })}
          />
          <TextField
            sx={{ width: '200px', mb: 2 }}
            label="Maximum Android Version"
            value={appVersion.max_android_version}
            onChange={(e) => setAppVersion({ ...appVersion, max_android_version: e.target.value })}
          />

          <TextField
            sx={{ width: '200px', mb: 2 }}
            label="Minimum iOS Version"
            value={appVersion.min_ios_version}
            onChange={(e) => setAppVersion({ ...appVersion, min_ios_version: e.target.value })}
          />
          <TextField
            sx={{ width: '200px', mb: 2 }}
            label="Maximum iOS Version"
            value={appVersion.max_ios_version}
            onChange={(e) => setAppVersion({ ...appVersion, max_ios_version: e.target.value })}
          />
          <Button
            variant="contained"
            sx={{ width: '120px', mb: 4 }}
            onClick={() => {
              updateAppVersion(appVersion).then(() => {
                setOpen(true);
              });
            }}
          >
            Update
          </Button>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              You have updated Shilengae Ad Settings
            </Alert>
          </Snackbar>
        </Stack>
      </Container>
    </Page>
  );
}
