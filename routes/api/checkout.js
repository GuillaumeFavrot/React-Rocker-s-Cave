if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: './.env'})
}
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

const express = require('express')
const router = express.Router()
const auth = require('./../../middleware/auth')
const stripe = require("stripe")(stripeSecretKey)

const uuid = require("uuid")

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!POST REQUESTS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// @route   get api/checkout
// @desc    payment checkout
// @access  Public


router.post('/', auth, async (req, res) => {
    try {
       const token = req.body.token
       const cartTotal = req.body.cartTotal
       const customer = await stripe.customers.create({
           email: token.email,
           source: token.id
       })
       const charge = await stripe.charges.create({
           amount : cartTotal * 100,
           currency : "eur",
           customer: customer.id,
           receipt_email: token.email,
           shipping: {
               name: token.card.name,
               address: {
                   line1: token.card.address_line1,
                   line2: token.card.address_line2,
                   city: token.card.address_city,
                   country: token.card.address_country,
                   postal_code: token.card.address_zip,
               }
           }
       }, stripeSecretKey)
        res.status(200).json({ msg: 'Payment successful check your E-mail for further details', charge : charge})
    }
    catch(e){
        console.log(e)
        res.status(400).json({ msg: 'An error occured during payment processing'})
    }
})


module.exports = router;