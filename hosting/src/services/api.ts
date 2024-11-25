import axios from 'axios';
import { auth } from './firebase';

const api = axios.create({
    baseURL: 'https://us-central1-sudo-class-staging.cloudfunctions.net/api/',
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