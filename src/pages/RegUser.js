// import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import plusFill from '@iconify/icons-eva/plus-fill';
// import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  // Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  CircularProgress
} from '@material-ui/core';
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
import UserDrawer from '../components/user/CreateUser';

import { getRegularUsers, deleteUser } from '../request/user';

//
// import USERLIST from '../_mocks_/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'full_name', label: 'Full Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'last_login', label: 'Last Login', alignRight: false },
  { id: 'country', label: 'Country', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'action', label: 'Action', alignRight: true }
];

// ----------------------------------------------------------------------

export default function User() {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [userList, setUserList] = useState([]);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [loading, setLoading] = useState(true);
  const [timeout, setTimeoutFn] = useState({});

  const [total, setTotal] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const fetchUsers = (url, limit = rowsPerPage, search) => {
    setLoading(true);
    setUserList([]);
    getRegularUsers(url, limit, null, search).then((res) => {
      setTotal(res.count);
      if (Array.isArray(res.results)) {
        setUserList(res.results);
        setNextPage(res.next);
        setPrevPage(res.previous);
        setLoading(false);
      }
    });
  };

  const deleteUserWithRefresh = (userId) => {
    deleteUser(userId).then(() => {
      fetchUsers();
    });
  };

  useEffect(() => {
    fetchUsers(null, rowsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    clearTimeout(timeout);
    const timeoutVar = setTimeout(() => {
      fetchUsers(null, rowsPerPage, filterName);
    }, 2000);
    setTimeoutFn(timeoutVar);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterName]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = userList.map((n) => n.username);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    if (newPage > page && nextPage) {
      fetchUsers(nextPage);
    } else if (newPage < page && prevPage) {
      fetchUsers(prevPage);
    }
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const toggleDrawer = () => {
    setIsOpenFilter(!isOpenFilter);
  };

  const togglePreviewDrawer = (id) => {
    // setPreviewId(id);
    // setPreviewModalOpen(!isPreviewModalOpen);
    navigate(`/dashboard/reg-user/${id}`);
    console.log(id);
  };

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

  const filteredUsers = userList;

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Registered Users | Shilengae">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Registered Users
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 900 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={userList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.map((row) => {
                    const {
                      id,
                      username,
                      first_name,
                      last_name,
                      status,
                      country_name,
                      email,
                      last_login
                    } = row;
                    const isItemSelected = selected.indexOf(username) !== -1;
                    return (
                      <TableRow
                        hover
                        key={id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={isItemSelected}
                            onChange={(event) => handleClick(event, username)}
                          />
                        </TableCell>
                        <TableCell align="left">{`${id}`}</TableCell>
                        <TableCell align="left">{`${first_name} ${last_name}`}</TableCell>
                        <TableCell align="left">{`${email}`}</TableCell>
                        <TableCell align="left">
                          {last_login ? new Date(`${last_login}`).toDateString() : 'NA'}
                        </TableCell>

                        {/* <TableCell align="left">{`${profile.company_name}`}</TableCell> */}
                        <TableCell align="left">
                          {country_name == null ? 'NA' : country_name}
                        </TableCell>
                        <TableCell align="left">
                          <Label
                            variant="ghost"
                            color={(status === 'INACTIVE' && 'error') || 'success'}
                          >
                            {sentenceCase(status)}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <UserMoreMenu
                            deleteItem={() => deleteUserWithRefresh(id)}
                            previewItem={{ togglePreviewDawer: () => togglePreviewDrawer(id) }}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                {isUserNotFound && !loading && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
                {loading && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={10} sx={{ py: 3 }}>
                        <CircularProgress color="success" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[50]}
            component="div"
            count={total}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
        <UserDrawer
          isOpenFilter={isOpenFilter}
          toggleDrawer={toggleDrawer}
          fetchUsers={fetchUsers}
        />
      </Container>
    </Page>
  );
}
