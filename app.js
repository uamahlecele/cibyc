
// fetch("http://192.168.1.2:8080/ccapi/ver100/shooting/liveview", {
//     method: 'POST', body: JSON.stringify({ 'liveviewsize': 'small', 'cameradisplay': 'on' })
// })

//     .then(response => fetch("http://192.168.1.2:8080/ccapi/ver100/shooting/liveview"))

async function cameraLiveView() {

    const data = await fetch("http://192.168.1.2:8080/ccapi/ver100/shooting/liveview", {
        method: 'POST', body: {
            'liveviewsize': 'small',
            'cameradisplay': 'small'
        }
    })

    const response = await data.json()

    console.log("THIS IS WHAT THE DATA LOOKS LIKE: " + response)

    document.getElementById('testingAPI').src = dataJ
}

// const result = document.getElementById('testingAPI').textContent = data

module.exports = cameraLiveView;