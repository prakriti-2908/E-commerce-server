const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categories = ["male","female", "kid", "accessories"]
const combos = ["mother-daughter","mother-son","father-daughter","father-son","couple","none"];


const productSchema = new Schema({
    company:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    isDiscount:{
        type:Boolean,
        default:false,
    },
    discountPercent:{
        type:Number,
    },
    isCombo:{
        type:Boolean,
        default:false,
    },
    combo:{
        type:String,
        enum:combos,
    },
    category:{
        type:String,
        enum:categories
    },
    image:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('product',productSchema);