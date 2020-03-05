import React, { Component, useState, useEffect, useContext } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import { requestOTP, loginCustomer } from '../tBankApi';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  paper: {
    marginBottom: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
    '&:focus': {
      outline: 'none'
    },
  },
  links: {
    color: '#3f51b5',
    cursor: 'pointer',
    fontSize: '0.9rem',
    '&:hover': {
      textDecoration: 'underline',
    }
  },
  failureAlert: {
    width: '100%',
    marginTop: '10px',
  },
  container: {
    width: '400px',
  },
  opt: {
    margin: '20% 10%',
    height: '60%',
    width: '100%',
  }
}));

export default function OTPDialog({
  open,
  handleClose,
}) {
  const classes = useStyles();
  const [OTP, setOTP] = useState("");
  const setNewOTP = () => {
    sessionStorage.setItem('OTP', OTP)
    handleClose()
  }
  return (
    <Dialog open={open} >
      <DialogTitle>
        OTP expired!
        <br />
        please update OTP and request again.
        <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <Grid container direction="row">
          <Grid item>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="otp"
              label="New OTP"
              type="otp"
              id="otp"
              autoComplete=""
              onChange={e => setOTP(e.target.value)}
            />
          </Grid>
          <Grid>
            <Button
              disabled={!OTP}
              color='secondary'
              variant='contained'
              className={classes.opt}
              onClick={() => setNewOTP()}
            >
              confirm
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  );
}