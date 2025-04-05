const express = require("express");
const router = express.Router();
const {
  getHotelInfo,
  updateHotelInfo,
  insertRoom,
  deleteRoom,
  getRoomInfo,
  updateRoom 
} = require("../controllers/manageController");

router.get("/hotel/:id", getHotelInfo);
router.put("/hotel/:id", updateHotelInfo);
router.post("/room", insertRoom);
router.delete("/room", deleteRoom);
router.get("/room/:hotelId/:roomNumber", getRoomInfo);
router.put("/room/:hotelId/:roomNumber", updateRoom); 
module.exports = router;
