const express = require('express');
const router = express.Router();
const {
  getCustomerById,
  updateCustomer
} = require('../controllers/customerController');

router.get('/:id', getCustomerById);
router.put('/:id', updateCustomer);

module.exports = router;
