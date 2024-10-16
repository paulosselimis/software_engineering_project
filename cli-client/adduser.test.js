const { addUserAction } = require('./actions');
const apiRequest = require('./apiRequest');

jest.mock('./apiRequest');
jest.mock('./checkAuth');

describe('addUserAction function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('adds a user successfully', async () => {

    const options = { username: 'testUser', password: 'testPassword' };
    const responseData = { message: 'User added successfully' };

    apiRequest.mockResolvedValueOnce(responseData);

    
    await addUserAction(options);

    // Assertions
    expect(apiRequest).toHaveBeenCalledWith('POST', `admin/usermod/${options.username}/${options.password}`);
    
  });

  test('fails to add a user', async () => {
    
    const options = { username: 'testUser', password: 'testPassword' };
    const errorMessage = 'Failed to add user';
    const error = new Error(errorMessage);

    apiRequest.mockRejectedValueOnce(error);
    const errorSpy = jest.spyOn(global.console, 'error');


    await addUserAction(options);

    // Assertions
    expect(apiRequest).toHaveBeenCalledWith('POST', `admin/usermod/${options.username}/${options.password}`);
    expect(errorSpy).toHaveBeenCalledWith('Error during user modification:', errorMessage);
  });
});
