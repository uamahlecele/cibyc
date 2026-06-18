const express = require('express')
const http = require('http')

// REMEMBER THIS FOR CORS
const cors = require("cors")

const app = express()
// const liveView = require('./app.js');

const CAMERA_IP = "http://192.168.1.2:8080";



app.listen(8080, () => {
    console.log('Running on port 8080')
})

app.use(cors())
app.use(express.json({ limit: '1mb' }))

app.get('/connect', async (req, res) => {
    const response = await fetch(`${CAMERA_IP}/ccapi`)

    if (!response.ok) {
        throw new Error("Could not connect to Camera");
    } else {
        // console.log("Connection to Camera established! :)")
        res.send("Connection to Camera established! :)")
    }

})

app.get('/liveview', async (req, res) => {
    // const response = await fetch("http://192.168.1.2:8080/ccapi/liveview", {
    const response = await fetch(`${CAMERA_IP}/ccapi/ver100/shooting/liveview`);
    // , {
    //     method: 'POST',
    //     body: {
    //         "liveviewsize": "small",
    //         "cameradisplay": "on"
    //     },
    //     headers: { "Content-Type": "application/json" }

    // })

    if (!response.ok) {
        return res.status(response.status).send("Failed to fetch live view frame from camera");
    }



    res.send(console.log("!!!!!!!!!!"), response)


    // console.log(req.body)

})