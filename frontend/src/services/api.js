import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tours API
export const getTours = () => api.get('/tours');
export const getTour = (id) => api.get(`/tours/${id}`);
export const createTour = (data) => api.post('/tours', data);

// Car Rentals API
export const getRentals = () => api.get('/rentals');
export const getRental = (id) => api.get(`/rentals/${id}`);
export const createRental = (data) => api.post('/rentals', data);

// Packages API
export const getPackages = () => api.get('/packages');
export const getPackage = (id) => api.get(`/packages/${id}`);
export const createPackage = (data) => api.post('/packages', data);

export default api;

