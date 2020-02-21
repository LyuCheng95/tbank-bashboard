import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import classNames from 'classnames';

const drawerWidth = 240
// core components
const useStyles = makeStyles(theme => ({

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
  },
  appBarLanding: {
    position: 'fixed',
    transition: 'height 1000ms'
  },
}));

export default function Header(props) {
  const { color, landing, login, setLogin, handleOpenLoginDialog, setOpenLogoutDialog, open, setOpen, showOnScroll } = props;
  const classes = useStyles();
  const [show, setShow] = useState(!landing);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  React.useEffect(() => {
    if (showOnScroll) {
      window.addEventListener("scroll", handleShow);
    }
    return function cleanup() {
      if (showOnScroll) {
        window.removeEventListener("scroll", handleShow);
      }
    };
  });
  const handleShow = () => {
    const { showOnScroll } = props;
    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > showOnScroll.height) {
      setShow(true);
    } else {
      setShow(false);
    }
  };
  const appBarClasses = classNames({
    [classes.transparent]: color === 'transparent',
    [classes.white]: color === 'white',
    [classes.appBar]: true,
    [classes.appBarShift]: open,
    [classes.appBarLanding]: landing
  });
  const render = () => {
    return (
      <AppBar position="absolute" className={appBarClasses}>
        <Toolbar className={classes.toolbar}>
          {landing ? null : (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>

          )}
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            [Logo]
          </Typography>
          {landing ? null : login ? (
            <>
              <div className={classes.usernameDiv}>
                <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                  {sessionStorage.getItem('username').length > 15 ? (
                    sessionStorage.getItem('username').slice(0, 13) + '...'
                  ) : (sessionStorage.getItem('username'))}
                </Typography>
              </div>
              <IconButton color="inherit"
                className={classes.headerButton}
                onClick={() => setOpenLogoutDialog('true')}
              >
                <ExitToAppIcon />
              </IconButton>
            </>
          ) : (
              <IconButton color="inherit"
                className={classes.headerButton}
                onClick={() => handleOpenLoginDialog()}
              >
                <PersonIcon />
              </IconButton>
            )}
        </Toolbar>
      </AppBar>
    );
  }
  return show ? render() : null
    ;
}