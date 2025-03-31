const db = require("../db/index");

exports.getAvailableRoomsPerArea = async (req, res) => {
  try {
    const { city, area } = req.query;
    const fullArea = `${area}, ${city}`;
    const query = `
      SELECT Area, Available_Rooms
      FROM Available_Rooms_Per_Area
      WHERE Area ILIKE $1
    `;
    const values = [`%${fullArea}%`]; 
    const result = await db.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching available rooms:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getHotelTotalCapacity = async (req, res) => {
  try {
    const { area } = req.query;
    const query = `
      SELECT Hotel_ID, Area, Total_Capacity
      FROM Hotel_Total_Capacity
      WHERE Area ILIKE $1
    `;
    const values = [`%${area}%`];
    const result = await db.query(query, values);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching hotel capacity:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
