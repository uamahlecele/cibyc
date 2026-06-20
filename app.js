const PROXY_URL = "http://localhost:8080";

async function establishConnection() {

    const response = await fetch(`${PROXY_URL}/connect`)

    console.log("WE GOTTT", response);
}

// async function cameraLiveView() {

//     // This will call my end point to my server.js to make the request

//     const liveView = await fetch("http://localhost:8000/liveview");

// }

async function deviceInformation() {
    const data = await fetch(`${PROXY_URL}/deviceinfo`)
    const resJSON = await data.json()  //unpacks the JSON

    const productName = document.getElementById("deviceInfo").textContent = JSON.stringify(resJSON.productname)
    const manufacturer = document.getElementById("manu").textContent = JSON.stringify(resJSON.manufacturer)

    console.log("This is the deviceinfo ", data)

}

async function cameraLiveView() {

    // const response = await fetch('/liveview')
    const dataFromAPICall = await fetch(`${PROXY_URL}/liveview`)
    const formatToJSON = await dataFromAPICall.json()

    const paragraphDisplay = document.getElementById("displayImageFromCamera").textContent = JSON.stringify(formatToJSON)




    // const response = await data.json()
    // console.log("This is the initial API call and it should display only Content Type json/ application if it is successful! ", dataLiveView.json());


    // if (dataLiveView.ok) {

    //     const actualImageFromCamera = document.getElementById('displayImageFromCamera');

    //     const dataImageFromLiveView = await fetch("http://192.168.1.2:8080/ccapi/ver100/shooting/liveview/flip")
    //     actualImageFromCamera.src = dataImageFromLiveView;

    // }
    // else {
    //     console.log("liveview call failed!");
    // }

    // const imageTag = document.getElementById('liveView');



    // const response = await data.json()

    // console.log("THIS IS WHAT THE DATA LOOKS LIKE: " + response)


}

// const result = document.getElementById('testingAPI').textContent = data

// module.exports = cameraLiveView;