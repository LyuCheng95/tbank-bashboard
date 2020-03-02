import React, { useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import InfoIcon from '@material-ui/icons/Info';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import { calculateLoanInstallment } from '../tBankApi';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  loanSelect: {
    color: "#3f51b5",
    fontWeight: "500",
    fontSize: "1.2rem"
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loanTypeItem: {
    textAlign: "center",
  },
  textField: {
    width: '200px',
    '& input': {
      color: "white !important"
    },
    '& label': {
      color: "white !important"
    },
    '& ::before': {
      borderColor: "white"
    }
  },
  detailsContainer: {
    backgroundColor: "#6574c4",
    color: "white",
    borderRadius: "20px",
    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
  },
  applyItem: {
    textAlign: 'center'
  }
}));
export default function LoanApplicationPanel() {
  const classes = useStyles();
  const [loanType, setLoanType] = React.useState('');
  const [loanInfo, setLoanInfo] = React.useState([]);
  const [period, setPeriod] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState("");

  const detailsRef = useRef();
  const placeHolder = { ProductName: "", MinOpeningBalance: 0, PenaltyRate: 0, RepaymentPenaltyThreshold: 0, InterestRate: 0 }
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
            className={classes.textField}
            disabled={true}
          />
        </Grid>
      </Grid>
    );
  }
  useEffect(() => {
    let loanInfo = JSON.parse(sessionStorage.getItem("productList")).Product;
    loanInfo.push(placeHolder);
    setLoanInfo(loanInfo);
  }, [])
  const handleChangeLoan = v => {
    setLoanType(v);
  };
  detailsRef.current = placeHolder;
  if (loanInfo.length > 0) {
    detailsRef.current = loanInfo.filter(loan => loan.ProductName === loanType)[0]
  }
  const handleCalculateInstallment = () => {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    const OTP = sessionStorage.getItem('OTP');
    const productID = loanInfo.filter(loan => loan.ProductName === loanType)[0].ProductID;
    calculateLoanInstallment(username, password, OTP, amount, productID, period).then(data => {
      const response = data.Content.ServiceResponse;
      if (response.ServiceRespHeader.ErrorText === 'invocation successful') {
        setSuccessAlert("Calculated successful!")
        setOpenSuccessAlert(true);
      }
    })
  };
  return (
    <Grid container direction="column" spacing={10}>
      <Grid item className={classes.loanTypeItem}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>
            Loan Type
          </InputLabel>
          <Select
            labelWidth={80}
            value={loanType}
            onChange={e => handleChangeLoan(e.target.value)}
            className={classes.loanSelect}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {loanInfo.map(type => {
              return (<MenuItem key={type} value={type.ProductName}>{type.ProductName}</MenuItem>);
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <Grid container direction="row" justify="center" spacing={9} className={classes.detailsContainer}>
          <Grid item>
            {gridTextField('Minimum Opening Balance', detailsRef.current.MinOpeningBalance, <AttachMoneyIcon />)}
          </Grid>
          <Grid item>
            {gridTextField('Penalty Rate', detailsRef.current.PenaltyRate, <ThumbDownIcon />)}
          </Grid>
          <Grid item>
            {gridTextField('Repayment Penalty Threshold', detailsRef.current.RepaymentPenaltyThreshold, <InfoIcon />)}
          </Grid>
          <Grid item>
            {gridTextField('Interest Rate', detailsRef.current.InterestRate, <LocalAtmIcon />)}
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container direction="row" justify="center" spacing={10}>
          <Grid item>
            <TextField
              error={!(amount > 100000 || amount === "")}
              value={amount}
              onChange={e => setAmount(e.target.value)}
              label="Loan Amount"
              helperText={amount > 100000 || amount === "" ? null : ("Loan amount is no less than 100,000")}
            />
          </Grid>
          <Grid item>
            <TextField
              error={!(period < 360 || period === "")}
              value={period}
              onChange={e => setPeriod(e.target.value)}
              label="Loan Term (In months)"
              helperText={period < 360 || period === "" ? null : ("Loan term is no larger than 360")}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.applyItem}>
        <Button
          variant="contained"
          size="large"
          color="primary"
          disabled={period >= 360 || amount < 100000 || period === "" || amount === "" || loanType === ""}
          onClick={() => handleCalculateInstallment()}
        >
          Calculate Installment
        </Button>
      </Grid>
      <Snackbar open={openSuccessAlert} autoHideDuration={3000} onClose={() => setOpenSuccessAlert(false)}>
        <Alert variant='filled' onClose={() => setOpenSuccessAlert(false)} severity="success">
          {successAlert}
        </Alert>
      </Snackbar>
    </Grid>
  );
}