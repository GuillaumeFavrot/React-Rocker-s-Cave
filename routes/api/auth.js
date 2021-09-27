if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: './.env'})
}
const jwtSecret = process.env.JWT_SECRET

const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('./../../middleware/auth')

// Product Model

const User = require('../../models/User')


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!POST REQUESTS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// @route   post api/auth
// @desc    authenticate user
// @access  Public

router.post('/', async (req, res) => {
    const {email, password} = req.body.params;

    // Simple validation
    if(!email || !password) {
        return res.status(400).json({ msg: 'Please complete all fields'})
    }

    // Check for existing user
    const user = await User.findOne({ email })
    const userExistanceCheck = (user) => {
        if(!user) return res.status(400).json({ msg: 'User does not exist'})
        else {
            //validate the password
            const userPasswordCheck = async (user) => {
                const isMatch = await bcrypt.compare(password, user.password)
                if (isMatch === false) return res.status(400).json({ msg: 'Invalid credentials'})
                else {
                    jwt.sign(
                        { id: user.id,  userType: user.userType},
                        jwtSecret,
                        { expiresIn: 3600 },
                        (err, token) => {
                            if(err) throw err;                         
                            res.json({
                            token, 
                            user: {
                                id: user.id,
                                userName: user.userName,
                                email: user.email,
                                userType: user.userType
                            }

                        })
                    })
                }
            }
            userPasswordCheck(user)
        }
    }
    userExistanceCheck(user)
})


//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!GET REQUESTS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// @route   GET api/auth
// @desc    Get user data
// @access  private

router.get('/user', auth, async (req, res) => {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
})


module.exports = router;