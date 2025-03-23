import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchHotels = () => API.get('/hotels');
export const fetchAvailableRooms = (filters) => API.post('/rooms/search', filters);
// Add more functions as needed