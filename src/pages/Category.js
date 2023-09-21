/* eslint-disable react/prop-types */
import { filter } from 'lodash';
// import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
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
  CircularProgress
} from '@material-ui/core';
import { TreeView, TreeItem } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

// import {  } from "@material-ui/icons-";
// components
import Page from '../components/Page';
// import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
import CategoryDrawer from '../components/category/CreateCategory';
import EditCategoryDrawer from '../components/category/EditCategory';
//
// import USERLIST from '../_mocks_/user';
import { getAllCategories, deleteCategory, getCategoryByLevel } from '../request/category';
import { CategoryPreview } from '../components/form-fields/PreviewCategoryModal';
import { AlertDialog } from '../components/_dashboard/user/UserMoreMenu';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'id', label: 'Id', alignRight: false },
  { id: 'name', label: 'Category Name', alignRight: false },
  { id: 'parent_category_name', label: 'Parent Category', alignRight: false },
  { id: 'form_name', label: 'Form', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'created_at', label: 'Date', alignRight: false }
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

export default function Museum() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [treeViewEnabled, setTreeViewEnabled] = useState(true);
  const [categoriesList, setCategoriesList] = useState([]);
  const [categoriesTree, setCategoriesTree] = useState(false);
  const [expanded, setExpanded] = useState([]);
  const [editId, setEditId] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [previewId, setPreviewId] = useState(null);
  const [previewName, setPreviewName] = useState(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [total, setTotal] = useState(0);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  useEffect(() => {
    fetchCategories();
    getCategoryByLevel().then((res) => {
      generateTree(res.results);
      // setCategoriesTree({ ...categoriesTree, descendants: res.results });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchCategories = (url, limit = rowsPerPage) => {
    setLoading(true);
    getAllCategories(url, limit).then((res) => {
      setTotal(res.count);
      if (Array.isArray(res.results)) {
        setCategoriesList(res.results);
        setNextPage(res.next);
        setPrevPage(res.previous);
        setLoading(false);
      }
    });
    getCategoryByLevel().then((res) => {
      generateTree(res.results);
    });
  };

  const generateTree = (allCategoriesList) => {
    const tree = {
      '-1': {
        id: -1,
        name: 'Expand here',
        children: []
      }
    };
    allCategoriesList.forEach((category) => {
      // console.log(category);

      if (tree[category.id]) {
        tree[category.id].name = category.name;
        tree[category.id].id = category.id;
      } else {
        tree[category.id] = {
          id: category.id,
          name: category.name,
          children: []
        };
      }

      if (category.parent_category_id === null) {
        tree['-1'].children.push(category);
      } else if (tree[category.parent_category_id]) {
        tree[category.parent_category_id].children.push(category);
      } else {
        tree[category.parent_category_id] = {
          id: category.parent_category_id,
          name: '',
          children: [category]
        };
      }
    });
    const root = tree['-1'].children[0];
    tree['-1'].children = tree[root.id].children;
    tree['-1'].id = tree[root.id].id;
    tree['-1'].name = tree[root.id].name;
    setCategoriesTree(tree);
    setLoading(false);
  };

  const deleteCategoryWithRefresh = (categoryId) => {
    deleteCategory(categoryId).then(() => {
      fetchCategories();
    });
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = categoriesList.map((n) => n.name);
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
      fetchCategories(nextPage);
    } else if (newPage < page && prevPage) {
      fetchCategories(prevPage);
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

  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - categoriesList.length) : 0;

  const filteredCategories = applySortFilter(
    categoriesList,
    getComparator(order, orderBy),
    filterName
  );

  const isUserNotFound = filteredCategories.length === 0;

  const toggleDrawer = () => {
    setIsOpenFilter(!isOpenFilter);
  };

  const toggleTreeViewer = () => {
    setTreeViewEnabled(!treeViewEnabled);
  };

  const toggleExpandElement = (id) => {
    const newExpanded = expanded;
    if (newExpanded.includes(id)) {
      newExpanded.splice(newExpanded.indexOf(id), 1);
    } else {
      newExpanded.push(id);
    }
    // console.log(newExpanded);
    setExpanded(newExpanded);
  };

  const toggleEditDrawer = (id) => {
    setEditId(id);
    setIsEditModalOpen(!isEditModalOpen);
  };

  const togglePreviewDialog = (id) => {
    setPreviewId(id);
    setPreviewOpen(!previewOpen);
  };

  const renderTree = (treeNode) => {
    console.log();
    return (
      <TreeItem
        key={`${treeNode.id}`}
        nodeId={`${treeNode.id}`}
        label={treeNode.name}
        sx={{ fontSize: '40px' }}
      >
        {Array.isArray(treeNode.children)
          ? treeNode.children.map((child) => renderTree(categoriesTree[child.id]))
          : 'Invalid Data'}
      </TreeItem>
    );
  };

  // console.log(categoriesTree);

  const Row = ({ row }) => {
    const { id, name, parent_category_name, status, form_name, created_at } = row;
    const isItemSelected = selected.indexOf(id) !== -1;

    return (
      <>
        <TableRow
          hover
          key={id}
          tabIndex={-1}
          role="checkbox"
          selected={isItemSelected}
          aria-checked={isItemSelected}
        >
          <TableCell padding="checkbox">
            <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, id)} />
          </TableCell>
          <TableCell align="left">{id}</TableCell>
          <TableCell align="left">{name}</TableCell>
          <TableCell align="left">{parent_category_name}</TableCell>
          <TableCell align="left">{form_name}</TableCell>
          <TableCell align="left">{status}</TableCell>
          <TableCell align="left">{new Date(`${created_at}`).toDateString()}</TableCell>
          <TableCell align="left">
            <Button
              onClick={() => {
                togglePreviewDialog(id);
              }}
            >
              Preview
            </Button>
          </TableCell>
          <TableCell align="right">
            <UserMoreMenu
              toggleEditDrawer={() => {
                toggleEditDrawer(id);
              }}
              deleteItem={() => {
                deleteCategoryWithRefresh(id);
              }}
            />
          </TableCell>
        </TableRow>
      </>
    );
  };

  const ListView = () => (
    <Card>
      <UserListToolbar
        numSelected={selected.length}
        filterName={filterName}
        onFilterName={handleFilterByName}
      />

      <Scrollbar>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              rowCount={categoriesList.length}
              numSelected={selected.length}
              onRequestSort={handleRequestSort}
              onSelectAllClick={handleSelectAllClick}
            />
            <TableBody>
              {filteredCategories.map((row) => (
                <Row row={row} key={row.id} />
              ))}
            </TableBody>
            {isUserNotFound && (
              <TableBody>
                <TableRow>
                  <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                    <SearchNotFound searchQuery={filterName} />
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
  );

  const RenderTreeView = () => (
    <>
      {previewName && (
        <>
          <Typography variant="p" gutterBottom sx={{ mr: 10, fontSize: '1.1rem' }}>
            Selected - {previewName}
          </Typography>

          <Button
            onClick={() => {
              togglePreviewDialog(previewId);
            }}
          >
            Preview
          </Button>
          <Button
            onClick={() => {
              toggleEditDrawer(previewId);
            }}
          >
            Edit
          </Button>
          <Button onClick={() => setIsDeleteOpen(true)}>Delete</Button>
          <Button onClick={toggleDrawer}>Add Subcategory</Button>
          {isDeleteOpen && (
            <AlertDialog
              open={isDeleteOpen}
              handleSubmit={() => {
                deleteCategoryWithRefresh(previewId);
                setIsDeleteOpen(false);
              }}
              handleClose={() => {
                setIsDeleteOpen(false);
              }}
            />
          )}
        </>
      )}

      <TreeView
        aria-label="file system navigator"
        sx={{ flexGrow: 1, maxWidth: 400, overflowY: 'auto', mt: 2 }}
        defaultExpanded={expanded.map((id) => `${id}`)}
        defaultExpandIcon={<ChevronRightIcon />}
        defaultCollapseIcon={<ExpandMoreIcon />}
        onNodeSelect={(event, nodeId) => {
          if (nodeId !== -1) {
            setPreviewName(event.target.textContent);
            toggleExpandElement(nodeId);
            setPreviewId(nodeId);
          }
        }}
      >
        {categoriesTree && renderTree(categoriesTree['-1'])}
      </TreeView>
    </>
  );

  return (
    <Page title="Category | Shilengae">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Category
          </Typography>
          <Button variant="contained" to="" onClick={toggleTreeViewer} disabled={!categoriesTree}>
            Change to {!treeViewEnabled ? 'Tree' : 'List'} View
          </Button>
          {/* <Button
            variant="contained"
            component={RouterLink}
            to=""
            startIcon={<Icon icon={plusFill} />}
            onClick={toggleDrawer}
          >
            New Category
          </Button> */}
        </Stack>

        {!treeViewEnabled && <ListView />}
        {treeViewEnabled && <RenderTreeView />}
        {loading && <CircularProgress color="success" />}

        <CategoryDrawer
          isOpenFilter={isOpenFilter}
          toggleDrawer={toggleDrawer}
          fetchCategories={fetchCategories}
          parent={previewId}
          parentName={previewName}
        />
        {isEditModalOpen && (
          <EditCategoryDrawer
            categoryId={editId}
            isOpenFilter={isEditModalOpen}
            toggleDrawer={toggleEditDrawer}
            refetchCategories={fetchCategories}
          />
        )}
        {previewOpen && (
          <CategoryPreview
            categoryId={previewId}
            toggleDialog={togglePreviewDialog}
            isPreviewOpen={previewOpen}
          />
        )}
      </Container>
    </Page>
  );
}
