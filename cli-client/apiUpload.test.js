const axios = require('axios');
const https = require('https');
const apiUpload = require('./apiUpload'); // Assuming the file containing apiUpload is named script.js

jest.mock('axios');

describe('apiUpload function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('successfully uploads data', async () => {
    const responseData = { message: 'Upload success' };
    const response = { status: 200, statusText: 'OK', data: responseData };
    axios.mockResolvedValue(response);

    const path = 'upload/path';
    const options = { /* options for upload */ };

    const result = await apiUpload(path, options);

    expect(result).toEqual(responseData);
    expect(axios).toHaveBeenCalledWith(expect.objectContaining({
      method: 'POST',
      url: `https://localhost:9876/ntuaflix_api/admin/upload/${path}`,
      data: options,
      httpsAgent: expect.any(https.Agent)
    }));
  });

  test('handles upload error', async () => {
    const errorMessage = 'Upload failed';
    const errorResponse = { response: { status: 500, data: errorMessage } };
    axios.mockRejectedValue(errorResponse);

    const path = 'upload/path';
    const options = { /* options for upload */ };

    console.error = jest.fn(); // Mock console.error

    await expect(apiUpload(path, options)).rejects.toEqual(errorResponse);

    expect(console.error).toHaveBeenCalledWith('API request error:', errorResponse.message, '\nError message: ', errorResponse.response.data);

    console.error.mockRestore(); // Restore console.error
  });
});