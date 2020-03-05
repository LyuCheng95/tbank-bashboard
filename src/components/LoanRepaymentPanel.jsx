import React, { useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import InfoIcon from '@material-ui/icons/Info';
import LocalAtmIcon from '@material-ui/icons/LocalAtm';
import { calculateFullLoanRepayment, getLoanAccountDetails } from '../tBankApi';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
const useStyles = makeStyles(theme => ({
  formControl: {
    minWidth: 120,
  },
  loanSelect: {
    color: "#3f51b5",
    fontWeight: "500",
    width: "200px"
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
  calculateButton: {
    height: '55px'
  }
}));
export default function LoanRepaymentPanel(props) {
  const classes = useStyles();
  const [repaymentType, setRepaymentType] = React.useState('');
  const [account, setAccount] = React.useState('');
  const [amount, setAmount] = React.useState('');
  const [keepMaturity, setKeepMaturity] = React.useState(true);
  const [loanAccounts, setLoanAccounts] = React.useState([{ accountID: "" }]);
  const [calculationResult, setCalculationResult] = React.useState([])
  const [openSuccessAlert, setOpenSuccessAlert] = React.useState(false);
  const [successAlert, setSuccessAlert] = React.useState("");
  const loanAccountsRef = useRef([]);
  loanAccountsRef.current = JSON.parse(sessionStorage
    .getItem("accounts"))
    .filter(account => account.productID !== '101' && account.currentStatus === "Open");
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
  const handleCalculate = () => {
    const username = sessionStorage.getItem('username');
    const password = sessionStorage.getItem('password');
    const OTP = sessionStorage.getItem('OTP');
    calculateFullLoanRepayment(username, password, OTP, account).then(data => {
      const response = data.Content.ServiceResponse;
      if (response.ServiceRespHeader.ErrorText === 'invocation successful') {
        setSuccessAlert("Calculation successful!")
        setOpenSuccessAlert(true);
        const result = Object.entries(response.FullRepaymentResponse)
          .reduce((rows, key, index) => (index % 4 == 0 ? rows.push([key])
            : rows[rows.length - 1].push(key)) && rows, []);
        setCalculationResult(result);
      } else if (response.ServiceRespHeader.ErrorText === "OTP expired") {
        props.setOTPDialogOpen(true);
      }
    })
  };
  return (
    <>
      <Grid container direction="column" spacing={5}>
        <Grid item>
          <Grid container direction="row" justify="space-evenly">
            <Grid item>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>
                  Repayment Type
                </InputLabel>
                <Select
                  labelWidth={120}
                  value={repaymentType}
                  onChange={e => setRepaymentType(e.target.value)}
                  className={classes.loanSelect}
                >
                  <MenuItem value="fullRepayment">
                    <strong>Full Repayment</strong>
                  </MenuItem>
                  <MenuItem value="partialRepayment">
                    <strong>Partial Repayment</strong>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>
                  Account
                </InputLabel>
                <Select
                  labelWidth={80}
                  value={account}
                  onChange={e => setAccount(e.target.value)}
                  className={classes.loanSelect}
                >
                  {loanAccountsRef.current.map(a => (
                    <MenuItem key={a.accountID} value={a.accountID}>
                      {a.accountID}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            {repaymentType === "partialRepayment" ? (
              <>
                <Grid item>
                  <TextField
                    value={amount}
                    label="Repayment Amount"
                    onChange={e => setAmount(e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item>
                  <Grid container direction="column">
                    <Grid item>
                      Keep Maturity Date?
                    </Grid>
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={keepMaturity}
                            onChange={e => setKeepMaturity(e.target.checked)}
                            value="checkedA"
                            color="primary"
                          />
                        }
                        label={keepMaturity ? "Yes" : "No"}
                        labelPlacement="end"
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </>
            ) : null}
            <Grid item>
              <Button
                variant="contained"
                size="large"
                color="secondary"
                disabled={!account || !repaymentType}
                onClick={() => handleCalculate()}
                className={classes.calculateButton}
              >
                Calculate
            </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container direction="column" spacing={5} className={classes.detailsContainer}>
            {calculationResult.map(row => (
              <Grid item>
                <Grid container direction="row" justify="space-evenly">
                  {row.map(data => (
                    <Grid item>
                      {gridTextField(data[0].replace(/([A-Z])/g, " $1"), data[1])}
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
          </Grid>
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