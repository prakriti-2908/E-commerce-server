const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
});

cartSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model("cart", cartSchema);
