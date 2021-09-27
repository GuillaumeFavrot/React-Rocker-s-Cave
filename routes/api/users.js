if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: './.env'})
}
const jwtSecret = process.env.JWT_SECRET

const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const adminAuth = require('./../../middleware/adminAuth')
const auth = require('./../../middleware/auth')

// Product Model

const User = require('../../models/User')

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!POST REQUESTS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// @route   post api/users
// @desc    register new user
// @access  Public

router.post('/', async (req, res) => {
    
    const {userName, email, password, passwordVerif} = req.body.params;

    // Simple validation
    if(!userName || !email || !password || !passwordVerif) {
        return res.status(400).json({ msg: 'Please complete all fields'})
    }

    if(passwordVerif !== password) {
        return res.status(400).json({ msg: 'Passwords do not match'})
    }

    // Check for existing user
    const user = await User.findOne({ email })
    const userCreation = (user) => {
        if(user) return res.status(400).json({ msg: 'A user is already registered with this E-mail'})
        else {
            const newUser = new User({
                userName,
                email,
                password
            })
            // Create salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, async (err, hash) => {
                    if(err) throw err
                    newUser.password = hash
                    registeredUser = await newUser.save()
                    const sendResponse = (registeredUser) => {
                        jwt.sign(
                            { id: registeredUser.id, userType: registeredUser.userType },
                            jwtSecret,
                            { expiresIn: 3600 },
                            (err, token) => {
                                if(err) throw err;                         
                                res.json({
                                token, 
                                user: {
                                    id: registeredUser.id,
                                    userName: registeredUser.userName,
                                    email: registeredUser.email
                                }

                            })
                        })
                    }
                    sendResponse(registeredUser)
                })
            })
        }
    }
    userCreation(user)
})

// @route   post api/users
// @desc    update user information
// @access  private

router.post('/:id', auth, async (req, res) => {
    //E-mail modification
    if(req.body.params.email) {
        const emailModification = async (email) => {
            try {
                const user = await User.findOne(email)
                if(user) return res.status(400).json({ msg: 'A user is already registered with this E-mail'})
            }
            catch(e){ console.log(e) }  
            try {
                const user = await User.findByIdAndUpdate(req.params.id, req.body.params, {new: true})
                res.status(200).json(user)
            }
            catch(e){console.log(e)}
        }
        emailModification(req.body.params)
    }

    //Username modification
    if(req.body.params.userName) {
        const userNameModification = async (userName) => {
            try {
                const user = await User.findOne(userName)
                if(user) return res.status(400).json({ msg: 'A user is already registered with this Username'})
            }
            catch(e){console.log(e)} 
            try {
                const user = await User.findByIdAndUpdate(req.params.id, req.body.params, {new: true})
                res.status(200).json(user)
            }
            catch(e){console.log(e)}
        }
        userNameModification(req.body.params)
    }

    //Address modification
    if(req.body.params.userZipCode || req.body.params.userShippingAddress || req.body.params.userCity || req.body.params.userCountry) {
        const addressModification = async () => {
            try {
                const user = await User.findByIdAndUpdate(req.params.id, req.body.params, {new: true})
                res.status(200).json(user)
            }
            catch(e){console.log(e)}
        }
        addressModification()
    }
    
    //Password modification
    if(req.body.params.newPassword || req.body.params.password || req.body.params.newPasswordVerif) {
        const user = await User.findById(req.params.id)

        const userPasswordModification = async (user) => {
            const {password, newPassword, newPasswordVerif} = req.body.params;

            // exhaustive form check
            if(!password || !newPassword || !newPasswordVerif) {
                return res.status(400).json({ msg: 'Please complete all fields'})
            }

            //Passwords matching check
            if(newPasswordVerif !== newPassword) {
                return res.status(400).json({ msg: 'Passwords do not match'})
            }
            
            //Password check
            try {
                const isMatch = await bcrypt.compare(password, user.password)
                if (isMatch === false) return res.status(400).json({ msg: 'Invalid credentials'})
            }
            catch(e){console.log(e)}
            try {
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.params.newPassword, salt, async (err, hash) => {
                        if(err) throw err
                        req.body.params.newPassword = hash
                        const password = {password : req.body.params.newPassword}
                        const user = await User.findByIdAndUpdate(req.params.id, password, {new: true})
                        res.status(200).json(user)
                    })
                })
            }
            catch(e){console.log(e)}
        }
        userPasswordModification(user)
    }
    
    //Cart modification
    if(req.body.params.userCart) {
        const cartModification = async () => {
            try {
                const user = await User.findByIdAndUpdate(req.params.id, req.body.params, {new: true})
                res.status(200).json(user)
            }
            catch(e){console.log(e)}
        }
        cartModification()
    }

    //reviews modification
    if(req.body.params.userReviews) {
        const reviewsModification = async () => {
            try {
                const user = await User.findByIdAndUpdate(req.params.id, req.body.params, {new: true})
                res.status(200).json(user)
            }
            catch(e){console.log(e)}
        }
        reviewsModification()
    }

    //Cart modification
    if(req.body.params.userPreviousOrders) {
        const ordersModification = async () => {
            try {
                const user = await User.findByIdAndUpdate(req.params.id, req.body.params, {new: true})
                res.status(200).json(user)
            }
            catch(e){console.log(e)}
        }
        ordersModification()
    }
})

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!GET REQUEST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// @route   get api/users
// @desc    get all registered users
// @access  admin

router.get('/', adminAuth, async (req, res) => {
    try{
        const users = await User.find()
        res.json(users)
    }
    catch(e){
        console.log(e)
    }  
})

// @route   GET api/users/:id
// @desc    GET a user by ID
// @access  Admin

router.get('/:id', adminAuth, async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        res.json(user)
    }
    catch(e){
        console.log(e)
    }
})

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!DELETE REQUEST!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// @route   delete api/users
// @desc    delete a specific user
// @access  admin

router.delete('/:id', adminAuth, async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        await user.remove()
        res.json({success:true})
    }
    catch(e){
        console.log(e)
        res.status(404).json({success: false})
    }
})


module.exports = router;
