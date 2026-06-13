const express = require('express')
const app = express()
const cors = require('cors')
const liveView = require('./app.js');

// app.use(cors())

app.listen(8000, () => {
    console.log('Running on port 8000')
})


app.get('/index', (req, res) => { })