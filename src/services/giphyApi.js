import axios from 'axios';

const apiKey = 'SUA_API_KEY_AQUI'; // Substitua pela sua API key
const api = axios.create({
  baseURL: 'https://api.giphy.com/v1',
  params: {
    api_key: apiKey,
    limit: 20,
  },
});

export default api;
