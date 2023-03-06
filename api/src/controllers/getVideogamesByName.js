require('dotenv').config()
const axios = require('axios')
const { Op } = require('sequelize')
const { Videogame, Genre } = require('../db')
const { API_KEY } = process.env

const getApiVideogamesByName = async (name) => {
  try {
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
  } catch (error) {
    console.error(error)
    throw error
  }
}

const getDBVideogamesByName = async (name) => {
  try {
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
    return dbVideoGames.map(game => (
      {
        id: game.id,
        name: game.name,
        image: game.image,
        platforms: game.platforms,
        rating: game.rating,
        released: game.released,
        genres: game.genres.map(genre => genre.name)
      }
    ))
  } catch (error) {
    console.error(error)
    throw error
  }
}

const getVideogamesByName = async (name) => {
  try {
    const apiVideogames = await getApiVideogamesByName(name)
    const dbVideogames = await getDBVideogamesByName(name)
    return dbVideogames
      .concat(apiVideogames)
      .slice(0, 15)
  } catch (error) {
    console.error(error)
    throw error
  }
}

module.exports = getVideogamesByName
