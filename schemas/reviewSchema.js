const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    userId:{
        ref:'user',
        type:mongoose.Types.ObjectId
    },
    productId:{
        ref:'product',
        type:mongoose.Types.ObjectId,
    },
    review:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true
    }
});