const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')

const app = express() 

// Passport middleware
app.use(passport.initialize())

// Passport config 
require('./server/config/passport')(passport)

// Import Routes
const user = require('./server/routes/api/user')
const posts = require('./server/routes/api/posts')
const profile = require('./server/routes/api/profile')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// DB config
const db = require('./server/config/keys').mongoURI

// Connect to MongoDB
mongoose.connect(db, { useNewUrlParser: true })
  .then(() => console.log('DB is connected'))
  .catch(err => console.log(err))

// Route config
app.use('/api/user', user)
app.use('/api/posts', posts)
app.use('/api/profile', profile)

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Port Config 
const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Server is running on ${port}`))

