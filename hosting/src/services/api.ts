import axios from 'axios';
import { auth } from './firebase';

const api = axios.create({
    baseURL: 'http://127.0.0.1:5001/sudo-class-staging/us-central1/api',
});

api.interceptors.request.use(async function (config) {
    await auth.authStateReady()
    const token = await auth.currentUser?.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
    
    return config;
}, function (error) {
    // Faz alguma coisa com o erro da requisição
    return Promise.reject(error);
});

export { api };