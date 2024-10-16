const { getNameAction } = require('./actions');
const apiRequest = require('./apiRequest');

jest.mock('./apiRequest');
jest.mock('./checkAuth');

describe('getNameAction function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('successfully fetches name by ID', async () => {
    const options = { nameid: '12345' };
    const responseData = { name: 'Test Name' };

    apiRequest.mockResolvedValueOnce(responseData);

    const logSpy = jest.spyOn(global.console, 'log');

    await getNameAction(options);

    expect(apiRequest).toHaveBeenCalledWith('GET', `name/${options.nameid}`);
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify(responseData, null, 2));
  });

  test('fails to fetch name by ID', async () => {
    const options = { nameid: '12345' };
    const errorMessage = 'Failed to fetch name';
    const error = new Error(errorMessage);

    apiRequest.mockRejectedValueOnce(error);

    const errorSpy = jest.spyOn(global.console, 'error');

    await getNameAction(options);

    expect(apiRequest).toHaveBeenCalledWith('GET', `name/${options.nameid}`);
    expect(errorSpy).toHaveBeenCalledWith('Error fetching name ID:', errorMessage);
  });
});
