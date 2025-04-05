const pool = require('../db');

// GET employee by ID
const getEmployeeById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await pool.query('SELECT * FROM Employee WHERE Employee_ID = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    const row = result.rows[0];
    res.json({
      employee_id: row.employee_id,
      hotel_id: row.hotel_id,
      ssn: row.ssn,
      age: row.age,
      name: row.name,
      address: row.address,
    });
  } catch (err) {
    console.error('❌ Fetch employee failed:', err.message);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE employee
const updateEmployee = async (req, res) => {
  const id = req.params.id;
  const { hotel_id, ssn, age, name, address } = req.body;

  try {
    const result = await pool.query(
      `UPDATE Employee 
       SET Hotel_ID=$1, SSN=$2, Age=$3, Name=$4, Address=$5 
       WHERE Employee_ID=$6 
       RETURNING *`,
      [hotel_id, ssn, age, name, address, id]
    );

    const row = result.rows[0];
    res.json({
      employee_id: row.employee_id,
      hotel_id: row.hotel_id,
      ssn: row.ssn,
      age: row.age,
      name: row.name,
      address: row.address,
    });
  } catch (err) {
    console.error('❌ Update employee failed:', err.message);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getEmployeeById,
  updateEmployee
};
