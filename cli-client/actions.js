const axios = require('axios');
const https = require('https');
const fs = require('fs');
const FormData = require('form-data');

const checkAuth = require('./checkAuth');
const apiRequest = require('./apiRequest');
const apiUpload = require('./apiUpload');


// Login Action
const loginAction = async (options) => {
  try {
    const username = options.username;
    const password = options.password;
    if (fs.existsSync('auth.json')) {
      console.log('You are already logged in!');
    }
    const response = await apiRequest('POST', 'login', { username, password });

    console.log(response.data);
    console.log('Login successful!');
      // Save token for future requests
    fs.writeFileSync('auth.json', JSON.stringify({response}));
  } catch (error) {
    console.error('Error during login:', error.message);
  }
};


// Logout Action
const logoutAction = async () => {
  try {
    checkAuth();
    const response = await apiRequest('POST', 'logout');
    console.log('Logged out successfully!');
    fs.unlinkSync('auth.json');
  } catch (error) {
    console.error('Error during logout:', error.message);
  }
};

// Add User Action
const addUserAction = async (options) => {
  try {
    checkAuth();

    const username = options.username;
    const password = options.password;

    const response = await apiRequest('POST', `admin/usermod/${username}/${password}`);
    console.log(response);
  } catch (error) {
    console.error('Error during user modification:', error.message);
  }
};

// Check User Action
const checkUserAction = async (options) => {
  try {
    checkAuth();
    const username = options.username;
    const response = await apiRequest('GET', `admin/users/${username}`);
    console.log(response.data);
  } catch (error) {
    console.error('Error during user search:', error.message);
  }
};


// Health Check Action
const healthCheckAction = async () => {
  try {
    checkAuth();
    const response = await apiRequest('GET', 'admin/healthcheck');
    console.log(response);
  } catch (error) {
    console.error('Error during health check:', error.message);
  }
};


// Reset All Action
const resetAllAction = async () => {
  try {
    checkAuth();
    const response = await apiRequest('POST', 'admin/resetall');
    console.log(response);
  } catch (error) {
    console.error('Error during resetall:', error.message);
  }
};

// New Titles Action
const newTitlesAction = async (options) => {
    try {
      checkAuth();
      const filename = options.filename;
      
      const fileData = fs.readFileSync(filename);
      const formData = new FormData();
      formData.append('file', fileData, { filename });
  
      const response = await apiUpload('titlebasics', formData);
      console.log(response);
  
    } catch (error) {
      console.error('Error while uploading new titles:', error.message);
    }
  };


// New Akas Action
const newAkasAction = async (options) => {
  try {
    checkAuth();
    
    const filename = options.filename;
   
    
    const fileData = fs.readFileSync(filename);
    const formData = new FormData();
    formData.append('file', fileData, { filename });

    const response = await apiUpload('titleakas', formData);
    console.log(response);

  } catch (error) {
    console.error('Error while uploading new akas:', error.message);
  }
};

// New Names Action
const newNamesAction = async (options) => {
  try {
    checkAuth();
    
    const filename = options.filename;
    

    const fileData = fs.readFileSync(filename);
    const formData = new FormData();
    formData.append('file', fileData, { filename });

    const response = await apiUpload('namebasics', formData);
    console.log(response);

  } catch (error) {
    console.error('Error while uploading new names:', error.message);
  }
};

// New Crew Action
const newCrewAction = async (options) => {
  try {
    checkAuth();
    
    const filename = options.filename;
    

    const fileData = fs.readFileSync(filename);
    const formData = new FormData();
    formData.append('file', fileData, { filename });

    const response = await apiUpload('titlecrew', formData);
    console.log(response);

  } catch (error) {
    console.error('Error while uploading new crew:', error.message);
  }
};


// New Episode Action
const newEpisodeAction = async (options) => {
  try {
    checkAuth();
    
    const filename = options.filename;
    
    
    const fileData = fs.readFileSync(filename);
    const formData = new FormData();
    formData.append('file', fileData, { filename });

    const response = await apiUpload('titleepisode', formData);
    console.log(response);

  } catch (error) {
    console.error('Error while uploading new episode:', error.message);
  }
};


// New Principals Action
const newPrincipalsAction = async (options) => {
  try {
    checkAuth();
    
    const filename = options.filename;
  
    const fileData = fs.readFileSync(filename);
    const formData = new FormData();
    formData.append('file', fileData, { filename });

    const response = await apiUpload('titleprincipals', formData);
    console.log(response);

  } catch (error) {
    console.error('Error while uploading new principals:', error.message);
  }
};


// New Ratings Action
const newRatingsAction = async (options) => {
  try {
    checkAuth();
    
    const filename = options.filename;

    const fileData = fs.readFileSync(filename);
    const formData = new FormData();
    formData.append('file', fileData, { filename });

    const response = await apiUpload('titleratings', formData);
    console.log(response);

  } catch (error) {
    console.error('Error while uploading new ratings:', error.message);
  }
};


// TitleID Action
const getTitleAction = async (options) => {
  try {
    checkAuth();
    const { titleid } = options;
    const response = await apiRequest('GET', `title/${titleid}`);
    console.log(response);
} catch (error) {
  console.error('Error fetching title ID:', error.message);
}
};


// Search Title Action
const searchTitleAction = async (options) => {
  try {
    checkAuth();
    const tqueryObject = {
      titlePart: options.titlepart,
      format: options.format
    };
    
    const response = await apiRequest('GET', 'searchtitle', tqueryObject);
    const string=JSON.stringify(response, null, 2);
    console.log(string.status);
    console.log(string);

  } catch (error) {
    console.error('Error fetching title ID:', error.message);
  }
};

// By Genre Action
const byGenreAction = async (options) => {
  try {
    checkAuth();
    const gqueryObject = {
      qgenre: options.genre,
      minrating: options.min,
      yrFrom: options.from,
      yrTo: options.to,
      format: options.format
    };

    const response = await apiRequest('GET', 'bygenre', gqueryObject);
    console.log(JSON.stringify(response, null, 1));
  // console.log(response);
    
  } catch (error) {
    console.error('Error occurred while searching by genre:', error);
  }
};

// Name Action
const getNameAction = async (options) => {
  try {
    checkAuth();
    const { nameid } = options;
    const response = await apiRequest('GET', `name/${nameid}`);
    console.log(JSON.stringify(response, null, 2));
} catch (error) {
  console.error('Error fetching name ID:', error.message);
}
};

// Search Name Action
const searchNameAction = async (options) => {
  try {
    checkAuth();
    const nqueryObject = {
      namePart: options.name,
      format: options.format
    };
    
    const response = await apiRequest('GET', 'searchname', nqueryObject);
    console.log(JSON.stringify(response, null, 2));

  } catch (error) {
    console.error('Error occurred while searching names:', error);
  }
};

module.exports = {
    loginAction,
    logoutAction,
    addUserAction,
    checkUserAction,
    healthCheckAction,
    resetAllAction,
    newTitlesAction,
    newAkasAction,
    newNamesAction,
    newCrewAction,
    newEpisodeAction,
    newPrincipalsAction,
    newRatingsAction,
    getTitleAction,
    searchTitleAction,
    byGenreAction,
    getNameAction,
    searchNameAction
};
