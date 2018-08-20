const express = require('express')
const mongoose = require('mongoose')

// Import Routes
const user = require('./routes/api/user')
const posts = require('./routes/api/posts')
const profile = require('./routes/api/profile')

// DB config
const db = require('./config/keys').mongoURI

// Connect to MongoDB
mongoose.connect(db)
  .then(() => console.log('DB is connected'))
  .catch(err => console.log(err))

const app = express() 

// Route config
app.get('/', (req, res) => res.send('hello'))
app.use('/api/user', user)
app.use('/api/posts', posts)
app.use('/api/profile', profile)

// Port Config 
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server is running on ${port}`))

