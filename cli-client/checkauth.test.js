const fs = require('fs');
const checkAuth = require('./checkAuth');

jest.mock('fs');

// Mock process.exit
process.exit = jest.fn();

describe('checkAuth function', () => {
  
    test('error occurred while reading auth.json', () => {
        // Mock fs.existsSync to return true
        fs.existsSync.mockReturnValueOnce(true);
        // Mock fs.readFileSync to throw an error
        fs.readFileSync.mockImplementationOnce(() => { throw new Error('File read error'); });

        // Spy on console.error
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        // Call checkAuth
        checkAuth();

        // Assert against console.error
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error occurred while reading auth.json:', expect.any(Error));
    });

    test('auth.json exists and token is "foo"', () => {
        // Mock fs.existsSync to return true
        fs.existsSync.mockReturnValueOnce(true);
        // Mock fs.readFileSync to return data with token 'foo'
        fs.readFileSync.mockReturnValueOnce(JSON.stringify({ response: { token: 'foo' } }));
    
        // Spy on console.log
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    
        // Call checkAuth
        const result = checkAuth();
    
        // Assert that process.exit was not called
        expect(process.exit).not.toHaveBeenCalled();
        // Assert that the function returns true
        expect(result).toBe(true);
    });
    

    test('auth.json does not exist', () => {
        // Mock fs.existsSync to return false
        fs.existsSync.mockReturnValueOnce(false);

        // Spy on console.log
        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

        // Call checkAuth
        checkAuth();

        // Assert that process.exit was called
        expect(process.exit).toHaveBeenCalled();
        // Assert against console.log
        expect(consoleLogSpy).toHaveBeenCalledWith('Please log in first.');
    });

    test('error occurred while checking auth.json existence', () => {
        // Mock fs.existsSync to throw an error
        fs.existsSync.mockImplementationOnce(() => { throw new Error('File exists check error'); });

        // Spy on console.error
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        // Call checkAuth
        checkAuth();

        // Assert against console.error for the correct error message
        expect(consoleErrorSpy).toHaveBeenCalledWith('Error occurred while reading auth.json:', expect.any(Error));
    });
});