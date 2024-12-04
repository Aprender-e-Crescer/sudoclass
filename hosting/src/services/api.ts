import axios from 'axios';
import { auth } from './firebase';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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