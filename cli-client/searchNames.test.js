const { searchNameAction } = require('./actions');
const apiRequest = require('./apiRequest');

jest.mock('./apiRequest');
jest.mock('./checkAuth');

describe('searchNameAction function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('successfully searches names', async () => {
    const options = { name: 'John Doe', format: 'json' };
    const responseData = { results: ['Result 1', 'Result 2'] };

    apiRequest.mockResolvedValueOnce(responseData);

    const logSpy = jest.spyOn(global.console, 'log');

    await searchNameAction(options);

    expect(apiRequest).toHaveBeenCalledWith('GET', 'searchname', {
      namePart: options.name,
      format: options.format
    });
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify(responseData, null, 2));
  });

  test('fails to search names', async () => {
    const options = { name: 'John Doe', format: 'json' };
    const errorMessage = 'Failed to search names';
    const error = new Error(errorMessage);

    apiRequest.mockRejectedValueOnce(error);

    const errorSpy = jest.spyOn(global.console, 'error');

    await searchNameAction(options);

    expect(apiRequest).toHaveBeenCalledWith('GET', 'searchname', {
      namePart: options.name,
      format: options.format
    });
    expect(errorSpy).toHaveBeenCalledWith('Error occurred while searching names:', error);
  });
});
