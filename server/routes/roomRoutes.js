const express = require('express');
const router = express.Router();
const { searchRooms, bookRoom } = require('../controllers/roomController');

router.post('/search', searchRooms);
router.post('/book', bookRoom);

module.exports = router;