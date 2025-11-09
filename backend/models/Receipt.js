const mongoose = require('mongoose');
const { Schema } = mongoose;

const ReceiptSchema = new Schema({
  userId: { type: String, required: true, default: 'defaultUser' },
  total: { type: Number, required: true },
  items: [{
    productId: Schema.Types.ObjectId,
    name: String,
    price: Number,
    qty: Number
  }],
  name: String,
  email: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Receipt', ReceiptSchema);
