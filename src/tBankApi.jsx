import axios from 'axios';
const serverEndPoint = 'http://tbankonline.com/SMUtBank_API/Gateway?';
const requestOTP = async(userID, PIN) => {
  const headerStr = JSON.stringify({ serviceName: "requestOTP", userID: userID, PIN: PIN });
  const response = await axios.post(serverEndPoint + "Header=" + headerStr); 
  const data = await response.data;
  return data;
};

const getCustomerDetails = async(userID, PIN, OTP) => {
  const headerStr = JSON.stringify({ serviceName: "getCustomerDetails", userID: userID, PIN: PIN, OTP: OTP });
  const response = await axios.post(serverEndPoint + "Header=" + headerStr); 
  const data = await response.data;
  return data;
};


export { requestOTP, getCustomerDetails};