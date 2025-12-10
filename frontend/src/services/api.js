import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance for JSON
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create instance for file uploads (no Content-Type, let browser set multipart)
const apiUpload = axios.create({
  baseURL: API_URL,
});

// ====================
// Tours API
// ====================
export const getTours = () => api.get(`/tours`);
export const getTourById = (id) => api.get(`/tours/${id}`);
export const createTour = (data) => apiUpload.post(`/tours`, data); // Use FormData for upload
export const updateTour = (id, data) => apiUpload.put(`/tours/${id}`, data); // Use FormData for upload
export const deleteTour = (id) => api.delete(`/tours/${id}`);

// ====================
// Rentals API
// ====================
export const getRentals = () => api.get(`/rentals`);
export const createRental = (data) => apiUpload.post(`/rentals`, data); // Use FormData
export const updateRental = (id, data) => apiUpload.put(`/rentals/${id}`, data); // Use FormData
export const deleteRental = (id) => api.delete(`/rentals/${id}`);

// ====================
// Packages API (updated to use FormData for uploads)
// ====================
export const getPackages = () => api.get(`/packages`);
export const getPackage = (id) => api.get(`/packages/${id}`);
export const createPackage = (data) => apiUpload.post(`/packages`, data); // Changed to apiUpload for FormData
export const updatePackage = (id, data) => apiUpload.put(`/packages/${id}`, data); // Changed to apiUpload for FormData
export const deletePackage = (id) => api.delete(`/packages/${id}`);

// ====================
// Gallery API (new)
// ====================
export const getGallerys = () => api.get(`/gallery`);
export const getGalleryById = (id) => api.get(`/gallery/${id}`);
export const createGallery = (data) => apiUpload.post(`/gallery`, data); // Use FormData for upload
export const updateGallery = (id, data) => apiUpload.put(`/gallery/${id}`, data); // Use FormData for upload
export const deleteGallery = (id) => api.delete(`/gallery/${id}`);

export default api;