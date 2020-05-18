import axios from 'axios';

export const API_KEY = 'e91d07320b1c5eb40ea1f389ef9c4261';

export const http = axios.create({
    baseURL: 'https://api.themoviedb.org/3/search/',
})