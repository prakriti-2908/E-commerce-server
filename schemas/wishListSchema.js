const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const whishListSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    productId: {
        type: Schema.Types.ObjectId,
        ref: 'product',
        required: true,
    }
});

whishListSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model('wishlist', whishListSchema);
