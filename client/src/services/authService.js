import axios from 'axios';

const API_URL = 'http://localhost:5001'; 

const authService = {
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/api/login`, credentials);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  signUp: async (User) => {
    try {
      const response = await axios.post(`${API_URL}/api/signup`, User);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default authService;
