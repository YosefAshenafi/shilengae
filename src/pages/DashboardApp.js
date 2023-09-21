import { useEffect, useState } from 'react';
// localization
import { useTranslation } from 'react-i18next';
// material
import { Box, Grid, Container, Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
// import ChooseCountry from '../components/country/ChooseCountry';

// import { chosenCountry } from '../request/country';

import {
  // AppTasks,
  AppNewUsers,
  AppBugReports,
  AppItemOrders,
  // AppNewsUpdate,
  AppWeeklySales
  // AppWebsiteVisits,
  // AppTrafficBySite,
  // AppCurrentSubject,
  // AppConversionRates
} from '../components/_dashboard/app';
import { getStats } from '../request/api';
import MainCategoryStats from '../components/_dashboard/app/MainCategoryStats';

// ----------------------------------------------------------------------

// eslint-disable-next-line react/prop-types
export default function DashboardApp() {
  const { t } = useTranslation();
  const [stats, setStats] = useState({
    num_of_ads: 0,
    num_of_users: 0,
    num_of_active_users: 0,
    num_of_users_signed_up_last_month: 0
  });

  useEffect(() => {
    getStats().then((res) => {
      setStats(res);
    });
  }, []);

  return (
    <Page title="Dashboard | Shilengae">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">{t('Shilenage Dashboard')}</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWeeklySales
              total={stats.num_of_ads}
              tooltipText="Displays total number of active ads"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppNewUsers
              total={stats.num_of_users}
              tooltipText="Displays total number of verified users"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppItemOrders
              total={stats.num_of_users_signed_up_last_month}
              tooltipText="Displays number of new verified users in the current month"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports
              total={stats.num_of_active_users}
              tooltipText="Displays the number of Active users in the app. 
                           Activity indicates that a user has been online within 7 days"
            />
          </Grid>

          <Grid item xs={6} md={3} lg={6}>
            <MainCategoryStats />
          </Grid>

          <Grid item xs={6} md={3} lg={6}>
            <MainCategoryStats type="leaf" />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppConversionRates />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentSubject />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppNewsUpdate />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppOrderTimeline />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppTrafficBySite />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppTasks />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
