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
import { requestOTP, getCustomerDetails, getCustomerAccounts, getMonthlyBalanceTrend } from '../tBankApi';
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

export default function OTPLoginDialog({
  open,
  handleClose,
  handleOpenRegister,
  setOpenSuccessAlert,
  setLogin,
  setSuccessAlert }) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [OTP, setOTP] = useState("");
  const [failureAlert, setFailureAlert] = useState(null);
  const history = useHistory();
  useEffect(() => {
    if (failureAlert) {
      setTimeout(() => { setFailureAlert(null) }, 10000);
    }
  }, [failureAlert])
  // const handleClickRegister = () => {
  //   handleClose();
  //   handleOpenRegister();
  // };
  const handleLogin = (username, password) => {
    const p1 = getCustomerDetails(username, password, OTP).then(data => {
      const response = data.Content.ServiceResponse;
      if (response.ServiceRespHeader.ErrorText === 'invocation successful') {
        sessionStorage.setItem('username', username);
        sessionStorage.setItem('password', password);
        sessionStorage.setItem('customerID', response.CDMCustomer.customer.customerID);
        sessionStorage.setItem('profile', JSON.stringify(response.CDMCustomer));
        sessionStorage.setItem('OTP', OTP);
        handleClose();
        setLogin(true);
        setSuccessAlert('Login Successful!');
        setOpenSuccessAlert(true);
      } else {
        setFailureAlert('Invalid username/password/OTP');
      }
    });
    const p2 = getCustomerAccounts(username, password, OTP).then(data => {
      const response = data.Content.ServiceResponse;
      if (response.ServiceRespHeader.ErrorText === 'invocation successful') {
        const accountPromises = response.AccountList.account.map(account => {
          if (account.accountID) {
            return getMonthlyBalanceTrend(username, password, OTP, account.accountID, 6).then(data => {
              const balanceResponse = data.Content.ServiceResponse;
              if (balanceResponse.ServiceRespHeader.ErrorText === 'invocation successful') {
                let balances = balanceResponse.TrendData.MonthEndBalance;
                balances.push(balanceResponse.TrendData.CurrentMonth);
                return { id: account.accountID, data: balances };
              }
            })
          }
        });
        return Promise.all(accountPromises).then(values => {
          sessionStorage.setItem('balanceHistory', '{"balance": [' + values.map(obj => JSON.stringify(obj)).toString() + ']}');
        })
      }
    });
    Promise.all([p1, p2]).then(() => {
      if (history.location.pathname !== '/dashboard') {
        history.push('/dashboard');
      }
    })
  }
  const handleOTP = (username, password) => {
    requestOTP(username, password).then(data => {
      if (data.Content.ServiceResponse.ServiceRespHeader.ErrorDetails.toLowerCase() === 'success') {
        setSuccessAlert('OTP sent!');
        setOpenSuccessAlert(true);
      } else {
        setFailureAlert('Invalid username/password');
      }
    })
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
            <Grid container direction='column'>
              <Grid item>
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
              </Grid>
              <Grid item>
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
              </Grid>
              <Grid item>
                <Grid container direction='row'>
                  <Grid item>
                    <TextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="otp"
                      label="OTP"
                      type="otp"
                      id="otp"
                      autoComplete=""
                      onChange={e => setOTP(e.target.value)}
                    />
                  </Grid>
                  <Grid item>
                    <Button
                      disabled={!username || !password}
                      color='secondary'
                      variant='contained'
                      className={classes.opt}
                      onClick={() => handleOTP(username, password)}
                    >
                      Get OTP
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            {failureAlert ? (
              <Alert className={classes.failureAlert} severity="error">
                {failureAlert}
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
            {/* <Typography
              onClick={handleClickRegister}
              className={classes.links}
            >
              {"Don't have an account? Register>>"}
            </Typography> */}
          </div>
        </Container>
      </Dialog>
    </>
  );
}