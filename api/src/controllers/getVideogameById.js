const axios = require("axios")
require('dotenv').config();
const { API_KEY } = process.env;
const { Videogame } = require("../db")


const getVideogameById = async function (id) { //fn para traer por ID un juego

    if (!id.includes("-")) { //si el id no incluye "-" busca en la api por id
        try {
            const apiData = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
            data = apiData.data

            const gamesData = {  //de la respuesta de la api me quedo con las propiedades que quiero mostrar del juego
                id: data.id,
                name: data.name,
                description: data.description_raw,
                image: data.background_image,
                released: data.released,
                rating: data.rating,
                platforms: data.platforms.map(p => p.platform.name),
                genres: data.genres.map(g => g.name)
            }
            return gamesData;

        } catch (error) {
            throw new Error("ID no encontrado")
        }
    }
    else {
        try {
            const foundGameInDB = await Videogame.findByPk(id)
            console.log(foundGameInDB) // a revisar

            if (!foundGameInDB) throw Error('Videojuego no encontrado')

            return foundGameInDB
        } catch (error) {
            throw Error(error)
        }
    }
}

module.exports = getVideogameById