const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    category: { type: String, index: true },
    subcategory: { type: String, index: true },
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, min: 0 },
    images: [{ type: String }],
    specifications: {
      dimensions: String,
      weight: String,
      material: String,
      features: [String],
    },
    stock: { type: Number, default: 0, min: 0 },
    sku: { type: String, unique: true, index: true },
    isActive: { type: Boolean, default: true },
    tags: [{ type: String, index: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);


