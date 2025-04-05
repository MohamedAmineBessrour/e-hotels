const pool = require('../db');

// Utility function to normalize SSN
const normalizeSSN = (ssn) => ssn.replace(/-/g, '').trim();

const registerCustomer = async (req, res) => {
  const { name, ssn, dob, address, card_number, registration_date } = req.body;

  // Calculate age from dob
  const birthYear = new Date(dob).getFullYear();
  const currentYear = new Date().getFullYear();
  const age = currentYear - birthYear;

  if (age < 18 || age > 120) {
    return res.status(400).json({ error: 'Invalid age. Must be between 18 and 120.' });
  }

  const card = card_number || null;
  const registrationDate = registration_date || new Date().toISOString().split('T')[0];

  try {
    const result = await pool.query(
      `INSERT INTO Customer (Name, SSN, Address, Age, Card_Number, Registration_Date)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [name, ssn, address, age, card, registrationDate]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    if (err.code === '23505') { // Unique violation error code
      return res.status(409).json({ error: 'SSN already registered.' });
    }
    console.error('❌ Registration failed:', err.message);
    res.status(500).json({ error: err.message });
  }
};

const loginCustomer = async (req, res) => {
  const name = req.body.name;
  const ssn = normalizeSSN(req.body.ssn);

  try {
    const result = await pool.query(
      `SELECT * FROM Customer WHERE Name = $1`,
      [name]
    );

    const matchedUser = result.rows.find(
      (row) => normalizeSSN(row.ssn) === ssn
    );

    if (matchedUser) {
      res.status(200).json(matchedUser);
    } else {
      res.status(401).json({ error: 'Invalid name or SSN' });
    }
  } catch (err) {
    console.error('❌ Login failed:', err.message);
    res.status(500).json({ error: err.message });
  }
};

const loginEmployee = async (req, res) => {
  const name = req.body.name;
  const ssn = normalizeSSN(req.body.ssn);

  try {
    const result = await pool.query(
      `SELECT * FROM Employee WHERE Name = $1`,
      [name]
    );

    const matchedEmployee = result.rows.find(
      (row) => normalizeSSN(row.ssn) === ssn
    );

    if (matchedEmployee) {
      res.status(200).json(matchedEmployee);
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