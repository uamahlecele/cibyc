const PROXY_URL = "http://localhost:8080";

async function establishConnection() {

    const response = await fetch(`${PROXY_URL}/connect`)
    let dataPoll = await fetch(`${PROXY_URL}/save`)


    console.log("WE GOTTT", response);
}

async function deviceInformation() {
    const data = await fetch(`${PROXY_URL}/deviceinfo`)
    const resJSON = await data.json()  // unpacks the JSON

    const productName = document.getElementById("deviceInfo").textContent = JSON.stringify(resJSON)
    const manufacturer = document.getElementById("manu").textContent = JSON.stringify(resJSON.manufacturer)
    const displayHeading = document.getElementById("heading").textContent = "Camera details"
    console.log("This is the deviceinfo ", data)

}

async function setup() {

    const dataFromAPICall = await fetch(`${PROXY_URL}/setup`)
    const formatToJSON = await dataFromAPICall.json()

    // const paragraphDisplay = document.getElementById("displayImageFromCamera").textContent = JSON.stringify(formatToJSON)


}


// async function cameraLiveView() {

//     let imgElement = document.getElementById("displayImageFromCamera")

//     let dataFromAPI = await fetch(`${PROXY_URL}/liveview`)
//     let blob = await dataFromAPI.blob()
//     let localUrl = URL.createObjectURL(blob)

//     imgElement.src = localUrl


// setTimeout(cameraLiveView, 2000)


//     // const formatToJSON = await dataFromAPI.json()
//     // document.getElementById
// }

// This calls the api every 1 second, essentially polling. But I'm noticing a lag! But this is dope!!!!!!
// const interval = setInterval(cameraLiveView, 1000);


async function shoot() {
    let data = await fetch(`${PROXY_URL}/shoot`)

    // const formatData = data.json()
    let download = createElement('a');

    download.href = data;

    console.log("Took an image!")
}


async function downloadImage() {
    let data = await fetch(`${PROXY_URL}/showimages`);
    let formatJSON = await data.json();

    console.log(formatJSON);


    // CALLS IMAGE STRING LOCATION DIRECTLY
    // const urlOfRecentImage = await fetch(formatJSON.addedcontents)

    // const blob = await urlOfRecentImage.blob()

    // STORE BLOB IMAGE

    // let localUrl = URL.createObjectURL(blob)


}