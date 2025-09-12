const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, billingAddress, notes } = req.body;
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items required' });
    }
    // Build order items from current product prices
    const productIds = items.map((i) => i.productId);
    const products = await Product.find({ _id: { $in: productIds } });
    const productMap = new Map(products.map((p) => [p._id.toString(), p]));

    const orderItems = items.map((i) => {
      const p = productMap.get(i.productId);
      if (!p) throw new Error('Invalid product');
      return {
        productId: p._id,
        quantity: i.quantity,
        price: p.discountPrice || p.price,
        name: p.name,
      };
    });
    const totalAmount = orderItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
    const orderNumber = 'PST-' + Date.now();

    const order = await Order.create({
      orderNumber,
      // Allow guest checkout: userId optional
      userId: req.user?.id || undefined,
      items: orderItems,
      totalAmount,
      shippingAddress,
      billingAddress,
      paymentStatus: 'unpaid',
      orderStatus: 'Pending',
      paymentMethod: 'cod',
      notes,
    });
    return res.status(201).json({ order });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to create order' });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
    return res.json({ orders });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch orders' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    return res.json({ order });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to fetch order' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderStatus, paymentStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { $set: { orderStatus, paymentStatus } },
      { new: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    return res.json({ order });
  } catch (err) {
    return res.status(500).json({ message: err.message || 'Failed to update order' });
  }
};

module.exports = { createOrder, getMyOrders, getOrderById, updateOrderStatus };


