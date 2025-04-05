const express = require('express');
const router = express.Router();
const {
  getEmployeeById,
  updateEmployee
} = require('../controllers/employeeController');

router.get('/:id', getEmployeeById);
router.put('/:id', updateEmployee);

module.exports = router;
