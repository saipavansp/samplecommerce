const express = require('express');
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');
const { auth, requireAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', auth, requireAdmin, createProduct);
router.put('/:id', auth, requireAdmin, updateProduct);
router.delete('/:id', auth, requireAdmin, deleteProduct);

module.exports = router;


