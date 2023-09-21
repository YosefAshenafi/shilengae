import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
// material
import {
  Card,
  Table,
  Stack,
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
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar } from '../components/_dashboard/user';
import { AdPreview } from '../components/form-fields/PreviewCategoryModal';
import { CreateAdModal } from '../components/form-fields/CreateAd';
import { EditAdModal } from '../components/form-fields/EditAd';
//
// import USERLIST from '../_mocks_/user';
import { batchDeleteAd, getReportedAds } from '../request/ad';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'ad', label: 'Ad', alignRight: false },
  { id: 'report_category', label: 'Report Type', alignRight: false },
  { id: 'description', label: 'Report Description', alignRight: false },
  { id: 'user', label: 'Reporter', alignRight: false },
  { id: 'preview', label: '', alignRight: false }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function Ad() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [adsList, setAdsList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [previewId, setPreviewId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const [total, setTotal] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const fetchAds = (url, limit = rowsPerPage) => {
    setLoading(true);
    setAdsList([]);
    getReportedAds(url, limit).then((res) => {
      setTotal(res.count);
      if (Array.isArray(res.results)) {
        setAdsList(res.results);
        setNextPage(res.next);
        setPrevPage(res.previous);
        setLoading(false);
      }
    });
  };

  const batchDeleteWithRefresh = () => {
    batchDeleteAd(selected).then(() => {
      setSelected([]);
      fetchAds();
    });
  };

  useEffect(() => {
    fetchAds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = adsList.map((n) => n.id);
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
      fetchAds(nextPage);
    } else if (newPage < page && prevPage) {
      fetchAds(prevPage);
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

  const togglePreviewDialog = (row) => {
    setPreviewId(row);
    setPreviewOpen(!previewOpen);
  };

  const toggleEditDialog = (row) => {
    setEditId(row);
    setEditOpen(!editOpen);
  };

  const toggleCreateDialog = () => {
    setCreateOpen(!createOpen);
  };

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - adsList.length) : 0;

  const filteredUsers = applySortFilter(adsList, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Reported Ads | Shilengae">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Reported Ads
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            deletebatch={batchDeleteWithRefresh}
            searchVisible={false}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={adsList.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.map((row) => {
                    const { id, ad, description, report_category, user } = row;

                    const isItemSelected = selected.indexOf(id) !== -1;

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
                            onChange={(event) => handleClick(event, id)}
                          />
                        </TableCell>
                        <TableCell align="left">{id}</TableCell>
                        <TableCell align="left">{ad}</TableCell>
                        <TableCell align="left">{report_category}</TableCell>
                        <TableCell align="left">{description}</TableCell>
                        <TableCell align="left">{user.first_name}</TableCell>
                        {/* <TableCell align="left">
                          <Button
                            onClick={() => {
                              togglePreviewDialog(row);
                            }}
                          >
                            Preview
                          </Button>
                        </TableCell> */}
                        {/* <TableCell align="right">
                          <UserMoreMenu
                            toggleEditDrawer={() => {
                              toggleEditDialog(row);
                            }}
                            deleteItem={() => {
                              deleteAdWithRefresh(id);
                            }}
                            editForm
                          />
                        </TableCell> */}
                      </TableRow>
                    );
                  })}
                  {/* {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )} */}
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
        {previewOpen && (
          <AdPreview
            ad={previewId}
            toggleDialog={togglePreviewDialog}
            isPreviewOpen={previewOpen}
          />
        )}
        {editOpen && (
          <EditAdModal
            ad={editId}
            toggleDialog={toggleEditDialog}
            isEditOpen={editOpen}
            refetchAds={fetchAds}
          />
        )}
        {createOpen && (
          <CreateAdModal
            toggleDialog={toggleCreateDialog}
            isPreviewOpen={createOpen}
            refetchAds={fetchAds}
          />
        )}
      </Container>
    </Page>
  );
}
