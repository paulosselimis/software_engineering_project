const { newAkasAction } = require('./actions');
const apiUpload = require('./apiUpload');
const FormData = require('form-data');
const fs = require('fs');

jest.mock('./apiUpload');
jest.mock('./checkAuth');
jest.mock('fs');

describe('newAkasAction function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('successfully uploads new akas', async () => {
    // Mock options for uploading new akas
    const options = { filename: 'testFile.tsv' };
    
    // Mock file data
    const fileData = 'Test file data';
    
    // Mock response data for successful upload
    const responseData = { message: 'Upload successful' };

    // Mock fs.readFileSync to return file data
    fs.readFileSync.mockReturnValueOnce(fileData);

    // Mock apiUpload to resolve with responseData
    apiUpload.mockResolvedValueOnce(responseData);

    // Spy on console.log
    const logSpy = jest.spyOn(global.console, 'log');

    // Call newakasAction
    await newAkasAction(options);

    // Assertions
    expect(fs.readFileSync).toHaveBeenCalledWith(options.filename);
    expect(apiUpload).toHaveBeenCalledWith('titleakas', expect.any(FormData));
    expect(logSpy).toHaveBeenCalledWith(responseData);
  });

  test('fails to upload new akas', async () => {
    // Mock options for uploading new akas
    const options = { filename: 'testFile.txt' };

    // Mock error message for failed upload
    const errorMessage = 'Failed to upload';

    // Mock error object
    const error = new Error(errorMessage);

    // Mock fs.readFileSync to throw error
    fs.readFileSync.mockImplementationOnce(() => {
      throw error;
    });

    // Spy on console.error
    const errorSpy = jest.spyOn(global.console, 'error');

    // Call newakasAction
    await newAkasAction(options);

    // Assertions
    expect(fs.readFileSync).toHaveBeenCalledWith(options.filename);
    expect(errorSpy).toHaveBeenCalledWith('Error while uploading new akas:', errorMessage);
  });
});
