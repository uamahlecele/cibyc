
async function establishConnection() {

    // const response = await fetch("http://192.168.1.2:8080/ccapi")

    // if (!response.ok) {
    //     throw new Error("Could not connect to Camera");
    // } else {
    //     console.log("Connection to Camera established! :)")
    // }

    const response = await fetch("http://localhost:8000/connect")
}

// async function cameraLiveView() {

//     // This will call my end point to my server.js to make the request

//     const liveView = await fetch("http://localhost:8000/liveview");


// }








async function cameraLiveView() {

    const dataLiveView = await fetch("http://192.168.1.2:8080/ccapi/ver100/shooting/liveview", {
        method: 'POST', body: {
            'liveviewsize': 'small',
            'cameradisplay': 'on'
        }
    })

    const response = await data.json()
    console.log("This is the initial API call and it should display only Content Type json/ application if it is successful! ", dataLiveView.json());


    if (dataLiveView.ok) {

        const actualImageFromCamera = document.getElementById('displayImageFromCamera');

        const dataImageFromLiveView = await fetch("http://192.168.1.2:8080/ccapi/ver100/shooting/liveview/flip")
        actualImageFromCamera.src = dataImageFromLiveView;

    }
    else {
        console.log("liveview call failed!");
    }

    // const imageTag = document.getElementById('liveView');



    // const response = await data.json()

    // console.log("THIS IS WHAT THE DATA LOOKS LIKE: " + response)


}

// const result = document.getElementById('testingAPI').textContent = data

module.exports = cameraLiveView;