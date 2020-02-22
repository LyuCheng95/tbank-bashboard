import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  logoutDialogTitle: {
    backgroundColor: '#3f51b5',
    color: '#FFFFFF',
  }
}));

export default function LogoutDialog(props) {
  const classes = useStyles();
  return (
    <Dialog
      open={props.openLogoutDialog}
      onClose={() => props.setOpenLogoutDialog(false)}
    >
      <DialogTitle className={classes.logoutDialogTitle}>{"Logout"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you want to logout?
          </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.setOpenLogoutDialog(false)} variant='contained' color="primary">
          No
            </Button>
        <Button onClick={props.handleLogout} color="secondary" variant='contained' autoFocus>
          Yes
            </Button>
      </DialogActions>
    </Dialog>
  );
}