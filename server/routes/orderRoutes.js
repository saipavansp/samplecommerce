const express = require('express');
const { createOrder, getMyOrders, getAllOrders, getOrderById, updateOrderStatus } = require('../controllers/orderController');
const { auth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, createOrder);
router.get('/', auth, getMyOrders);
router.get('/admin/all', auth, requireAdmin, getAllOrders);
router.get('/:id', auth, getOrderById);
router.put('/:id', auth, requireAdmin, updateOrderStatus);

module.exports = router;


