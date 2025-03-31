import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

/* --------- HOTEL + ROOM ----------- */
export const fetchHotels = () => API.get('/hotels'); // (if you implement this later)
export const fetchAvailableRooms = (filters) => API.post('/rooms/search', filters);

/* --------- CUSTOMER AUTH ----------- */
export const registerCustomer = (formData) => API.post('/customers/register', formData);
export const loginCustomer = (formData) => API.post('/customers/login', formData);