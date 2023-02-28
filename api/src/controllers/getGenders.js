require('dotenv').config()
const axios = require('axios')
const { API_KEY } = process.env
const { Genre } = require('../db')

const getGenders = async () => {
  try {
    const dbGenres = await Genre.findAll()

    if (dbGenres.length === 0) {
      const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
      const apiGenres = response
        .data
        .results
        .map(gen => gen.name)

      for (const genre of apiGenres) {
        await Genre.findOrCreate({
          where: { name: genre }
        })
      }

      return apiGenres
    } else {
      return dbGenres
    }
  } catch (error) {
    throw new Error('Genero no encontrado')
  }
}

module.exports = getGenders
