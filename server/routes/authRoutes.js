const express = require('express');
const router = express.Router();
const {
  registerCustomer,
  loginCustomer,
  loginEmployee
} = require('../controllers/authController.js');

router.post('/register', registerCustomer);
router.post('/login', loginCustomer);
router.post('/employee-login', loginEmployee);

module.exports = router;