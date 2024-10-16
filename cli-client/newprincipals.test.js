const { newPrincipalsAction } = require('./actions');
const apiUpload = require('./apiUpload');
const FormData = require('form-data');
const fs = require('fs');

jest.mock('./apiUpload');
jest.mock('./checkAuth');
jest.mock('fs');

describe('newPrincipalAction function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('successfully uploads new principal', async () => {
    const options = { filename: 'testFile.tsv' };
    const fileData = 'Test file data';
    const responseData = { message: 'Upload successful' };

    fs.readFileSync.mockReturnValueOnce(fileData);
    apiUpload.mockResolvedValueOnce(responseData);

    const logSpy = jest.spyOn(global.console, 'log');

    await newPrincipalsAction(options);

    expect(fs.readFileSync).toHaveBeenCalledWith(options.filename);
    expect(apiUpload).toHaveBeenCalledWith('titleprincipals', expect.any(FormData));
    expect(logSpy).toHaveBeenCalledWith(responseData);
  });

  test('fails to upload new principal', async () => {
    const options = { filename: 'testFile.txt' };
    const errorMessage = 'Failed to upload';
    const error = new Error(errorMessage);

    fs.readFileSync.mockImplementationOnce(() => {
      throw error;
    });

    const errorSpy = jest.spyOn(global.console, 'error');

    await newPrincipalsAction(options);

    expect(fs.readFileSync).toHaveBeenCalledWith(options.filename);
    expect(errorSpy).toHaveBeenCalledWith('Error while uploading new principals:', errorMessage);
  });
});
