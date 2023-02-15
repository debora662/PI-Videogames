require('dotenv').config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Genre } = require("../db")

const getGenders = async () => {
    try {

        const dbGenres = await Genre.findAll() // busco todos los generos en la DB

        if (dbGenres.length === 0) { // si no hay nada, los busco en la API y los cargo en la DB
            const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
            const apiGenres = response.data.results.map(gen => gen.name)

            for (const genre of apiGenres) {
                await Genre.create({ name: genre }) // creo cada genero
            }
            
            return apiGenres

        } else { // en caso de tenerlos en la DB, los retorno y listo.
            return dbGenres
        }
    } catch (error) {
        throw new Error("Cannot get genders")
    }
}


module.exports = {
    getGenders
}
