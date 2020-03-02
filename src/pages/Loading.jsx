import React, { useEffect } from 'react';
import { getCustomerDetails, getCustomerAccounts, getMonthlyBalanceTrend, getAllProductDetails } from '../tBankApi';
import { useHistory } from "react-router-dom"
import LinearProgress from '@material-ui/core/LinearProgress';
export default function Loading(props) {
  const username = sessionStorage.getItem("username");
  const password = sessionStorage.getItem("password");
  const OTP = sessionStorage.getItem("OTP");
  const history = useHistory();
  useEffect(() => {
    const getCustomerDetailsPromise = getCustomerDetails(username, password, OTP).then(data => {
      const response = data.Content.ServiceResponse;
      if (response.ServiceRespHeader.ErrorText === 'invocation successful') {
        sessionStorage.setItem('customerId', response.CDMCustomer.customer.customerID);
        sessionStorage.setItem('profile', JSON.stringify(response.CDMCustomer));
      }
    });
    const getAllProductDetailsPromise = getAllProductDetails(username, password, OTP, 1).then(data => {
      const response = data.Content.ServiceResponse;
      if (response.ServiceRespHeader.ErrorText === 'invocation successful') {
        sessionStorage.setItem('productList', JSON.stringify(response["Product_ParametersList_Read-Response"]["ProductList"]));
      }
    });
    const getCustomerAccountsPromise = getCustomerAccounts(username, password, OTP).then(data => {
      const response = data.Content.ServiceResponse;
      if (response.ServiceRespHeader.ErrorText === 'invocation successful') {
        const accountPromises = response.AccountList.account.map(account => {
          if (account.accountID) {
            return getMonthlyBalanceTrend(username, password, OTP, account.accountID, 6).then(data => {
              const balanceResponse = data.Content.ServiceResponse;
              if (balanceResponse.ServiceRespHeader.ErrorText === 'invocation successful') {
                let balances = balanceResponse.TrendData.MonthEndBalance;
                balances.push(balanceResponse.TrendData.CurrentMonth);
                return { id: account.accountID, data: balances };
              }
            })
          }
        });
        return Promise.all(accountPromises).then(values => {
          sessionStorage.setItem('balanceHistory', '{"balance": [' + values.map(obj => JSON.stringify(obj)).toString() + ']}');
        })
      }
    });
    Promise.all([
      getCustomerDetailsPromise, 
      getAllProductDetailsPromise,
      getCustomerAccountsPromise
    ]).then(() => {
      if (history.location.pathname !== '/dashboard') {
        history.push('/dashboard');
      }
    })
  }, []);
  return (
    <LinearProgress />
  );
}