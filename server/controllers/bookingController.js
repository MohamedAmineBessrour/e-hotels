const pool = require('../db');

const getAllBookings = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT b.*, c.Name AS customer_name
       FROM Booking b
       JOIN Customer c ON b.Customer_ID = c.Customer_ID
       ORDER BY b.Start_Date DESC`
    );

    res.status(200).json({ bookings: result.rows });
  } catch (err) {
    console.error('❌ Failed to fetch bookings:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
const checkInBooking = async (req, res) => {
  const { bookingId } = req.body;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Get booking details
    const bookingRes = await client.query(
      `SELECT * FROM Booking WHERE Booking_ID = $1`,
      [bookingId]
    );
    const booking = bookingRes.rows[0];
    if (!booking) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Booking not found' });
    }

    // 2. Get room price
    const roomRes = await client.query(
      `SELECT Price FROM Room WHERE Hotel_ID = $1 AND Room_Number = $2`,
      [booking.hotel_id, booking.room_number]
    );
    const room = roomRes.rows[0];
    if (!room) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Room not found' });
    }

    const price = room.price;

    // 3. Insert into Renting
    const rentingRes = await client.query(
      `INSERT INTO Renting (Customer_ID, Hotel_ID, Room_Number, Start_Date, End_Date, Price)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        booking.customer_id,
        booking.hotel_id,
        booking.room_number,
        booking.start_date,
        booking.end_date,
        price,
      ]
    );

    // 4. Delete the Booking
    await client.query(
      `DELETE FROM Booking WHERE Booking_ID = $1`,
      [bookingId]
    );

    await client.query('COMMIT');

    res.status(201).json({ message: '✅ Customer checked in', renting: rentingRes.rows[0] });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('❌ Check-in failed:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  } finally {
    client.release();
  }
};

const insertRenting = async (req, res) => {
  const { customerId, hotelId, roomNumber, startDate, endDate } = req.body;

  try {
    // 1. Check if the room exists and is available
    const roomResult = await pool.query(
      `SELECT Price, Availability FROM Room WHERE Hotel_ID = $1 AND Room_Number = $2`,
      [hotelId, roomNumber]
    );

    if (roomResult.rows.length === 0) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const room = roomResult.rows[0];
    if (!room.availability) {
      return res.status(400).json({ error: 'Room is not available for rent' });
    }

    const price = room.price;

    // 2. Insert renting entry
    const rentingRes = await pool.query(
      `INSERT INTO Renting (Customer_ID, Hotel_ID, Room_Number, Start_Date, End_Date, Price)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [customerId, hotelId, roomNumber, startDate, endDate, price]
    );

    // 3. Set room as unavailable
    await pool.query(
      `UPDATE Room SET Availability = FALSE WHERE Hotel_ID = $1 AND Room_Number = $2`,
      [hotelId, roomNumber]
    );

    res.status(201).json({ message: '✅ Room rented successfully', renting: rentingRes.rows[0] });
  } catch (err) {
    console.error('❌ Failed to insert renting:', err.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports = { getAllBookings, checkInBooking, insertRenting };
