import axios from 'axios';
import { auth } from './firebase';

const api = axios.create({
    baseURL: 'https://us-central1-sudo-class-staging.cloudfunctions.net/api/',
});

api.interceptors.request.use(async function (config) {
    await auth.authStateReady()

    config.headers.Authorization = `Bearer ${auth.currentUser?.getIdToken()}`;
    
    return config;
}, function (error) {
    // Faz alguma coisa com o erro da requisição
    return Promise.reject(error);
});

export { api };