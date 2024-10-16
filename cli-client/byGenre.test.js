const { byGenreAction } = require('./actions');
const apiRequest = require('./apiRequest');

jest.mock('./apiRequest');
jest.mock('./checkAuth');

describe('byGenreAction function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('successfully searches by genre', async () => {
    const options = {
      genre: 'Action',
      min: 7,
      from: 2000,
      to: 2020,
      format: 'json'
    };
    const responseData = { results: ['Result 1', 'Result 2'] };

    apiRequest.mockResolvedValueOnce(responseData);

    const logSpy = jest.spyOn(global.console, 'log');

    await byGenreAction(options);

    expect(apiRequest).toHaveBeenCalledWith('GET', 'bygenre', {
      qgenre: options.genre,
      minrating: options.min,
      yrFrom: options.from,
      yrTo: options.to,
      format: options.format
    });
    expect(logSpy).toHaveBeenCalledWith(JSON.stringify(responseData, null, 1));
  });

  test('fails to search by genre', async () => {
    const options = {
      genre: 'Action',
      min: 7,
      from: 2000,
      to: 2020,
      format: 'json'
    };
    const errorMessage = 'Failed to search by genre';
    const error = new Error(errorMessage);

    apiRequest.mockRejectedValueOnce(error);

    const errorSpy = jest.spyOn(global.console, 'error');

    await byGenreAction(options);

    expect(apiRequest).toHaveBeenCalledWith('GET', 'bygenre', {
      qgenre: options.genre,
      minrating: options.min,
      yrFrom: options.from,
      yrTo: options.to,
      format: options.format
    });
    expect(errorSpy).toHaveBeenCalledWith('Error occurred while searching by genre:', error);
  });
});
