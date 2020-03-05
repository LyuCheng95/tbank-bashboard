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
import { calculateLoanInstallment, applyForLoan } from '../tBankApi';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
const useStyles = makeStyles(theme => ({
  formControl: {
    width: '180px',
  },
  loanSelect: {
    color: "#3f51b5",
    fontWeight: "500",
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  loanTypeItem: {
    textAlign: "center",
  },
  textField: {
    width: '180px',
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
    marginRight: "-20px",
    marginLeft: "-20px",
    backgroundColor: "#6574c4",
    color: "white",
    borderRadius: "20px",
    boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)"
  },
  applyItem: {
    position: "relative"
  },
  applyButton: {
    position: "absolute",
    bottom: 0
  },
  calculateInstallmentButton: {
    height: '55px'
  }
}));
export default function LoanApplicationPanel(props) {
  const classes = useStyles();
  const [loanType, setLoanType] = React.useState('');
  const [loanInfo, setLoanInfo] = React.useState([]);
  const [period, setPeriod] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [interest, setInterest] = React.useState("");
  const [loanTitle, setLoanTitle] = React.useState("");
  const [loanPurpose, setLoanPurpose] = React.useState("");
  const [collateralAssetValue, setCollateralAssetValue] = React.useState("");
  const [settlementAccount, setSettlementAccount] = React.useState("");
  const [monthlyInstallment, setMonthlyInstallment] = React.useState("");
  const [maturityDate, setMaturityDate] = React.useState("");
  const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState("");

  const detailsRef = useRef();
  const accountsRef = useRef([]);
  const placeHolder = { ProductName: "", MinOpeningBalance: 0, PenaltyRate: 0, RepaymentPenaltyThreshold: 0, InterestRate: 0 }
  const ltvRef = useRef("0");
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
    accountsRef.current = JSON.parse(sessionStorage.getItem("accounts"))
  }, []);
  const handleChangeLoan = v => {
    setLoanType(v);
    ltvRef.current = loanInfo.filter(type => type.ProductName === v)[0].MaxLtvRatio
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
        setSuccessAlert("Calculation successful!")
        setOpenSuccessAlert(true);
        const installment = response.InstallmentResponse;
        setInterest(installment.Interest);
        setMaturityDate(installment.MaturityDate);
        setMonthlyInstallment(installment.MonthlyInstallment);
      } else if (response.ServiceRespHeader.ErrorText === "OTP expired") {
        props.setOTPDialogOpen(true);
      }
    })
  };

  const clearFields = () => {
    setLoanType("")
    setAmount("")
    setPeriod("")
    setInterest("")
    setMaturityDate("")
    setMonthlyInstallment("")
    setLoanTitle("")
    setLoanPurpose("")
    setCollateralAssetValue("")
    setCollateralAssetValue("")
    setSettlementAccount("")
    setMonthlyInstallment("")
    setMaturityDate("")
    detailsRef.current = {}
  }
  const handleApply = () => {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    const OTP = sessionStorage.getItem('OTP');
    const productID = loanInfo.filter(loan => loan.ProductName === loanType)[0].ProductID;
    const currency = accountsRef.current.filter(account => account.accountID === settlementAccount)[0].currency;
    applyForLoan(
      username,
      password,
      OTP,
      amount,
      loanPurpose,
      productID,
      period,
      settlementAccount,
      collateralAssetValue ? collateralAssetValue : 0,
      currency,
      loanTitle
    ).then(data => {
      const response = data.Content.ServiceResponse;
      if (response.ServiceRespHeader.ErrorText === 'invocation successful') {
        clearFields()
        setSuccessAlert("Application successful!")
        setOpenSuccessAlert(true);
      } else if (response.ServiceRespHeader.ErrorText === "OTP expired") {
        props.setOTPDialogOpen(true);
      }
    })
  };
  console.log(accountsRef.current)
  return (
    <>
      <Grid container direction="column" spacing={10}>
        <Grid item className={classes.loanTypeItem}>
          <Grid container direction="row" justify="space-evenly" >
            <Grid item>
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
              <TextField
                error={!(amount > 100000 || amount === "")}
                value={amount}
                onChange={e => setAmount(e.target.value)}
                label="Loan Amount"
                helperText={amount > 100000 || amount === "" ? "" : "Loan amount is no less than 100,000"}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <TextField
                error={!(period < 360 || period === "")}
                value={period}
                onChange={e => setPeriod(e.target.value)}
                label="Loan Term (In months)"
                helperText={period < 360 || period === "" ? "" : "Loan term is no larger than 360"}
                variant="outlined"
              />
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                disabled={period >= 360 || amount < 100000 || period === "" || amount === "" || loanType === ""}
                onClick={() => handleCalculateInstallment()}
                className={classes.calculateInstallmentButton}
              >
                Calculate Installment
            </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="row" justify="space-evenly" spacing={5} className={classes.detailsContainer}>
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
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    value={interest}
                    label="Interest"
                    InputProps={{
                      readOnly: true,
                    }}
                    disabled={interest === ""}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    value={maturityDate}
                    label="Maturity Date"
                    InputProps={{
                      readOnly: true,
                    }}
                    disabled={maturityDate === ""}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    value={monthlyInstallment}
                    label="Monthly Installment"
                    InputProps={{
                      readOnly: true,
                    }}
                    disabled={monthlyInstallment === ""}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    value={loanTitle}
                    disabled={interest === ""}
                    label="Loan Title"
                    onChange={e => setLoanTitle(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <TextField
                    value={loanPurpose}
                    disabled={interest === ""}
                    label="Loan Purpose"
                    onChange={e => setLoanPurpose(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container direction="column" spacing={2}>
                <Grid item>
                  <TextField
                    value={collateralAssetValue}
                    disabled={
                      interest === "" ||
                      ltvRef.current === "0"
                    }
                    label="Collateral Asset Value"
                    onChange={e => setCollateralAssetValue(e.target.value)}
                    variant="outlined"
                    error={
                      interest &&
                      loanType &&
                      collateralAssetValue !== "" &&
                      loanInfo.filter(type => type.ProductName === loanType)[0].MaxLtvRatio > 0 &&
                      (amount / ltvRef.current > collateralAssetValue)
                    }
                    helperText={
                      (interest &&
                        loanType &&
                        collateralAssetValue !== "" &&
                        loanInfo.filter(type => type.ProductName === loanType)[0].MaxLtvRatio > 0 &&
                        (amount / ltvRef.current > collateralAssetValue)) ?
                        "Assest Value is no less than " + amount / ltvRef.current :
                        ltvRef.current === "0" ? "not applicable" : null
                    }
                  />
                </Grid>
                <Grid item>
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel>
                      Settlement Account
                    </InputLabel>
                    <Select
                      labelWidth={130}
                      disabled={interest === ""}
                      value={settlementAccount}
                      onChange={e => setSettlementAccount(e.target.value)}
                    >
                      {accountsRef.current.filter(account => account.productID == '101').map(account => {
                        return (<MenuItem key={account.accountID} value={account.accountID}>{account.accountID}</MenuItem>);
                      })}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
            <Grid item className={classes.applyItem}>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                disabled={
                  !loanType ||
                  amount < 100000 ||
                  period > 360 ||
                  !period ||
                  !loanTitle ||
                  !loanPurpose ||
                  (!collateralAssetValue && ltvRef.current !== "0") ||
                  !settlementAccount
                }
                onClick={() => handleApply()}
                className={classes.applyButton}
              >
                Apply
            </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item className={classes.applyItem}>
        </Grid>
      </Grid>
      <Snackbar open={openSuccessAlert} autoHideDuration={3000} onClose={() => setOpenSuccessAlert(false)}>
        <Alert variant='filled' onClose={() => setOpenSuccessAlert(false)} severity="success">
          {successAlert}
        </Alert>
      </Snackbar>
    </>
  );
}