const express = require('express')
const router = express.Router()
const adminAuth = require('./../../middleware/adminAuth')
const auth = require('./../../middleware/auth')

// Product Model

const Order = require('../../models/Order')

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!POST REQUESTS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// @route   post api/orders
// @desc    create a new order
// @access  Public

router.post('/', auth, async (req, res) => {
    let newOrder = new Order(req.body.params) 
    try{
        const order = await newOrder.save()
        res.status(200).json(order)
    }
    catch(e){
        console.log(e)
        res.status(400).json({ msg: 'Order creation failed'})
    }
})

// @route   post api/orders
// @desc    update orders status
// @access  private

router.post('/:id', adminAuth, async (req, res) => {
    try{
        const order = await Order.findByIdAndUpdate(req.params.id, req.body.params, {new: true})
        res.json(order)
    }
    catch(e){
        console.log(e)
        res.status(400).json({ msg: 'Order modification failed'})
    }
})

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!GET REQUEST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// @route   get api/orders
// @desc    get all orders
// @access  public

router.get('/', adminAuth, async (req, res) => {
    let query = req.query
    try{
        const orders = await Order.find(query).sort({createdAt: "descending"})
        res.json(orders)
    }
    catch(e){
        console.log(e)
        res.status(400).json({ msg: 'Orders fetching error'})
    }  
})

router.get('/user/:id', auth, async (req, res) => {
    try{
        const orders = await Order.find({userId: req.params.id}).sort({createdAt: "descending"})
        res.json(orders)
    }
    catch(e){
        console.log(e)
        res.status(400).json({ msg: 'Orders fetching error'})
    }  
})

// @route   GET api/orders/:id
// @desc    GET an order by ID
// @access  Admin

router.get('/:id', auth, async (req, res) => {
    try{
        const order = await Order.findById(req.params.id)
        res.json(order)
    }
    catch(e){
        console.log(e)
    }
})


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!DELETE REQUEST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// @route   delete api/orders
// @desc    delete an order
// @access  admin

router.delete('/:id', adminAuth, async (req, res) => {
    try{
        const order = await Order.findById(req.params.id)
        await order.remove()
        res.json({success:true})
    }
    catch(e){
        console.log(e)
        res.status(404).json({success: false})
    }
})


module.exports = router;
