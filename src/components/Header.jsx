import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import Badge from '@material-ui/core/Badge';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
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
  alertButton: {
    '&:focus': {
      outline: 'none',
    },
    marginRight: '10px',
  },
  logoutDialogTitle: {
    backgroundColor: '#3f51b5',
    color: '#FFFFFF',
  },
  appBarLanding: {
    position: 'fixed',
    transition: 'height 1000ms'
  },
  transparent: {
    backgroundColor: 'transparent',
  }
}));

export default function Header(props) {
  const { color, landing, login, setLogin, handleOpenLoginDialog, setOpenLogoutDialog, open, setOpen, showOnScroll } = props;
  const classes = useStyles();
  const [show, setShow] = useState(!landing);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
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
    [classes.transparent]: !show,
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
            IS444
          </Typography>
          <IconButton color="inherit"
            className={classes.alertButton}
            onClick={event => {
              setAnchorEl(anchorEl ? null : event.currentTarget);
            }}
          >
            <Badge badgeContent={2} color='error'>
              <NotificationImportantIcon />
            </Badge>
          </IconButton>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <List className={classes.root}>
              <ListItem
                button
                onClick={() => {
                  history.push('/dashboard/loan?type=Home Loan&amount=15000000&term=12')
                }}
              >
                <ListItemAvatar>
                  <Avatar>
                    <MonetizationOnIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Promotion" secondary="home loan" />
              </ListItem>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <AccountBalanceIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="XXX" secondary="XXXX" />
              </ListItem>
            </List>
          </Popover>
          {login ? (
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
                onClick={() => setOpenLogoutDialog(true)}
              >
                <ExitToAppIcon />
              </IconButton>
            </>
          ) : (
              <IconButton color="inherit"
                className={classes.headerButton}
                onClick={() => handleOpenLoginDialog(true)}
              >
                <PersonIcon />
              </IconButton>
            )}
        </Toolbar>
      </AppBar>
    );
  }
  return render();
}