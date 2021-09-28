if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config({path: '/.env'})
}
const db = process.env.MONGO_URI

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')

const app = express();

// Bodyparser Middleware
app.use(express.json());

//Connect to Mongo
mongoose
    .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
    .then(() => console.log('MongoDB Connected...'))
    .catch((err) => console.log(err))

//Use routes
app.use('/api/products', require('./routes/api/products'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/checkout', require('./routes/api/checkout'))
app.use('/api/orders', require('./routes/api/orders'))
app.use('/api/reviews', require('./routes/api/reviews'))

//Serve static assets if in production

if(process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('client/build'))
    
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))