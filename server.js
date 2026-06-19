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
        res.send("Connection to Camera established! :)")
    }

})

app.get('/deviceinfo', async (req, res) => {

    const data = await fetch(`${CAMERA_IP}/ccapi/ver100/deviceinformation`) // This downloads the resulting response in chunks, hence the await, until done
    const formatData = await data.json() // this converts the data into json, also in chunks. Essentially downloading them

    if (!data.ok) {
        throw new Error("Could not get device info");
    } else {
        res.json(formatData) // res.json forces formData to be formatted in json compared to res.send() where it would have to guess the format
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