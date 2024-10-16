const { getTitleAction } = require('./actions');
const apiRequest = require('./apiRequest');

jest.mock('./apiRequest');
jest.mock('./checkAuth');

describe('getTitleAction function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('successfully fetches title by ID', async () => {
    const options = { titleid: '12345' };
    const responseData = { title: 'Test Title' };

    apiRequest.mockResolvedValueOnce(responseData);

    const logSpy = jest.spyOn(global.console, 'log');

    await getTitleAction(options);

    expect(apiRequest).toHaveBeenCalledWith('GET', `title/${options.titleid}`);
    expect(logSpy).toHaveBeenCalledWith(responseData);
  });

  test('fails to fetch title by ID', async () => {
    const options = { titleid: '12345' };
    const errorMessage = 'Failed to fetch title';
    const error = new Error(errorMessage);

    apiRequest.mockRejectedValueOnce(error);

    const errorSpy = jest.spyOn(global.console, 'error');

    await getTitleAction(options);

    expect(apiRequest).toHaveBeenCalledWith('GET', `title/${options.titleid}`);
    expect(errorSpy).toHaveBeenCalledWith('Error fetching title ID:', errorMessage);
  });
});
