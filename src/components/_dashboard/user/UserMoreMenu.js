/* eslint-disable react/prop-types */
import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import editFill from '@iconify/icons-eva/edit-fill';
// import { Link as RouterLink } from 'react-router-dom';
import trash2Outline from '@iconify/icons-eva/trash-2-outline';
import eyeFill from '@iconify/icons-eva/eye-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import {
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@material-ui/core';

// ----------------------------------------------------------------------

// eslint-disable-next-line react/prop-types
export default function UserMoreMenu({
  toggleEditDrawer,
  deleteItem,
  previewItem,
  editEnabled = true
}) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' }
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText
            primary="Delete"
            primaryTypographyProps={{ variant: 'body2' }}
            onClick={() => {
              setIsDeleteOpen(true);
            }}
          />
        </MenuItem>
        {editEnabled && (
          <MenuItem sx={{ color: 'text.secondary' }}>
            <ListItemIcon>
              <Icon icon={editFill} width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="Edit"
              primaryTypographyProps={{ variant: 'body2' }}
              onClick={() => {
                if (toggleEditDrawer) {
                  toggleEditDrawer();
                  setIsOpen(false);
                }
              }}
            />
          </MenuItem>
        )}
        {previewItem && (
          <MenuItem sx={{ color: 'text.secondary' }}>
            <ListItemIcon>
              <Icon icon={eyeFill} width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="Preview"
              primaryTypographyProps={{ variant: 'body2' }}
              onClick={() => {
                // eslint-disable-next-line react/prop-types
                previewItem.togglePreviewDawer();
                setIsOpen(false);
              }}
            />
          </MenuItem>
        )}
      </Menu>
      {isDeleteOpen && (
        <AlertDialog
          open={isDeleteOpen}
          handleSubmit={deleteItem}
          handleClose={() => {
            setIsOpen(false);
            setIsDeleteOpen(false);
          }}
        />
      )}
    </>
  );
}

// eslint-disable-next-line react/prop-types
export const AlertDialog = ({ open, handleClose, handleSubmit }) => (
  <div>
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this item?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>No</Button>
        <Button onClick={handleSubmit} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);
