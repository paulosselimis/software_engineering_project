const { newTitlesAction } = require('./actions');
const apiUpload = require('./apiUpload');
const FormData = require('form-data');
const fs = require('fs');

jest.mock('./apiUpload');
jest.mock('./checkAuth');
jest.mock('fs');

describe('newTitlesAction function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('successfully uploads new titles', async () => {
    const options = { filename: 'testFile.tsv' };
    const fileData = 'Test file data';
    const logSpy = jest.spyOn(global.console, 'log');
    // Mock response data for successful upload
    const responseData = { message: 'Upload successful' };

    fs.readFileSync.mockReturnValueOnce(fileData);
    apiUpload.mockResolvedValueOnce(responseData); 

    // Call newTitlesAction
    await newTitlesAction(options);

    // Assertions
    expect(fs.readFileSync).toHaveBeenCalledWith(options.filename);
    expect(apiUpload).toHaveBeenCalledWith('titlebasics', expect.any(FormData));
    expect(logSpy).toHaveBeenCalledWith(responseData);
  });

  test('fails to upload new titles', async () => {

    const options = { filename: 'testFile.txt' };
    const errorMessage = 'Failed to upload';

    const error = new Error(errorMessage);

    fs.readFileSync.mockImplementationOnce(() => {
      throw error;
    });
    const errorSpy = jest.spyOn(global.console, 'error');

    await newTitlesAction(options);

    // Assertions
    expect(fs.readFileSync).toHaveBeenCalledWith(options.filename);
    expect(errorSpy).toHaveBeenCalledWith('Error while uploading new titles:', errorMessage);
  });
});
