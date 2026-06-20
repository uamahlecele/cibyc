const PROXY_URL = "http://localhost:8080";

async function establishConnection() {

    const response = await fetch(`${PROXY_URL}/connect`)

    console.log("WE GOTTT", response);
}

async function deviceInformation() {
    const data = await fetch(`${PROXY_URL}/deviceinfo`)
    const resJSON = await data.json()  //unpacks the JSON

    const productName = document.getElementById("deviceInfo").textContent = JSON.stringify(resJSON.productname)
    const manufacturer = document.getElementById("manu").textContent = JSON.stringify(resJSON.manufacturer)

    console.log("This is the deviceinfo ", data)

}

async function setup() {

    const dataFromAPICall = await fetch(`${PROXY_URL}/setup`)
    const formatToJSON = await dataFromAPICall.json()

    // const paragraphDisplay = document.getElementById("displayImageFromCamera").textContent = JSON.stringify(formatToJSON)


}


async function cameraLiveView() {

    let imgElement = document.getElementById("displayImageFromCamera")

    let dataFromAPI = await fetch(`${PROXY_URL}/liveview`)
    let blob = await dataFromAPI.blob()
    let localUrl = URL.createObjectURL(blob)

    imgElement.src = localUrl


    // const formatToJSON = await dataFromAPI.json()
    // document.getElementById
}

async function shoot() {
    let data = await fetch(`${PROXY_URL}/shoot`)
    const formatData = data.json()

    console.log("Took an image!")
}