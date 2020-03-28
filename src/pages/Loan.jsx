import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import LoanApplicationPanel from '../components/LoanApplicationPanel';
import LoanRepaymentPanel from '../components/LoanRepaymentPanel';
import queryString from 'query-string';

const useStyles = makeStyles(theme => ({
  loanCard: {
    marginTop: "80px",
    overflow: "visible",
    borderRadius: "40px",
  },
  tabs: {
    height: "60px"
  }
}))
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}
function a11yProps(index) {
  return {
    id: `scrollable-auto-tab-${index}`,
    'aria-controls': `scrollable-auto-tabpanel-${index}`,
  };
}
export default function Loan() {
  const [value, setValue] = React.useState(0);
  const history = useHistory();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();
  return (
    <Card className={classes.loanCard}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
          className={classes.tabs}
        >
          <Tab label="Loan Application" {...a11yProps(0)} />
          {/* <Tab label="Loan Repayment" {...a11yProps(1)} /> */}
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <LoanApplicationPanel />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <LoanRepaymentPanel />
      </TabPanel>
    </Card>
  );
}