import web3 from '../../shared/web3/http.web3';

export const createContractInstance = (
  contractABI: any,
  contractAddress: string,
) => {
  const instance = new web3.eth.Contract(contractABI, contractAddress);
  return instance;
};
