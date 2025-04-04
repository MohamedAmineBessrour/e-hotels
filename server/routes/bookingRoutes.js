const express = require('express');
const router = express.Router();
const { getAllBookings, checkInBooking } = require('../controllers/bookingController');

router.get('/all', getAllBookings);
router.post('/checkin', checkInBooking);

module.exports = router;