import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InsertComment from '@material-ui/icons/InsertComment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import WCIcon from '@material-ui/icons/Wc';
import HomeIcon from '@material-ui/icons/Home';
import PhoneIcon from '@material-ui/icons/Phone';
import PrintIcon from '@material-ui/icons/Print';
import PlaceIcon from '@material-ui/icons/Place';
import EmailIcon from '@material-ui/icons/Email';
import BusinessIcon from '@material-ui/icons/Business';
import DialpadIcon from '@material-ui/icons/Dialpad';
import FaceIcon from '@material-ui/icons/Face';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import WorkIcon from '@material-ui/icons/Work';
import EventIcon from '@material-ui/icons/Event';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: '-10px'
  },
  swipeableViews: {
    height: '290px'
  }
}));

export default function ProfileTabPanel() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = index => {
    setValue(index);
  };
  const gridTextField = (label, value, icon) => {
    return (
      <Grid container direction='row' alignItems='flex-end'>
        <Grid item xs={2}>
          {icon}
        </Grid>
        <Grid item xs={9}>
          <TextField
            value={value}
            id="input-with-icon-grid"
            label={label}
          />
        </Grid>
      </Grid>
    );
  }
  const profile = JSON.parse(sessionStorage.getItem('profile'));
  const gender = profile.profile.gender === 'M' ? 'Male' : 'Female';
  const occupation = profile.profile.occupation;
  const nationality = profile.profile.nationality;
  const ethnicGroup = profile.profile.ethnicGroup;
  const dateOfBirth = profile.ethnicGroup;
  const localNumber = profile.cellphone.phoneNumber;
  const countryCode = profile.cellphone.countryCode;
  const email = profile.profile.email;
  const fax = profile.profile.fax ? profile.profile.fax : '';
  const address1 = profile.address.streetAddress1;
  const address2 = profile.address.streetAddress2;
  const country = profile.address.country;
  const postalCode = profile.address.postalCode;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          variant="fullWidth"
          aria-label="icon label tabs example"
        >
          <Tab icon={<AssignmentIndIcon />} label="Personal Info" {...a11yProps(0)} />
          <Tab icon={<InsertComment />} label="Contact" {...a11yProps(1)} />
          <Tab icon={<HomeIcon />} label="Address" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        className={classes.swipeableViews}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
          <Grid container direction='column' spacing={5}>
            <Grid item >
              <Grid container direction='row' justify='space-around'>
                <Grid item xs={5}>
                  {gridTextField('Gender', gender, <WCIcon />)}
                </Grid>
                <Grid item xs={5}>
                  {gridTextField('Occupation', occupation, <WorkIcon />)}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction='row' justify='space-around'>
                <Grid item xs={5}>
                  {gridTextField('Nationality', nationality, <FaceIcon />)}
                </Grid>
                <Grid item xs={5}>
                  {gridTextField('Ethnic Group', ethnicGroup, <SupervisorAccountIcon />)}
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction='row' justify='space-around'>
                <Grid item xs={5}>
                  {gridTextField('Date of Birth', dateOfBirth, <EventIcon />)}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
          <Grid container direction='column' spacing={2} alignItems="center">
            <Grid item >
              {gridTextField('Local Number', localNumber, <PhoneIcon />)}
            </Grid>
            <Grid item >
              {gridTextField('Country Code', countryCode, <DialpadIcon />)}
            </Grid>
            <Grid item >
              {gridTextField('Email', email, <EmailIcon />)}
            </Grid>
            <Grid item >
              {gridTextField('Fax', fax, <PrintIcon />)}
            </Grid>
          </Grid>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
          <Grid container direction='column' spacing={2} alignItems="center">
            <Grid item >
              {gridTextField('Address', address1, <BusinessIcon />)}
            </Grid>
            <Grid item >
              {gridTextField('Address', address2, <BusinessIcon />)}
            </Grid>
            <Grid item >
              {gridTextField('Country', country, <PlaceIcon />)}
            </Grid>
            <Grid item >
              {gridTextField('Postal Code', postalCode, <EmailIcon />)}
            </Grid>
          </Grid>
        </TabPanel>
      </SwipeableViews>
    </div>
  );
}