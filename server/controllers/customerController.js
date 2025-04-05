const pool = require('../db');

// GET single customer by ID
const getCustomerById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM Customer WHERE Customer_ID = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    const row = result.rows[0];

    // Normalize field names
    res.json({
      customer_id: row.customer_id,
      name: row.name,
      ssn: row.ssn,
      age: row.age,
      address: row.address,
      card_number: row.card_number,
      registration_date: row.registration_date,
    });
  } catch (err) {
    console.error('❌ Fetch customer failed:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE customer by ID
const updateCustomer = async (req, res) => {
  const id = req.params.id;
  const { name, ssn, age, address, card_number } = req.body;

  try {
    const result = await pool.query(
      `UPDATE Customer 
       SET Name=$1, SSN=$2, Age=$3, Address=$4, Card_Number=$5 
       WHERE Customer_ID=$6 
       RETURNING *`,
      [name, ssn, age, address, card_number, id]
    );

    const row = result.rows[0];

    res.json({
      customer_id: row.customer_id,
      name: row.name,
      ssn: row.ssn,
      age: row.age,
      address: row.address,
      card_number: row.card_number,
      registration_date: row.registration_date,
    });
  } catch (err) {
    console.error('❌ Update customer failed:', err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getCustomerById,
  updateCustomer,
};
