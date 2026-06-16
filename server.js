const express = require('express')
const http = require('http')

const app = express()
const liveView = require('./app.js');


app.listen(8080, () => {
    console.log('Running on port 8080')
})

app.use(express.json({ limit: '1mb' }))

app.get('/connect', async (req, res) => {
    const response = await fetch("http://192.168.1.2:8080/ccapi")

    if (!response.ok) {
        throw new Error("Could not connect to Camera");
    } else {
        // console.log("Connection to Camera established! :)")
        res.send("Connection to Camera established! :)")
    }

})

app.post('/liveview', async (req, res) => {
    console.log('This is a request from my button to get liveview')
    console.log(req.body)

})