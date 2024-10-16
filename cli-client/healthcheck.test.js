const { healthCheckAction } = require('./actions');
const apiRequest = require('./apiRequest');

jest.mock('./apiRequest');
jest.mock('./checkAuth');

describe('healthCheckAction function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('successfully checks health', async () => {
    const responseData = { status: 'OK' };
    apiRequest.mockResolvedValueOnce(responseData);

    const logSpy = jest.spyOn(global.console, 'log');

    await healthCheckAction();

    // Assertions
    expect(apiRequest).toHaveBeenCalledWith('GET', 'admin/healthcheck');
    expect(logSpy).toHaveBeenCalledWith(responseData);
    
  });

  test('fails to check health', async () => {
    const errorMessage = 'Failed health check';
    const error = new Error(errorMessage);

    apiRequest.mockRejectedValueOnce(error);

    const errorSpy = jest.spyOn(global.console, 'error');

    // Call healthCheckAction
    await healthCheckAction();

    // Assertions
    expect(apiRequest).toHaveBeenCalledWith('GET', 'admin/healthcheck');
    expect(errorSpy).toHaveBeenCalledWith('Error during health check:', errorMessage);
  });
});
