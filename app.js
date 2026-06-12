
// fetch("http://192.168.1.2:8080/ccapi/ver100/shooting/liveview", {
//     method: 'POST', body: JSON.stringify({ 'liveviewsize': 'small', 'cameradisplay': 'on' })
// })

//     .then(response => fetch("http://192.168.1.2:8080/ccapi/ver100/shooting/liveview"))

async function testing() {

    const data = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu")
    const dataJ = await data.json()

    // console.log("THIS IS WHAT THE DATA LOOKS LIKE: " + dataJ)

    document.getElementById('testingAPI').src = dataJ.sprites.front_female
}

// const result = document.getElementById('testingAPI').textContent = data