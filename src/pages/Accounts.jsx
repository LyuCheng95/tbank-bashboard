import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { getTransactionHistory } from '../tBankApi';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  accountCard: {
    marginTop: "80px",
    overflowY: "scroll",
    borderRadius: "40px",
    height: '70vh',
  },
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  table: {
    minWidth: 650,
  },
  accountDiv: {
    margin: '3% 10% 3% 10%',
  },
  balanceTitle: {
    fontSize: "20px",
    textAlign: "center",
    fontFamily: "Roboto Slab",
    marginTop: "15px",
    marginBottom: "-15px"
  }
}));

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Accounts() {
  const classes = useStyles();
  const [accHist, setAccHist] = useState();
  useEffect(() => {
    let time = new Date();
    const now = time.toISOString().split('T').join(' ').slice(0, -1);
    time.setFullYear(time.getFullYear() - 1);
    const oneYrAgo = time.toISOString().split('T').join(' ').slice(0, -1);
    const accountHistPromises = JSON.parse(sessionStorage.getItem('balanceHistory'))
      .balance
      .map(acc => {
        let hist = [];
        return getTransactionHistory(
          sessionStorage.getItem('username'),
          sessionStorage.getItem('password'),
          sessionStorage.getItem('OTP'),
          acc.id,
          oneYrAgo,
          now,
          100,
          1
        ).then(data => {
          const response = data.Content.ServiceResponse;
          if (response.ServiceRespHeader.ErrorText === 'invocation successful') {
            const balance = acc.data[acc.data.length - 1].Balance
            return { id: acc.id, balance: balance, hist: response.CDMTransactionDetail.transaction_Detail };
          }
        })
      });
    Promise.all(accountHistPromises).then(values => {
      let processedV = values.map(v => Array.isArray(v.hist) ? v : { ...v, hist: v.hist ? [v.hist] : [] })
      setAccHist(processedV);
    })
  }, [])
  return (
    <Card className={classes.accountCard}>
      <div className={classes.balanceTitle}> Account Transaction History</div>
      {accHist ? (
        <div className={classes.accountDiv}>
          {accHist.map(acc => {
            return (
              <ExpansionPanel>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Grid container justify="space-around">
                    <Grid item>
                      <Typography className={classes.heading}>ACCOUNT: {acc.id}</Typography>
                    </Grid>
                    <Grid item>
                      <Typography className={classes.heading}>BALANCE: {acc.balance}</Typography>
                    </Grid>
                  </Grid>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {acc.hist && acc.hist.length > 0 ? (
                    <TableContainer component={Paper}>
                      <Table className={classes.table} aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Transaction Date</TableCell>
                            <TableCell align="right">Currency</TableCell>
                            <TableCell align="right">Description</TableCell>
                            <TableCell align="right">Debit</TableCell>
                            <TableCell align="right">Credit</TableCell>
                            <TableCell align="right">Balance</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {acc.hist.map(rec => (
                            <TableRow key={rec.transactionDate}>
                              <TableCell component="th" scope="row">
                                {rec.transactionDate}
                              </TableCell>
                              <TableCell align="right">{rec.currency}</TableCell>
                              <TableCell align="right">{rec.narrative}</TableCell>
                              <TableCell align="right">{rec.transactionType < 200 ? rec.transactionAmount : '-'}</TableCell>
                              <TableCell align="right">{rec.transactionType >= 200 ? rec.transactionAmount : '-'}</TableCell>
                              <TableCell align="right">{rec.accountTo_interimBalance}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  ) : <div> NO History</div>}
                </ExpansionPanelDetails>
              </ExpansionPanel>
            );
          })}
        </div>
      ) : null
      }
    </Card >
  )
}