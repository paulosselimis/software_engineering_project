const axios = require('axios');
const https = require('https');

const apiRequest = async (method, path, data, format = 'json') => {
  try {
    const agent = new https.Agent({ rejectUnauthorized: false });
    const response = await axios({
      method,
      url: `https://localhost:9876/ntuaflix_api/${path}`,
      data,
      httpsAgent: agent
    });
    console.log('Status:', response.status);
    console.log('StatusText:', response.statusText);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('API request error:', error.response.status, error.response.statusText);
      console.error(error.response.data);
    }
    throw error;
  }
};

module.exports = apiRequest;
