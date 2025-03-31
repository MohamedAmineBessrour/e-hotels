const pool = require('../db');

const registerCustomer = async (req, res) => {
  const { name, ssn, dob, address } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO Customer (full_name, ssn, dob, address)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [name, ssn, dob, address]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const loginCustomer = async (req, res) => {
  const { name, ssn } = req.body;
  try {
    const result = await pool.query(
      `SELECT * FROM Customer WHERE full_name = $1 AND ssn = $2`,
      [name, ssn]
    );
    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(401).json({ error: 'Invalid name or SSN' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerCustomer, loginCustomer };