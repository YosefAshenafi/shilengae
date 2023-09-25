// import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// material
import { Button, Container, Stack, Typography } from '@material-ui/core';

// components
import Page from '../components/Page';
import ChooseCountry from '../components/country/ChooseCountry';

// requests
import { chosenCountry } from '../request/country';

export default function CreateForm() {
  const navigate = useNavigate();
  const [operatingCountry, setOperatingCountry] = useState('');
  useEffect(() => {
    chosenCountry().then((country) => {
      setOperatingCountry(country.id);
    });
  }, [operatingCountry]);
  console.log();
  console.log("No country");
  return (
    <Page title="Create Form | Shilengae">
      <Container>
        <Stack
          placeholder="Country"
          direction="column"
          alignItems="center"
          justifyContent="space-between"
          mt={10}
        >
          <Typography variant="h4" gutterBottom>
            Select Operating Country
          </Typography>
          <ChooseCountry operating_country={operatingCountry} />
          <Button
            onClick={() => navigate('/dashboard', { replace: true })}
            variant="contained"
            disabled={operatingCountry === '' || operatingCountry === undefined}
          >
            Go to Dashboard
          </Button>
        </Stack>
      </Container>
    </Page>
    // <>
    //   <p>test</p>
    // </>
  );
}
