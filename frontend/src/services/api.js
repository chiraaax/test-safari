import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ====================
// Tours API
// ====================
export const getTours = () => api.get(`/tours`);
export const getTourById = (id) => api.get(`/tours/${id}`);
export const createTour = (data) => api.post(`/tours`, data);
export const updateTour = (id, data) => api.put(`/tours/${id}`, data);
export const deleteTour = (id) => api.delete(`/tours/${id}`);

// ====================
// Rentals API
// ====================
export const getRentals = () => api.get(`/rentals`);
export const createRental = (data) => api.post(`/rentals`, data);
export const updateRental = (id, data) => api.put(`/rentals/${id}`, data);
export const deleteRental = (id) => api.delete(`/rentals/${id}`);

// ====================
// Packages API
// ====================
export const getPackages = () => api.get(`/packages`);
export const getPackage = (id) => api.get(`/packages/${id}`);
export const createPackage = (data) => api.post(`/packages`, data);
export const updatePackage = (id, data) => api.put(`/packages/${id}`, data);
export const deletePackage = (id) => api.delete(`/packages/${id}`);

export default api;
