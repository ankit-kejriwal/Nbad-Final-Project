const express = require('express');
const path  =  require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

const config = require('./config/database');


// Connecting to mongo database
mongoose.connect(config.database);
mongoose.connection.on('connected' , () => {
    console.log('Connected to database ' + config.database);
});

const app = express();
const users =  require('./routes/users');
// port number
const port =  3000;

//cors 
app.use(cors());
// body parser
app.use(bodyParser.json());


// setting path for the client side
app.use(express.static(path.join(__dirname, 'public')));

// passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// added user route
app.use('/users',users); 

app.get('/', (req,res) => {
    res.send('Invalid endpoint');
})

app.get('*', (req,res) =>{
    res.send('Invalid Endpoint');
})

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
});