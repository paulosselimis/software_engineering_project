const { newEpisodeAction } = require('./actions');
const apiUpload = require('./apiUpload');
const FormData = require('form-data');
const fs = require('fs');

jest.mock('./apiUpload');
jest.mock('./checkAuth');
jest.mock('fs');

describe('newEpisodeAction function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('successfully uploads new episode', async () => {
    const options = { filename: 'testFile.tsv' };
    const fileData = 'Test file data';
    const responseData = { message: 'Upload successful' };

    fs.readFileSync.mockReturnValueOnce(fileData);
    apiUpload.mockResolvedValueOnce(responseData);

    const logSpy = jest.spyOn(global.console, 'log');

    await newEpisodeAction(options);

    expect(fs.readFileSync).toHaveBeenCalledWith(options.filename);
    expect(apiUpload).toHaveBeenCalledWith('titleepisode', expect.any(FormData));
    expect(logSpy).toHaveBeenCalledWith(responseData);
  });

  test('fails to upload new episode', async () => {
    const options = { filename: 'testFile.txt' };
    const errorMessage = 'Failed to upload';
    const error = new Error(errorMessage);

    fs.readFileSync.mockImplementationOnce(() => {
      throw error;
    });

    const errorSpy = jest.spyOn(global.console, 'error');

    await newEpisodeAction(options);

    expect(fs.readFileSync).toHaveBeenCalledWith(options.filename);
    expect(errorSpy).toHaveBeenCalledWith('Error while uploading new episode:', errorMessage);
  });
});
