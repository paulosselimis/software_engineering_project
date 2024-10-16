const { checkUserAction } = require('./actions');
const apiRequest = require('./apiRequest');

jest.mock('./apiRequest');
jest.mock('./checkAuth');

describe('checkUserAction function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('successfully checks user', async () => {

    const options = { username: 'testUser' };
    const responseData = { data: { username: 'testUser', role: 'admin' } };

    apiRequest.mockResolvedValueOnce(responseData);
    const logSpy = jest.spyOn(global.console, 'log');

    await checkUserAction(options);

    expect(apiRequest).toHaveBeenCalledWith('GET', `admin/users/${options.username}`);
    expect(logSpy).toHaveBeenCalledWith(responseData.data);
  });

  test('fails to check user', async () => {
    
    const options = { username: 'testUser' };
    const errorMessage = 'Failed to check user';
    const error = new Error(errorMessage);
    apiRequest.mockRejectedValueOnce(error);

    const errorSpy = jest.spyOn(global.console, 'error');

    await checkUserAction(options);
    
    expect(apiRequest).toHaveBeenCalledWith('GET', `admin/users/${options.username}`);
    expect(errorSpy).toHaveBeenCalledWith('Error during user search:', errorMessage);
    
  });
});
