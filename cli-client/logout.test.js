const { logoutAction } = require('./actions');
const fs = require('fs');
const apiRequest = require('./apiRequest');


jest.mock('fs');
jest.mock('./apiRequest');
jest.mock('./checkAuth');


describe('logoutAction function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('logs out successfully', async () => {
    // Mock response data for successful logout
    const responseData = { message: 'Logout successful' };
    
    // Mock apiRequest to resolve with responseData
    apiRequest.mockResolvedValueOnce(responseData);

    // Spy on console.log
    const logSpy = jest.spyOn(global.console, 'log');

    // Call logoutAction
    await logoutAction();

    // Assertions
    expect(apiRequest).toHaveBeenCalledWith('POST', 'logout');
    expect(logSpy).toHaveBeenCalledWith('Logged out successfully!');
    expect(fs.unlinkSync).toHaveBeenCalledWith('auth.json');
  });

  test('fails to log out', async () => {
    // Mock error message for failed logout
    const errorMessage = 'Failed to logout';

    // Mock error object
    const error = new Error(errorMessage);

    // Mock apiRequest to reject with error
    apiRequest.mockRejectedValueOnce(error);

    // Mock fs.unlinkSync to do nothing
    jest.spyOn(fs, 'unlinkSync').mockImplementation(() => {});

    // Spy on console.error
    const errorSpy = jest.spyOn(global.console, 'error');

    // Call logoutAction
    await logoutAction();

    // Assertions
    expect(apiRequest).toHaveBeenCalledWith('POST', 'logout');
    expect(errorSpy).toHaveBeenCalledWith('Error during logout:', errorMessage);
    expect(fs.unlinkSync).not.toHaveBeenCalled(); // Ensure fs.unlinkSync was not called
  });
});
