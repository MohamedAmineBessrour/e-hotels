import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

/* --------- HOTEL + ROOM ----------- */
export const fetchHotels = () => API.get('/hotels');
export const fetchAvailableRooms = (filters) => API.post('/rooms/search', filters);
export const bookRoom = (bookingData) => API.post('/rooms/book', bookingData);

/* --------- AUTH ----------- */
export const registerCustomer = (formData) => API.post('/auth/register', formData);
export const loginCustomer = (formData) => API.post('/auth/login', formData);
export const loginEmployee = (formData) => API.post('/auth/employee-login', formData);

export const fetchAllBookings = async () => {
    const res = await fetch('/api/bookings/all');
    if (!res.ok) throw new Error('Failed to fetch bookings');
    return res.json();
  };
  
export const checkInBooking = async (bookingId) => {
  const res = await fetch('/api/bookings/checkin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ bookingId }),
  });
  if (!res.ok) throw new Error('Failed to check in');
  return res.json();
};
