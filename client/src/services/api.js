import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

/* --------- HOTEL + ROOM ----------- */
export const fetchHotels = () => API.get('/hotels');
export const fetchAvailableRooms = (filters) => API.post('/rooms/search', filters);

/* --------- AUTH ----------- */
export const registerCustomer = (formData) => API.post('/auth/register', formData);
export const loginCustomer = (formData) => API.post('/auth/login', formData);
export const loginEmployee = (formData) => API.post('/auth/employee-login', formData);