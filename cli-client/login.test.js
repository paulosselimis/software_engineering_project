const { loginAction } = require('./actions');
const fs = require('fs');
const apiRequest = require('./apiRequest');

jest.mock('fs');
jest.mock('./apiRequest');

describe('loginAction function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('logs in successfully', async () => {
    const responseData = { token: 'foo' };
    const options = { username: 'testUser', password: 'testPassword' };
    const expectedAuthData = JSON.stringify({ response: responseData });
    const writeFileSyncMock = jest.spyOn(fs, 'writeFileSync').mockImplementation(() => {});
    apiRequest.mockResolvedValueOnce(responseData);

    const logSpy = jest.spyOn(global.console, 'log');

    await loginAction(options);

    expect(apiRequest).toHaveBeenCalledWith('POST', 'login', { username: options.username, password: options.password });
    expect(writeFileSyncMock).toHaveBeenCalledWith('auth.json', expectedAuthData);
    expect(logSpy).toHaveBeenCalledWith('Login successful!');
  });

  test('fails to login', async () => {
    const errorMessage = 'Invalid credentials';
    const options = { username: 'testUser', password: 'testPassword' };
    const error = new Error(errorMessage);
    apiRequest.mockRejectedValueOnce(error);

    const errorSpy = jest.spyOn(global.console, 'error');

    await loginAction(options);

    expect(apiRequest).toHaveBeenCalledWith('POST', 'login', { username: options.username, password: options.password });
    expect(errorSpy).toHaveBeenCalledWith('Error during login:', errorMessage);
  });
});
