const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const OrderSchema = new Schema ({
    itemsList: {
        type: Array,
        required: true
    },
    token: {
        type: Object,
        required: true,
    },
    charge: {
        type: Object,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    userId: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    orderStatus: {
        type: String,
        required: true
    }
})

module.exports = Order = mongoose.model('order', OrderSchema)