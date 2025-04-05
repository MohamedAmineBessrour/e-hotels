const express = require('express');
const router = express.Router();
const { getAllBookings, checkInBooking, insertRenting } = require('../controllers/bookingController');

router.get('/all', getAllBookings);
router.post('/checkin', checkInBooking);
router.post('/renting', insertRenting);

module.exports = router;