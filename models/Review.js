const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const ReviewSchema = new Schema ({
    author: {
        type: String,
        required: true
    },
    authorId: {
        type: String,
        reuired: true
    },
    productId: {
        type:String,
        required: true
    },
    productBrand: {
        type:String,
        required: true
    },
    productName: {
        type:String,
        required: true
    },
    productImage: {
        type:String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedAt: {
        type: Date,
    },
    rate: {
        type: Number,
        required: true
    },
    reviewTitle: {
        type: String,
        required: true 
    },
    reviewComment: {
        type: String,
        required: true
    }
})

module.exports = Review = mongoose.model('review', ReviewSchema)