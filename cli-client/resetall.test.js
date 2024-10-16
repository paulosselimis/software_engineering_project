const { resetAllAction } = require('./actions');
const apiRequest = require('./apiRequest');

jest.mock('./apiRequest');
jest.mock('./checkAuth');

describe('resetAllAction function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('successfully resets all', async () => {
    const responseData = { message: 'Reset all successful' };
    apiRequest.mockResolvedValueOnce(responseData);

    const logSpy = jest.spyOn(global.console, 'log');

    // Call resetAllAction
    await resetAllAction();

    // Assertions
    expect(apiRequest).toHaveBeenCalledWith('POST', 'admin/resetall');
    expect(logSpy).toHaveBeenCalledWith(responseData);
  });

  test('fails to reset all', async () => {
    const errorMessage = 'Failed to reset all';
    const error = new Error(errorMessage);


    apiRequest.mockRejectedValueOnce(error);
    const errorSpy = jest.spyOn(global.console, 'error');

    // Call resetAllAction
    await resetAllAction();

    // Assertions
    expect(apiRequest).toHaveBeenCalledWith('POST', 'admin/resetall');
    expect(errorSpy).toHaveBeenCalledWith('Error during resetall:', errorMessage);
    });
});
