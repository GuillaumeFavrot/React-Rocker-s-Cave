const express = require('express')
const router = express.Router()
const auth = require('./../../middleware/auth')

// Product Model

const Review = require('../../models/Review')

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!POST REQUESTS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// @route   post api/reviews
// @desc    create a new review
// @access  Private

router.post('/', async (req, res) => {
    let newReview = new Review(req.body.params)
    try {
        const review = await newReview.save()
        res.status(200).json(review)
    } 
    catch(e) {
        console.log(e)
        res.status(400).json({ msg: 'Review creation failed'})  
    }

})

// @route   post api/reviews
// @desc    update a review
// @access  private

router.post('/:id', async (req, res) => {
    const {rate, reviewTitle, reviewComment} = req.body.params
    let updateDate = Date.now()
    try {
        const review = await Review.findByIdAndUpdate(req.params.id, {updatedAt: updateDate, rate: rate, reviewTitle: reviewTitle, reviewComment: reviewComment}, {new: true})
        res.status(200).json(review)
    }
    catch(e) {
        console.log(e)
        res.status(400).json({ msg: 'Review modification failed'})
    }
})

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!GET REQUEST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// @route   get api/reviews
// @desc    get all personnal reviews
// @access  private

router.get('/', async (req, res) => {
    try{
        const reviews = await Review.find(req.query).sort({createdAt: "descending"})
        res.json(reviews)
    }
    catch(e){
        console.log(e)
        res.status(400).json({ msg: 'Reviews fetching error'})
    }  
})

// @route   GET api/reviews/:id
// @desc    GET a review by ID
// @access  private

router.get('/:id', auth, async (req, res) => {
    try{
        const review = await Review.findById(req.params.id)
        res.json(review)
    }
    catch(e){
        console.log(e)
        res.status(400).json({ msg: 'Review fetching error'})
    }
})

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!DELETE REQUEST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// @route   delete api/reviews
// @desc    delete a specific review
// @access  private

router.delete('/:id', auth, async (req, res) => {
    try{
        const review = await Review.findById(req.params.id)
        await review.remove()
        res.json({success:true})
    }
    catch(e){
        console.log(e)
        res.status(404).json({success: false})
    }
})


module.exports = router;
