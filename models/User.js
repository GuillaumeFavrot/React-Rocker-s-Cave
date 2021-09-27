const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const UserSchema = new Schema ({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    registerDate: {
        type: Date,
        default: Date.now
    },
    userType: {
        type: String,
        required: true,
        default: "customer"
    },
    userCart: {
        type: Array,
        default: []
    },
    userShippingAddress: {
        type: String
    },
    userZipCode: {
        type: String
    },
    userCity:{
        type: String
    },
    userCountry: {
        type: String
    }
})

module.exports = Product = mongoose.model('user', UserSchema)