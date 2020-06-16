import axios from 'axios';

const api = axios.create({
    baseURL: 'https://eletrodomesticos.herokuapp.com',
});

export default api;

