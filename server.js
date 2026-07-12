const express = require('express')
const fs = require('fs') // 
const http = require('http')

// REMEMBER THIS FOR CORS
const cors = require("cors")

const app = express()

const CAMERA_IP = "http://192.168.1.2:8080";

app.use(cors())

app.listen(8080, () => {
    console.log('Running on port 8080')

    // Start listening to any changes soon as the server starts
    storeImagesLocally()
})


app.use(express.json({ limit: '1mb' }))

app.get('/connect', async (req, res) => {

    try {
        const response = await fetch(`${CAMERA_IP}/ccapi`)

        if (!response.ok) {
            throw new Error("Could not connect to Camera");
        }

        res.send("Connection to Camera established! :)")


    } catch (error) {
        console.log("Could not connect to Camera", error.message);

    }

})

app.get('/showimages', async (req, res) => {

    try {
        const data = await fetch(`${CAMERA_IP}/ccapi/ver100/contents/sd/103CANON?kind=list`);

        if (!data.ok) {
            throw new Error("list of images in directory failed");

        }
        const jsonF = await data.json();
        res.json(jsonF);

    } catch (error) {
        res.send(error.message)
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

    try {
        const dataFromAPI = await fetch(`${CAMERA_IP}/ccapi/ver100/shooting/liveview`
            , {
                headers: { "Content-Type": "application/json" },
                method: 'POST',
                body: JSON.stringify({
                    "liveviewsize": "small",
                    "cameradisplay": "on"
                }),
            })

        if (!dataFromAPI.ok) {
            throw new Error(`Camera setup failed`);
        }

        const formatData = await dataFromAPI.json()
        res.json(formatData)

    } catch (error) {
        console.log("Failed to establish live view frame from camera ", error.message)
    }

})

app.get('/liveview', async (req, res) => {

    try {
        const dataFromAPI = await fetch(`${CAMERA_IP}/ccapi/ver100/shooting/liveview/flip`)

        if (!dataFromAPI.ok) {
            throw new Error(`Camera liveview failed`);
        }

        const buffer = await dataFromAPI.arrayBuffer(); // An ArrayBuffer is essentially a fixed-length chunk of memory used to store raw binary data (just 1s and 0s).
        //  It is the best way to handle non-text data like images, audio, or video files in JavaScript.
        res.set('Content-Type', 'image/jpeg'); // .set() allows you to specify the header of the response object
        res.set('Transfer-Encoding', 'chunked');
        res.send(Buffer.from(buffer)); // creates a copy of the buffer object

    } catch (error) {
        console.log("Error while showing live view: ", error.message);
    }

})

app.get('/shoot', async (req, res) => {

    try {
        const data = await fetch(`${CAMERA_IP}/ccapi/ver100/shooting/control/shutterbutton`, {
            method: 'POST',
            header: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "af": true
            })
        })

        res.send(data);

    } catch (error) {
        console.log("Error while trying to shoot: ", error.message);

    }


})

/** This asynchronous function is incharge of listening
 * for new changes when an image is taken
 
 */
async function storeImagesLocally() {

    try {
        const data = await fetch(`${CAMERA_IP}/ccapi/ver100/event/polling?continue=on`);

        if (!data.ok) {
            throw new Error(`Camera polling failed`);
        }

        const changeRecorded = await data.json();

        if (changeRecorded.addedcontents && changeRecorded.addedcontents.length > 0) {
            const recentImageUrl = changeRecorded.addedcontents[0];
            const imageName = recentImageUrl.split("/")
            const image = await fetch(`${recentImageUrl}`);


            const arrayBuffer = await image.arrayBuffer()
            const buffer = Buffer.from(arrayBuffer)
            fs.writeFileSync(`./images/${imageName.at(-1)}`, buffer); // creates unique identifier for file name


        }
    } catch (error) {
        console.error("Polling error: ", error.message);

        await new Promise(resolve => setTimeout(resolve, 3000)); // every three seconds the method calls the api again
    }

    storeImagesLocally(); // recursively calls itself
}
