import { Icon } from '@iconify/react';
// import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import {
  Card,
  Table,
  Stack,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Collapse,
  CircularProgress
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
// components
import Page from '../components/Page';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
import { AdPreview } from '../components/form-fields/PreviewCategoryModal';
import { CreateAdModal } from '../components/form-fields/CreateAd';
import { EditAdModal } from '../components/form-fields/EditAd';
import { Filter } from '../components/ad/filter';
//
// import USERLIST from '../_mocks_/user';
import { getAllAds, filterAds, deleteAd, batchDeleteAd } from '../request/ad';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'category', label: 'Category', alignRight: false },
  { id: 'user', label: 'User', alignRight: false },
  { id: 'type', label: 'Type', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'adExpiry', label: 'Expiry Date', alignRight: false },
  { id: 'created_at', label: 'Created at', alignRight: false }
];

// ----------------------------------------------------------------------

export default function Ad() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [adsList, setAdsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeout, setTimeoutFn] = useState({});

  const [filters, setFilters] = useState({});
  const [filterCategory, setFilterCategory] = useState(null);

  const [previewId, setPreviewId] = useState(null);
  const [editId, setEditId] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);

  const [total, setTotal] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  const navigate = useNavigate();

  const fetchAds = (url, limit = rowsPerPage, search) => {
    setLoading(true);
    setAdsList([]);
    getAllAds(url, limit, null, search).then((res) => {
      setTotal(res.count);
      if (Array.isArray(res.results)) {
        setAdsList(res.results);
        setNextPage(res.next);
        setPrevPage(res.previous);
        setLoading(false);
      }
    });
  };

  // eslint-disable-next-line no-unused-vars
  const filterAdFunction = (url, limit = rowsPerPage) => {
    setLoading(true);
    const filterList = Object.keys(filters)
      .map((key) => ({ form_field: key, ...filters[key] }))
      .filter((obj) => obj.search_term !== '' && obj.gt !== '' && obj.lt !== '');

    const obj = { filters: filterList };
    if (filterCategory) {
      obj.category = filterCategory;
    }

    filterAds(obj).then((res) => {
      setLoading(false);
      setTotal(res.count);
      if (Array.isArray(res.results)) {
        setAdsList(res.results);
        setNextPage(res.next);
        setPrevPage(res.previous);
      }
    });
  };

  const deleteAdWithRefresh = (adId) => {
    deleteAd(adId).then(() => {
      fetchAds();
    });
  };

  const batchDeleteWithRefresh = () => {
    batchDeleteAd(selected).then(() => {
      setSelected([]);
      fetchAds();
    });
  };

  useEffect(() => {
    fetchAds(null, rowsPerPage, filterName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    clearTimeout(timeout);
    const timeoutVar = setTimeout(() => {
      fetchAds(null, rowsPerPage, filterName);
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

  const filteredUsers = adsList;

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Ads | Shilengae">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Ads
          </Typography>
          <Stack direction="row" spacing={10}>
            <Button
              variant="contained"
              // startIcon={<Icon icon={plusFill} />}
              onClick={() => navigate('/dashboard/reported')}
            >
              Reported Ads
            </Button>
            <Button
              variant="contained"
              startIcon={<Icon icon={plusFill} />}
              onClick={toggleCreateDialog}
            >
              New Ad
            </Button>
          </Stack>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
            setFilter={setFilterOpen}
            filter={filterOpen}
            deletebatch={batchDeleteWithRefresh}
          />

          <Collapse in={filterOpen}>
            <Filter
              setAdsList={setAdsList}
              filters={filters}
              setFilters={setFilters}
              filterAds={filterAdFunction}
              setFilterCategory={setFilterCategory}
            />
          </Collapse>

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
                    const { id, category, user, type, status, adExpiry, created_at } = row;
                    const { name } = category;
                    const { id: u_id } = user;
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
                        <TableCell align="left">{name}</TableCell>
                        <TableCell align="left">{u_id}</TableCell>
                        <TableCell align="left">{type}</TableCell>
                        <TableCell align="left">{status}</TableCell>
                        <TableCell align="left">{new Date(`${adExpiry}`).toDateString()}</TableCell>
                        <TableCell align="left">
                          {new Date(`${created_at}`).toDateString()}
                        </TableCell>
                        <TableCell align="left">
                          <Button
                            onClick={() => {
                              togglePreviewDialog(row);
                            }}
                          >
                            Preview
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <UserMoreMenu
                            toggleEditDrawer={() => {
                              toggleEditDialog(row);
                            }}
                            deleteItem={() => {
                              deleteAdWithRefresh(id);
                            }}
                            editForm
                          />
                        </TableCell>
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
