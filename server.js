const express = require('express')
const mongoose = require('mongoose')

// DB config
const db = require('./config/keys').mongoURI

// Connect to MongoDB
mongoose.connect(db)
  .then(() => console.log('DB is connected'))
  .catch(err => console.log(err))

const app = express()


// Port Config 
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server is running on ${port}`))

app.get('/', (req, res) => res.send('hello'))
