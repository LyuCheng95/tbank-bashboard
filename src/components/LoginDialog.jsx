import React, { Component, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Alert from '@material-ui/lab/Alert';
import { login } from '../api';
import Snackbar from '@material-ui/core/Snackbar';
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
  }
}));

export default function LoginDialog({
  open,
  handleClose,
  handleOpenRegister,
  setOpenSuccessAlert,
  setLogin,
  setSuccessAlert }) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [failureAlert, setFailureAlert] = useState(false);
  const history = useHistory();
  const handleClickRegister = () => {
    handleClose();
    handleOpenRegister();
  };
  const handleLogin = (username, password) => {
    login(username, password).then(response => {
      if (response.data.status == 0) {
        setFailureAlert(true)
      } else {
        sessionStorage.setItem('username', username)
        handleClose();
        setOpenSuccessAlert(true);
        setLogin(true);
        setSuccessAlert('Login Successful!');
        if (history.location.pathname !== '/dashboard') {
          history.push('/dashboard');
        }
      }
    });
  }
  return (
    <>
      <Dialog open={open} >
        <DialogTitle>
          <IconButton aria-label="close" className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <Container component="main" maxWidth="xs" className={classes.container}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="usename"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={e => setUsername(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)}
            />
            {failureAlert ? (
              <Alert className={classes.failureAlert} severity="error">
                Invalid username/password
              </Alert>
            ) : null}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => handleLogin(username, password)}
            >
              Login
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Typography>
                  Forget password?
                </Typography>
              </Grid> */}
              <Grid item>
                <Typography
                  onClick={handleClickRegister}
                  className={classes.links}
                >
                  {"Don't have an account? Register>>"}
                </Typography>
              </Grid>
            </Grid>
          </div>
        </Container>
      </Dialog>
    </>
  );
}