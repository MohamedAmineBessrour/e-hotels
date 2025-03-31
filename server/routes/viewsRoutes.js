const express = require("express");
const router = express.Router();
const viewsController = require("../controllers/viewsController");

router.get("/available-rooms", viewsController.getAvailableRoomsPerArea);
router.get("/hotel-capacity", viewsController.getHotelTotalCapacity);

module.exports = router;
