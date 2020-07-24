import axios from 'axios';
import config from './config';

const fetchPaywallClient = () => {
  const defaultOptions = {
    baseURL: config.paywallUrl,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Create instance
  let instance = axios.create(defaultOptions);
  return instance;
};

export default fetchPaywallClient();