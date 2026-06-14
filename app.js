
async function establishConnection() {
    const response = await fetch("http://192.168.1.2:8080/ccapi")

    if (!response.ok) {
        throw new Error("Could not connect to Camera");
    } else {
        console.log("Connection to Camera established! :)")
    }
}
async function cameraLiveView() {

    const dataLi = await fetch("http://192.168.1.2:8080/ccapi/ver100/shooting/liveview", {
        method: 'POST', body: {
            'liveviewsize': 'small',
            'cameradisplay': 'small'
        }
    })

    const imageTag = document.getElementById('liveView');

    const data = await fetch("http://192.168.1.2:8080/ccapi/ver100/shooting/liveview/flip")

    const response = await data.json()

    console.log("THIS IS WHAT THE DATA LOOKS LIKE: " + response)

    imageTag.src = data
}

// const result = document.getElementById('testingAPI').textContent = data

module.exports = cameraLiveView;