const express = require('express');
const dotEnv = require("dotenv");
const appRoute = require('./route/route');
const cors = require('cors')

// dot env 
dotEnv.config();

// make a app
const app = express()
const PORT = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors());


// middleware accept json
app.use(express.json())


// route
app.use('/api', appRoute);

//listen port
app.listen(PORT, () => {
    console.log(`Apps Runing on ${PORT} port`)
})