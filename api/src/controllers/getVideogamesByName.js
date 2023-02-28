require('dotenv').config()
const axios = require('axios')
const { Op } = require('sequelize')
const { Videogame, Genre } = require('../db')
const { API_KEY } = process.env

const getApiVideogamesByName = async (name) => {
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
        platforms: game.platforms.map(el => el.platform.name),
        genres: game.genres.map(el => el.name)
      }))
  return apiVideogames
}

const getDBVideogamesByName = async (name) => {
  const dbVideoGames = await Videogame.findAll({
    where: {
      name: { [Op.iLike]: `%${name}%` }
    },
    include: {
      model: Genre,
      attributes: ['name'],
      through: {
        attributes: []
      }
    }
  })

  if (dbVideoGames.length === 0) throw Error('No se encontraron juegos con ese nombre')

  return dbVideoGames.map(game => (
    {
      id: game.id,
      name: game.name,
      // description: game.description,
      image: game.image,
      platforms: game.platforms,
      rating: game.rating,
      released: game.released,
      genres: game.genres.map(genre => genre.name)
    }
  ))
}

const getVideogamesByName = async (name) => {
  const apiVideogames = await getApiVideogamesByName(name)
  const dbVideogames = await getDBVideogamesByName(name)
  return dbVideogames
    .concat(apiVideogames)
    .slice(0, 15)
}

module.exports = getVideogamesByName
