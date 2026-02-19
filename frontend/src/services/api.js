import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

// Request interceptor to add token
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => Promise.reject(error));

export const moviesApi = {
    getTrending: () => api.get('/movies/trending'),
    getPopular: () => api.get('/movies/popular'),
    getTopRated: () => api.get('/movies/top-rated'),
    getUpcoming: () => api.get('/movies/upcoming'),
    getAction: () => api.get('/movies/action'),
    getComedy: () => api.get('/movies/comedy'),
    getSeries: () => api.get('/movies/series'),
    search: (query) => api.get(`/movies/search?q=${query}`),
    getDetails: (id) => api.get(`/movies/${id}`),
};

export const favoritesApi = {
    getAll: () => api.get('/favorites'),
    add: (movie) => api.post('/favorites', movie),
    remove: (movieId) => api.delete(`/favorites/${movieId}`),
};

export default api;
