const express = require('express');
const { createOrder, getMyOrders, getOrderById, updateOrderStatus } = require('../controllers/orderController');
const { auth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, createOrder);
router.get('/', auth, getMyOrders);
router.get('/:id', auth, getOrderById);
router.put('/:id', auth, requireAdmin, updateOrderStatus);

module.exports = router;


