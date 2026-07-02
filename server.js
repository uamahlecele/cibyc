const express = require('express')
const http = require('http')

// REMEMBER THIS FOR CORS
const cors = require("cors")

const app = express()

const CAMERA_IP = "http://192.168.1.2:8080";
// const STORAGE = "";
// const DIRECTORY = "";



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

app.get('/setup', async (req, res) => {
    // const response = await fetch("http://192.168.1.2:8080/ccapi/liveview", {
    const dataFromAPI = await fetch(`${CAMERA_IP}/ccapi/ver100/shooting/liveview`
        , {
            headers: { "Content-Type": "application/json" },
            method: 'POST',
            body: JSON.stringify({
                "liveviewsize": "small",
                "cameradisplay": "on"
            }),
        })

    const formatData = await dataFromAPI.json()

    res.json(formatData)

    // if (!response.ok) {
    //     return res.status(response.status).send("Failed to fetch live view frame from camera");
    // } else {

    // }

})

app.get('/liveview', async (req, res) => {
    const dataFromAPI = await fetch(`${CAMERA_IP}/ccapi/ver100/shooting/liveview/flip`)

    const buffer = await dataFromAPI.arrayBuffer(); // An ArrayBuffer is essentially a fixed-length chunk of memory used to store raw binary data (just 1s and 0s).
    //  It is the best way to handle non-text data like images, audio, or video files in JavaScript.
    res.set('Content-Type', 'image/jpeg'); // .set() allows you to specify the header of the response object
    res.set('Transfer-Encoding', 'chunked');
    res.send(Buffer.from(buffer)); // creates a copy of the buffer object

})

app.get('/shoot', async (req, res) => {
    const data = await fetch(`${CAMERA_IP}/ccapi/ver100/shooting/control/shutterbutton`, {
        method: 'POST',
        header: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            "af": true
        })
    })

    const polled = await fetch(`${CAMERA_IP}/ccapi/ver100/event/polling?continue=on`);
    const savePolled = await polled.json();

    const latestImageURL = savePolled.addedContents[0]
    res.send(latestImageURL);

    // const save = await fetch(`${CAMERA_IP}/ccapi/ver100/contents/`)
    // const formatData = await data.json()
    // res.json(formatData)
})