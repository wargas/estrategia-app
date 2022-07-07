import axios from "axios";

const Api = axios.create({
    // baseURL: 'http://localhost:3333',
    baseURL: 'https://puppeteer-testes.herokuapp.com',
})

Api.interceptors.request.use((config) => {

    const token = localStorage.getItem('auth_token');

    if(token) {
        config.headers = {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    }

    return config;
}, error => {
    return Error(error)
})

export default Api;

