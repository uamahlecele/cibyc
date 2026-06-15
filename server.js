const express = require('express')
const http = require('http')

const app = express()
// const cors = require('cors')
const liveView = require('./app.js');

// app.use(cors())

// http
//     .post('http://192.168.1.2:8080/ccapi/ver100/shooting/liveview', {
//         method: 'POST', body: {
//             'liveviewsize': 'small',
//             'cameradisplay': 'on'
//         }
//     })

app.listen(8000, () => {
    console.log('Running on port 8000')
})


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
    await fetch('http://192.168.1.2:8080/ccapi/ver100/shooting/liveview', {
        method: 'POST', body: {
            'liveviewsize': 'small',
            'cameradisplay': 'on'
        }
    })

})