const axios = require('axios');
const https = require('https');

const apiUpload = async (path, options) => {
  try {
    const agent = new https.Agent({ rejectUnauthorized: false });
    const response = await axios({
      method: "POST",
      url: `https://localhost:9876/ntuaflix_api/admin/upload/${path}`,
      data: options,
      httpsAgent: agent
    });
    console.log('Status:', response.status);
    console.log('StatusText:', response.statusText);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('API request error:', error.message, '\nError message: ', error.response.data);
    }
    throw error;
  }
};

module.exports = apiUpload;
