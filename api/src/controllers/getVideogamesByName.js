require('dotenv').config();
const axios = require("axios");
const { Videogame } = require("../db")
const { API_KEY } = process.env;

const getApiVideogamesByName = async function (name) {
    const apiVideogames = (await axios.get(`https://api.rawg.io/api/games?search=${name}&key=${API_KEY}`))
        .data
        .results
        .map(game => (
            {
                id: game.id,
                name: game.name,
                released: game.released,
                image: game.background_image,
                rating: game.rating,
                platforms: game.platforms?.map(el => el.platform.name),
                genres: game.genres?.map(el => el.name)
            }))
    return apiVideogames
}

const getDBVideogamesByName = async (name) => { //
    const response = await Videogame.findAll()
    return response
        .filter(game => game.name.toLowerCase().includes(name.toLowerCase()))

}


const getVideogamesByName = async (name) => {
    const apiVideogames = await getApiVideogamesByName(name) // traigo los juegos de la api por nombre
    const dbVideogames = await getDBVideogamesByName(name) // traigo los juegos de la DB por nombre
    return dbVideogames
        .concat(apiVideogames) // concateno dejando primero los de la DB
        .slice(0, 15) // me quedo con los primeros 15
}  

module.exports = getVideogamesByName

