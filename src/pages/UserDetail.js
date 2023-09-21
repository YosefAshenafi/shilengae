// import { sentenceCase } from 'change-case';
// import { useState } from 'react';
// import { Link as RouterLink, useNavigate } from 'react-router-dom';
// material
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Stack,
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress
} from '@material-ui/core';
import Page from '../components/Page';
import { getCategoryFilterStats } from '../request/category';
import { getUserDetail } from '../request/user';

export default function UserDetail() {
  const [stats, setStats] = useState([]);
  const [user, setUser] = useState({ profile: {} });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    getCategoryFilterStats('main', id).then((res) => {
      setStats(res);
      setLoading(false);
      console.log(res);
    });
    getUserDetail(id).then((res) => {
      console.log(res);
      setUser(res);
    });
  }, [id]);

  return (
    <Page title="User Stat Details | Shilengae">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User Details
          </Typography>
        </Stack>
        <Stack
          direction="column"
          alignItems="left"
          justifyContent="space-between"
          style={{ width: '50%' }}
          my={1}
        >
          <p>Name: {user.profile.company_name || `${user.first_name} ${user.last_name}`}</p>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Phone Number: {`+${user.mobile_country_code}-${user.mobile_number}`}</p>
          <p>Linked to Facebook: {user.firebase_uid ? 'Yes' : 'No'}</p>
          <p>Status: {user.status}</p>
          <p>Last Login: {user.last_login ? Date(user.last_login) : 'Not Available'}</p>
        </Stack>
        <Stack>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="h6">Category Name</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6">Total</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stats.map((stat) => (
                <TableRow key={stat.id}>
                  <TableCell>{stat.name}</TableCell>
                  <TableCell>{stat.total} Clicks</TableCell>
                </TableRow>
              ))}
              {stats.length === 0 && !loading && (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    No stats found
                  </TableCell>
                </TableRow>
              )}
              {loading && (
                <TableRow>
                  <TableCell colSpan={2} align="center">
                    <CircularProgress color="success" />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Stack>
      </Container>
    </Page>
  );
}
