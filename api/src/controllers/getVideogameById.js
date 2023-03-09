const axios = require('axios')
require('dotenv').config()
const { API_KEY } = process.env
const { Videogame, Genre } = require('../db')

const getVideogameById = async function (id) {
  if (id.length < 30) {
    try {
      const apiData = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
      const data = apiData.data

      const gamesData = {
        id: data.id,
        name: data.name,
        description: data.description_raw,
        image: data.background_image,
        released: data.released,
        rating: data.rating,
        platforms: data.platforms.map(p => p.platform.name),
        genres: data.genres.map(g => g.name)
      }
      return gamesData
    } catch (error) {
      throw new Error('Videogame not found')
    }
  } else {
    try {
      let foundGameInDB = await Videogame.findOne({
        where: { id },
        include: {
          model: Genre,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }
      });

      if (!foundGameInDB) throw Error('Videogame not found');

      foundGameInDB = JSON.stringify(foundGameInDB);
      foundGameInDB = JSON.parse(foundGameInDB);

      foundGameInDB.genres = foundGameInDB.genres.map(g => g.name);

      return foundGameInDB;
      
    } catch (error) {
      throw Error(error)
    }
  }
}

module.exports = getVideogameById
