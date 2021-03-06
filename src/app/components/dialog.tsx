import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

interface AlertDialogProps {
  open: boolean;
  title: any;
  content?: any;
  handleYes: () => void;
  handleNo: () => void;
}

export const AlertDialog = ({ open, title, content, handleYes, handleNo }: AlertDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleNo}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      {content && (
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{content}</DialogContentText>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={handleNo}>No</Button>
        <Button onClick={handleYes} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};
