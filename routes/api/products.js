const express = require('express')
const router = express.Router()
const adminAuth = require('./../../middleware/adminAuth')
const auth = require('./../../middleware/auth')


// Product Model

const Products = require('../../models/Products')


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!GET REQUESTS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// @route   GET api/products
// @desc    Get all products
// @access  Public

router.get('/', async (req, res) => {
    const {type, subType, brand, customSearch, sorting, onSale} = req.query
    let processedQuery = {}
        if (customSearch !== "") {
            processedQuery.$text = { $search : customSearch }
        } else {}
        if (type !== "") {
            processedQuery.type = {$in: type}
        } else {};
        if(subType !== "") {
            processedQuery.subType = {$in: subType}
        } else {};
        if (brand !== "") {
            processedQuery.brand = {$in: brand}
        } else {};
        if (onSale !== "") {
            processedQuery.onSale = {$in: true}
        } else {};
    try{
        const products = await Products.find(processedQuery).sort({effectivePrice: sorting})
        res.json(products)
    }
    catch(e){
        console.log(e)
    }  
})

// @route   GET api/products/custom
// @desc    Get products that matches a specific string
// @access  Public

router.get('/custom', async (req, res) => {
    console.log(req.query)
    const {sorting, requestedString } = req.query
    try{
        const products = await Products.find({ $text : { $search : requestedString } }).sort({effectivePrice: sorting})
        res.json(products)
    }
    catch(e){
        console.log(e)
    }  
})

// @route   GET api/products/:id
// @desc    GET a product by ID
// @access  Public

router.get('/:id', async (req, res) => {
    try{
        const product = await Products.findById(req.params.id)
        res.json(product)
    }
    catch(e){
        console.log(e)
    }
})

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!POST REQUESTS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// @route   POST api/products
// @desc    Add a new product
// @access  admin

router.post('/', adminAuth, async (req, res) => {
    const newProduct = new Products({
        name: req.body.params.name,
        image: req.body.params.image,
        type: req.body.params.type,
        subType: req.body.params.subType,
        brand: req.body.params.brand,
        basePrice: req.body.params.basePrice,
        effectivePrice: req.body.params.effectivePrice,
        stock: req.body.params.stock,
        shipping: req.body.params.shipping,
        warranty: req.body.params.warranty,
        productDescription: req.body.params.productDescription,
        color: req.body.params.color,
        mics: req.body.params.mics,
        frets: req.body.params.frets,
        power: req.body.params.power,
        speakerConfig: req.body.params.speakerConfig,
        ampType: req.body.params.ampType
    })
    try{
        const product = await newProduct.save()
        res.status(200).json(product)
    }
    catch(e){
        console.log(e)
        res.status(400).json({ msg: 'Product validation error'})
    }
})

// @route   POST api/products
// @desc    update a product
// @access  admin

router.post('/adminedit/:id', adminAuth, async (req, res) => {
    try{
        const product = await Products.findByIdAndUpdate(req.params.id, req.body.params, {new: true})
        res.json(product)
    }
    catch(e){
        console.log(e)
    }
})

// @route   POST api/products
// @desc    update a product
// @access  public

router.post('/edit/:id', auth, async (req, res) => {
        try{
            const product = await Products.findByIdAndUpdate(req.params.id, req.body.params, {new: true})
            res.json(product)
        }
        catch(e){
            console.log(e)
        } 
})

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!DELETE REQUESTS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// @route   DELETE api/products/:id
// @desc    Delete a product from the DB
// @access  Private

router.delete('/:id', adminAuth, async (req, res) => {
    try{
        const product = await Products.findById(req.params.id)
        await product.remove()
        res.json({success:true})
    }
    catch(e){
        console.log(e)
        res.status(404).json({success: false})
    }
})

module.exports = router;