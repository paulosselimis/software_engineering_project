const { searchTitleAction } = require('./actions');
const apiRequest = require('./apiRequest');

jest.mock('./apiRequest');
jest.mock('./checkAuth');

describe('searchTitleAction function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('successfully searches titles', async () => {
    const options = { titlepart: 'Test Title', format: 'movie' };
    const responseData = { results: ['Result 1', 'Result 2'] };

    apiRequest.mockResolvedValueOnce(responseData);

    const logSpy = jest.spyOn(global.console, 'log');

    await searchTitleAction(options);

    expect(apiRequest).toHaveBeenCalledWith('GET', 'searchtitle', {
      titlePart: options.titlepart,
      format: options.format
    });
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify(responseData, null, 2));
  });

  test('fails to search titles', async () => {
    const options = { titlepart: 'Test Title', format: 'movie' };
    const errorMessage = 'Failed to search titles';
    const error = new Error(errorMessage);

    apiRequest.mockRejectedValueOnce(error);

    const errorSpy = jest.spyOn(global.console, 'error');

    await searchTitleAction(options);

    expect(apiRequest).toHaveBeenCalledWith('GET', 'searchtitle', {
      titlePart: options.titlepart,
      format: options.format
    });
    expect(errorSpy).toHaveBeenCalledWith('Error fetching title ID:', error.message);
  });
});
