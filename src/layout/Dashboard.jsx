
import React, { useContext } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import { useHistory, Route, Switch } from "react-router-dom";
import Accounts from '../pages/Accounts';
import Profile from '../pages/Profile';
import Loan from '../pages/Loan';
import Loading from '../pages/Loading';
import OTPLoginDialog from '../components/OTPLoginDialog';
import RegisterDialog from '../components/RegisterDialog';
import LogoutDialog from '../components/LogoutDialog';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useEffect } from 'react';
import Header from '../components/Header';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'hidden',
    height: '100vh',
    display: 'flex',
    backgroundColor: '#f0efea',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
    '&$focus': {
      outline: 'none',
    },
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    marginTop: '64px',
    flexGrow: 1,
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  headerButton: {
    '&:focus': {
      outline: 'none',
    },
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [showLoginDialog, setShowLoginDialog] = React.useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = React.useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState("");
  const [login, setLogin] = React.useState(sessionStorage.getItem('username'));
  const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleOpenLoginDialog = () => {
    setShowLoginDialog(true);
  };
  const handleLogout = () => {
    setOpenLogoutDialog(false);
    setLogin(false);
    history.push('/');
    sessionStorage.clear()
  };
  useEffect(() => {
    if (sessionStorage.getItem('username')) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);
  const history = useHistory();
  return (
    <div className={classes.root}>
      <Header
        login={login}
        setLogin={setLogin}
        handleOpenLoginDialog={handleOpenLoginDialog}
        setOpenLogoutDialog={setOpenLogoutDialog}
        open={open}
        setOpen={setOpen}
      />
      <OTPLoginDialog
        open={showLoginDialog}
        handleClose={() => setShowLoginDialog(false)}
        handleOpenRegister={() => setShowRegisterDialog(true)}
        setLogin={() => setLogin(true)}
        setOpenSuccessAlert={setOpenSuccessAlert}
        setSuccessAlert={setSuccessAlert}
      />
      <RegisterDialog
        open={showRegisterDialog}
        handleClose={() => setShowRegisterDialog(false)}
        handleOpenLogin={() => setShowLoginDialog(true)}
        setLogin={() => setLogin(true)}
        setOpenSuccessAlert={setOpenSuccessAlert}
        setSuccessAlert={setSuccessAlert}
      />
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => history.push('/dashboard/loading')} >
            <ListItemIcon>
              <PermContactCalendarIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>
          <ListItem button onClick={() => history.push('/dashboard/account')}>
            <ListItemIcon>
              <AccountBalanceWalletIcon />
            </ListItemIcon>
            <ListItemText primary="Accounts" />
          </ListItem>
          <ListItem button onClick={() => history.push('/dashboard/loan')}>
            <ListItemIcon>
              <LocalAtmIcon />
            </ListItemIcon>
            <ListItemText primary="Loan" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Route exact path="/dashboard" component={Profile} />
          <Route path="/dashboard/account" component={Accounts} />
          <Route path="/dashboard/loan" component={Loan} />
          <Route path="/dashboard/loading" component={Loading} />
        </Container>
        <Snackbar open={openSuccessAlert} autoHideDuration={3000} onClose={() => setOpenSuccessAlert(false)}>
          <Alert variant='filled' onClose={() => setOpenSuccessAlert(false)} severity="success">
            {successAlert}
          </Alert>
        </Snackbar>
        <LogoutDialog
          setOpenLogoutDialog={setOpenLogoutDialog}
          handleLogout={handleLogout}
          openLogoutDialog={openLogoutDialog}
        />
      </main>
    </div>
  );
}
