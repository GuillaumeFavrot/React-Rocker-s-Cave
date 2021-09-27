const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Create Schema
const ProductSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
        // guitar, amp, pedal, accessory
    },
    subType: {
        type: String,
        required: true
        // guitars : "T Type", "ST Type", "Single Cut", "Double Cut"
        // Amps: "Combo", "Head", "Cabinet"
        // Pedals: "Gain", "Reverb", "Delay", "Looper", "Wah", "FX"
        // Accessories: "Cable", "Pick", "Gigbag", "Strings" 
    },
    brand: {
        type: String,
        required: true
    },
    basePrice: {
        type: Number,
        required: true
    },
    effectivePrice: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    shipping: {
        type: Number,
        required: true
    },
    warranty: {
        type: String,
        required: true
    },
    productDescription : {
        type: String,
        required: true
    },
    //Guitar specific attributes
    color: {
        type: String,
    },
    mics: {
        type: String
        //"SSS", "SS", "SH", "HH", "SSH", "HHH", "HSH" 
    },
    frets: {
        type: Number
    },
    //Amp specific attributes
    power: {
        type: Number,
    },
    speakerConfig: {
        type: String,
    },
    ampType: {
        type: String
        //"tube", "analogic", "hybrid"
    },
    onSale: {
        type: Boolean
    }
})

ProductSchema.index({name :'text', type:'text', subType:'text', brand:'text', mics:'text', amptype:'text'})

module.exports = Product = mongoose.model('product', ProductSchema)