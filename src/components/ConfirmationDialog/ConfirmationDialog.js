import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

export default function ConfirmationDialog(props) {
  const { title, content, closeButtomContent, acceptButtomContent, handleClose, handleAccept, open } = props;
  return (
    <Dialog
      open={open}
      onClose={() => console.log()}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          {content}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => handleClose}>
          {closeButtomContent}
        </Button>
        <Button
          onClick={() => handleAccept}
          color="primary">
          {acceptButtomContent}
        </Button>
      </DialogActions>
    </Dialog>
  );
}