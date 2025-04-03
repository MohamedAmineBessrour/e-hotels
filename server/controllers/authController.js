const pool = require('../db');

const registerCustomer = async (req, res) => {
  const { name, ssn, dob, address } = req.body;

  // Calculate age from dob
  const birthYear = new Date(dob).getFullYear();
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  if (age < 18 || age > 120) {
    return res.status(400).json({ error: 'Invalid age. Must be between 18 and 120.' });
  }

  const placeholderCard = '1111222233334444';

  try {
    const result = await pool.query(
      `INSERT INTO Customer (Name, SSN, Address, Age, Card_Number, Registration_Date)
       VALUES ($1, $2, $3, $4, $5, CURRENT_DATE)
       RETURNING *`,
      [name, ssn, address, age, placeholderCard]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('❌ Registration failed:', err.message);
    res.status(500).json({ error: err.message });
  }
};

const loginCustomer = async (req, res) => {
  const { name, ssn } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM Customer WHERE Name = $1 AND SSN = $2`,
      [name, ssn]
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(401).json({ error: 'Invalid name or SSN' });
    }
  } catch (err) {
    console.error('❌ Login failed:', err.message);
    res.status(500).json({ error: err.message });
  }
};

const loginEmployee = async (req, res) => {
  const { name, ssn } = req.body;

  try {
    const result = await pool.query(
      `SELECT * FROM Employee WHERE Name = $1 AND SSN = $2`,
      [name, ssn]
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(401).json({ error: 'Invalid name or SSN' });
    }
  } catch (err) {
    console.error('❌ Employee login failed:', err.message);
    res.status(500).json({ error: err.message });
  }
};
// Exporting the functions to be used in routes
module.exports = {
  registerCustomer,
  loginCustomer,
  loginEmployee
};