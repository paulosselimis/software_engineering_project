const fs = require('fs');

const checkAuth = () => {
  try {
    if (fs.existsSync('auth.json')) {
      const data = fs.readFileSync('auth.json', 'utf8');
      const jsonData = JSON.parse(data);

      if (jsonData.response.token === 'foo') {
        //console.log('Token match. Proceed'); 
        return true;
      }
    } else {
      console.log('Please log in first.');
      process.exit();
    }
  } catch (err) {
    console.error('Error occurred while reading auth.json:', err);
  }
};

module.exports = checkAuth;
