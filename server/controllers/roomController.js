const pool = require('../db');

const searchRooms = async (req, res) => {
  const { start_date, end_date, capacity, area } = req.body;

  try {
    const result = await pool.query(
      `SELECT r.*, h.address AS hotel_address
       FROM Room r
       JOIN Hotel h ON r.hotel_id = h.hotel_id
       WHERE r.capacity >= $1
       AND h.address ILIKE $2
       AND r.room_id NOT IN (
         SELECT room_id FROM Booking
         WHERE NOT ($2 < start_date OR $1 > end_date)
       )`,
      [capacity || 1, `%${area || ''}%`, start_date, end_date]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { searchRooms };