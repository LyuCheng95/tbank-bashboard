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


const dashboardRoutes = [];
const useStyles = makeStyles(theme => ({
  container: {
    zIndex: "12",
    color: "#FFFFFF",
    paddingRight: "60px",
    paddingLeft: "60px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
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
  }
}));

export default function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  return (
    <div>
      <Header
        landing
        showOnScroll={{
          height: 550,
        }}
      />
      <Parallax filter image={require("../assets/landing-bg.jpg")}>
        <div className={classes.container}>
          <Grid container>
            <Grid item xs={12} sm={12} md={6}>
              <h1 className={classes.title}>Your Personalised Recommendor</h1>
              <h4>
                texttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttexttext
              </h4>
              <br />
              <Button className={classes.startButton} variant='contained' color='secondary'>
                <Typography variant='h6'>
                  Get Started
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <div className={classes.placeholder} />
        </div>
      </div>
    </div>
  );
}