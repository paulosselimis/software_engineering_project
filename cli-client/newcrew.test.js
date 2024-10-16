const { newCrewAction } = require('./actions');
const apiUpload = require('./apiUpload');
const FormData = require('form-data');
const fs = require('fs');

jest.mock('./apiUpload');
jest.mock('./checkAuth');
jest.mock('fs');

describe('newCrewAction function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('successfully uploads new crew', async () => {
    // Mock options for uploading new crew
    const options = { filename: 'testFile.tsv' };
    const fileData = 'Test file data';
    const responseData = { message: 'Upload successful' };

    fs.readFileSync.mockReturnValueOnce(fileData);
    apiUpload.mockResolvedValueOnce(responseData);
    // Spy on console.log
    const logSpy = jest.spyOn(global.console, 'log');
    // Call newCrewAction
    await newCrewAction(options);

    // Assertions
    expect(fs.readFileSync).toHaveBeenCalledWith(options.filename);
    expect(apiUpload).toHaveBeenCalledWith('titlecrew', expect.any(FormData));
    expect(logSpy).toHaveBeenCalledWith(responseData);
  });

  test('fails to upload new crew', async () => {
    // Mock options for uploading new crew
    const options = { filename: 'testFile.txt' };
    const errorMessage = 'Failed to upload';
    const error = new Error(errorMessage);

    // Mock fs.readFileSync to throw error
    fs.readFileSync.mockImplementationOnce(() => {
      throw error;
    });

    const errorSpy = jest.spyOn(global.console, 'error');

    await newCrewAction(options);

    // Assertions
    expect(fs.readFileSync).toHaveBeenCalledWith(options.filename);
    expect(errorSpy).toHaveBeenCalledWith('Error while uploading new crew:', errorMessage);
  });
});
