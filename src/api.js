const { default: axios } = require('axios');

const apiRequest = async (url, bearerToken, data) => {
  try {
    const response = await axios({
      url,
      method: 'POST',
      headers: {
        Authorization: bearerToken,
      },
      data,
    });
    return response.data;
  } catch (error) {
    console.error(`Error in API Request: ${error}`);
    throw error;
  }
};

module.exports = { apiRequest };
