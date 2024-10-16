const { newNamesAction } = require('./actions');
const apiUpload = require('./apiUpload');
const FormData = require('form-data');
const fs = require('fs');

jest.mock('./apiUpload');
jest.mock('./checkAuth');
jest.mock('fs');

describe('newNamesAction function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('successfully uploads new names', async () => {
    // Mock options for uploading new names
    const options = { filename: 'testFile.tsv' };
    const fileData = 'Test file data';
    const responseData = { message: 'Upload successful' };


    fs.readFileSync.mockReturnValueOnce(fileData);
    apiUpload.mockResolvedValueOnce(responseData);
    // Spy on console.log
    const logSpy = jest.spyOn(global.console, 'log');

    // Call newNamesAction
    await newNamesAction(options);

    // Assertions
    expect(fs.readFileSync).toHaveBeenCalledWith(options.filename);
    expect(apiUpload).toHaveBeenCalledWith('namebasics', expect.any(FormData));
    expect(logSpy).toHaveBeenCalledWith(responseData);
  });

  test('fails to upload new names', async () => {
    // Mock options for uploading new names
    const options = { filename: 'testFile.txt' };
    const errorMessage = 'Failed to upload';
    const error = new Error(errorMessage);
    
    fs.readFileSync.mockImplementationOnce(() => {
      throw error;
    });

    const errorSpy = jest.spyOn(global.console, 'error');

    // Call newNamesAction
    await newNamesAction(options);

    // Assertions
    expect(fs.readFileSync).toHaveBeenCalledWith(options.filename);
    expect(errorSpy).toHaveBeenCalledWith('Error while uploading new names:', errorMessage);
  });
});
