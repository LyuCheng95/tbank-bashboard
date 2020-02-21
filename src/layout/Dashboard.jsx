
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import FastfoodIcon from '@material-ui/icons/Fastfood';
import DeleteIcon from '@material-ui/icons/Delete';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import {
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import Attendance from '../pages/Attendance';
import Food from '../pages/Food';
import Home from '../pages/Home';
import Study from '../pages/Study';
import Clean from '../pages/Clean';
import LoginDialog from '../components/LoginDialog';
import RegisterDialog from '../components/RegisterDialog';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { useEffect } from 'react';
import Header from '../components/Header';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    overflow: 'hidden',
    height: '100vh',
    display: 'flex',
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
  logoutDialogTitle: {
    backgroundColor: '#3f51b5',
    color: '#FFFFFF',
  }
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [showLoginDialog, setShowLoginDialog] = React.useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = React.useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState("");
  const [login, setLogin] = React.useState(false);
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
      <LoginDialog
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
          <ListItem button onClick={() => history.push('/')} >
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="主页" />
          </ListItem>
          <ListItem button onClick={() => history.push('/food')}>
            <ListItemIcon>
              <FastfoodIcon />
            </ListItemIcon>
            <ListItemText primary="餐饮" />
          </ListItem>
          <ListItem button onClick={() => history.push('/clean')}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary="卫生" />
          </ListItem>
          <ListItem button onClick={() => history.push('/study')}>
            <ListItemIcon>
              <LocalLibraryIcon />
            </ListItemIcon>
            <ListItemText primary="学习" />
          </ListItem>
          <ListItem button onClick={() => history.push('/attendance')}>
            <ListItemIcon>
              <PlaylistAddCheckIcon />
            </ListItemIcon>
            <ListItemText primary="出勤" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container}>
          <Home />
        </Container>
        <Snackbar open={openSuccessAlert} autoHideDuration={3000} onClose={() => setOpenSuccessAlert(false)}>
          <Alert variant='filled' onClose={() => setOpenSuccessAlert(false)} severity="success">
            {successAlert}
          </Alert>
        </Snackbar>
        <Dialog
          open={openLogoutDialog}
          onClose={() => setOpenLogoutDialog(false)}
        >
          <DialogTitle className={classes.logoutDialogTitle}>{"注销"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              是否要注销账号?
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenLogoutDialog(false)} color="primary">
              <Typography component="h2" variant="h6" >
                取消
              </Typography>
            </Button>
            <Button onClick={handleLogout} color="primary" autoFocus>
              <Typography component="h2" variant="h6" >
                登出
              </Typography>
            </Button>
          </DialogActions>
        </Dialog>
      </main>
    </div>
  );
}