const express = require('express');
const router = express.Router();
const { searchRooms } = require('../controllers/roomController');

router.post('/search', searchRooms);

module.exports = router;