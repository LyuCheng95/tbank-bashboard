import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
// import Header from "components/Header/Header.js";
// import Footer from "components/Footer/Footer.js";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
// import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "../components/Parallax.jsx";
import Grid from '@material-ui/core/Grid';
import Header from '../components/Header';
import OTPLoginDialog from '../components/OTPLoginDialog';
// import RegisterDialog from '../components/RegisterDialog';
import LogoutDialog from '../components/LogoutDialog';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import { useHistory } from "react-router-dom";
import LoanService from "../assets/LoanService.jpg";
import PersonalProfile from "../assets/PersonalProfile.jpg";
import RecommendationEngine from "../assets/RecommendationEngine.jpg";

const useStyles = makeStyles(theme => ({
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
  },
  infoContainer: {
    zIndex: "12",
    color: "#FFFFFF",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
    overflow: "hidden",
    borderRadius: "5px",

  },
  title: {
    // ...title,
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none"
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
  },
  placeholder: {
    height: '1000px'
  },
  startButton: {
    height: '50px'
  },
  titleContainer: {
    padding: "0 80px"
  },
  featureBox: {
    width: "100%",
    position: "relative",
    display: "inline-block",
    "&:hover": {
      opacity: '0.8',
      color: "black"
    }
  },
  featurePicture: {
    width: "100%",
  },
  textBox: {
    position: "absolute",
    zIndex: "999",
    margin: "0 auto",
    left: "0",
    right: "0",
    top: "25%",
    fontSize: "100px",
    textAlign: "center",
  },
  text: {
    margin: "0",
    textAlign: "center",
  },
  whiteBox: {
    display: "inline-block",
    borderStyle: "double"
  }
}));

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [showLoginDialog, setShowLoginDialog] = React.useState(false);
  const [showRegisterDialog, setShowRegisterDialog] = React.useState(false);
  const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState("");
  const [login, setLogin] = React.useState(sessionStorage.getItem('username'));
  const [openLogoutDialog, setOpenLogoutDialog] = React.useState(false);
  const history = useHistory();
  const handleLogout = () => {
    setOpenLogoutDialog(false);
    setLogin(false);
    history.push('/');
    sessionStorage.clear()
  };
  return (
    <div>
      <Header
        landing
        showOnScroll={{
          height: 550,
        }}
        handleOpenLoginDialog={() => setShowLoginDialog(true)}
        login={login}
        setLogin={setLogin}
        setOpenLogoutDialog={() => setOpenLogoutDialog(true)}
      />
      <Parallax filter image={require("../assets/landing-bg.jpg")}>
        <div className={classes.container}>
          <Grid container className={classes.titleContainer}>
            <Grid item xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Your Personalised Recommender</h1>
              <h4>
                Provide personal, intelligent recommendations.
              </h4>
              <br />
              <Button
                className={classes.startButton}
                variant='contained'
                color='secondary'
                onClick={() => setShowLoginDialog(true)}
              >
                <Typography variant='h6'>
                  Get Started
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.infoContainer}>
          <div className={classes.featureBox}>
            <img className={classes.featurePicture} src={PersonalProfile} />
            <div className={classes.textBox}>
              <div className={classes.whiteBox}>
                <h2 className={classes.text}>Personal Profile</h2>
              </div>
            </div>
          </div>
          <div className={classes.featureBox}>
            <img className={classes.featurePicture} src={RecommendationEngine} />
            <div className={classes.textBox}>
              <div className={classes.whiteBox}>
                <h2 className={classes.text}>Recommendation Engine</h2>
              </div>
            </div>
          </div>
          <div className={classes.featureBox}>
            <img className={classes.featurePicture} src={LoanService} />
            <div className={classes.textBox}>
              <div className={classes.whiteBox}>
                <h2 className={classes.text}>Loan Service</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <OTPLoginDialog
        open={showLoginDialog}
        handleClose={() => setShowLoginDialog(false)}
        handleOpenRegister={() => setShowRegisterDialog(true)}
        setLogin={() => null}
        setOpenSuccessAlert={setOpenSuccessAlert}
        setSuccessAlert={setSuccessAlert}
      />
      {/* <RegisterDialog
        open={showRegisterDialog}
        handleClose={() => setShowRegisterDialog(false)}
        handleOpenLogin={() => setShowLoginDialog(true)}
        setLogin={() => null}
        setOpenSuccessAlert={setOpenSuccessAlert}
        setSuccessAlert={setSuccessAlert}
      /> */}
      <LogoutDialog
        setOpenLogoutDialog={setOpenLogoutDialog}
        handleLogout={handleLogout}
        openLogoutDialog={openLogoutDialog}
      />
      <Snackbar open={openSuccessAlert} autoHideDuration={3000} onClose={() => setOpenSuccessAlert(false)}>
        <Alert variant='filled' onClose={() => setOpenSuccessAlert(false)} severity="success">
          {successAlert}
        </Alert>
      </Snackbar>
    </div>
  );
}