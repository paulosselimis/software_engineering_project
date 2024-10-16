const axios = require('axios');
const https = require('https');
const apiRequest = require('./apiRequest'); // Assuming the file containing apiRequest is named script.js

jest.mock('axios');

describe('apiRequest function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('successfully makes an API request', async () => {
    const responseData = { message: 'Success' };
    const response = { status: 200, statusText: 'OK', data: responseData };
    axios.mockResolvedValue(response);

    const method = 'GET';
    const path = 'example/path';
    const data = {};

    const result = await apiRequest(method, path, data);

    expect(result).toEqual(responseData);
    expect(axios).toHaveBeenCalledWith(expect.objectContaining({
      method,
      url: `https://localhost:9876/ntuaflix_api/${path}`,
      data,
      httpsAgent: expect.any(https.Agent)
    }));
  });

  test('handles API request error', async () => {
    const errorMessage = 'Not Found';
    const errorResponse = { response: { status: 404, data: errorMessage } };
    axios.mockRejectedValue(errorResponse);
  
    const method = 'GET';
    const path = 'example/path';
    const data = {};
  
    // Mock console.error
    console.error = jest.fn();
  
    await expect(apiRequest(method, path, data)).rejects.toEqual(errorResponse);
  
  
    expect(console.error).toHaveBeenCalledWith('API request error:', errorResponse.response.status, errorResponse.response.statusText);
    expect(console.error).toHaveBeenCalledWith(errorResponse.response.data);
    
    // Restore console.error to its original implementation
    console.error.mockRestore();
  });
});
