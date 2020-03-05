import axios from 'axios';
const serverEndPoint = 'http://tbankonline.com/SMUtBank_API/Gateway?';
const requestOTP = async (userID, PIN) => {
  const headerStr = JSON.stringify({ serviceName: "requestOTP", userID: userID, PIN: PIN });
  const response = await axios.post(serverEndPoint + "Header=" + headerStr);
  const data = await response.data;
  return data;
};

const loginCustomer = async (userID, PIN, OTP) => {
  const headerStr = JSON.stringify({ serviceName: "loginCustomer", userID: userID, PIN: PIN, OTP: OTP });
  const response = await axios.post(serverEndPoint + "Header=" + headerStr);
  const data = await response.data;
  return data;
};

const getCustomerDetails = async (userID, PIN, OTP) => {
  const headerStr = JSON.stringify({ serviceName: "getCustomerDetails", userID: userID, PIN: PIN, OTP: OTP });
  const response = await axios.post(serverEndPoint + "Header=" + headerStr);
  const data = await response.data;
  return data;
};

const getMonthlyBalanceTrend = async (userID, PIN, OTP, accountID, numMonths) => {
  const headerStr = JSON.stringify({ serviceName: "getMonthlyBalanceTrend", userID: userID, PIN: PIN, OTP: OTP });
  const contentStr = JSON.stringify({ accountID: accountID, numMonths: numMonths });
  const response = await axios.post(serverEndPoint + "Header=" + headerStr + "&Content=" + contentStr);
  const data = await response.data;
  return data;
};

const getCustomerAccounts = async (userID, PIN, OTP) => {
  const headerStr = JSON.stringify({ serviceName: "getCustomerAccounts", userID: userID, PIN: PIN, OTP: OTP });
  const response = await axios.post(serverEndPoint + "Header=" + headerStr);
  const data = await response.data;
  return data;
};

const getAllProductDetails = async (userID, PIN, OTP, bankID) => {
  const headerStr = JSON.stringify({ serviceName: "getAllProductDetails", userID: userID, PIN: PIN, OTP: OTP });
  const contentStr = JSON.stringify({ Content: { "bankID": bankID } });
  const response = await axios.post(serverEndPoint + "Header=" + headerStr + "&Content=" + contentStr);
  const data = await response.data;
  return data;
};

const calculateLoanInstallment = async (userID, PIN, OTP, principle, productID, numberOfMonths) => {
  const headerStr = JSON.stringify({ serviceName: "calculateLoanInstallment", userID: userID, PIN: PIN, OTP: OTP });
  const contentStr = JSON.stringify({ "principle": principle, "productID": productID, "numberOfMonths": numberOfMonths });
  const response = await axios.post(serverEndPoint + "Header=" + headerStr + "&Content=" + contentStr);
  const data = await response.data;
  return data;
};

const applyForLoan = async (userID, PIN, OTP, loanAmount, loanPurpose, productID, numberOfMonths, settlementAccount, assetValue, currency, title) => {
  const headerStr = JSON.stringify({ serviceName: "applyForLoan", userID: userID, PIN: PIN, OTP: OTP });
  const contentStr = JSON.stringify({
    "loanAmount": loanAmount,
    "loanPurpose": loanPurpose,
    "productID": productID,
    "numberOfMonths": numberOfMonths,
    "settlementAccount": settlementAccount,
    "assetValue": assetValue,
    "currency": currency,
    "title": title
  });
  const response = await axios.post(serverEndPoint + "Header=" + headerStr + "&Content=" + contentStr);
  const data = await response.data;
  return data;
};

const getLoanAccountDetails = async (userID, PIN, OTP, accountID) => {
  const headerStr = JSON.stringify({ serviceName: "getLoanAccountDetails", userID: userID, PIN: PIN, OTP: OTP });
  const contentStr = JSON.stringify({ "Content": {"accountID": accountID}});
  const response = await axios.post(serverEndPoint + "Header=" + headerStr + "&Content=" + contentStr);
  const data = await response.data;
  return data;
};

const calculateFullLoanRepayment = async (userID, PIN, OTP, accountID) => {
  const headerStr = JSON.stringify({ serviceName: "calculateFullLoanRepayment", userID: userID, PIN: PIN, OTP: OTP });
  const contentStr = JSON.stringify({ "Content": {"accountID": accountID}});
  const response = await axios.post(serverEndPoint + "Header=" + headerStr + "&Content=" + contentStr);
  const data = await response.data;
  return data;
};
export {
  requestOTP,
  loginCustomer,
  getCustomerDetails,
  getMonthlyBalanceTrend,
  getCustomerAccounts,
  getAllProductDetails,
  calculateLoanInstallment,
  applyForLoan,
  getLoanAccountDetails,
  calculateFullLoanRepayment,
};