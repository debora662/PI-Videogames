const express = require('express')
const getAllVideogames = require('../controllers/getVideogames')
const getVideogameById = require('../controllers/getVideogameById')
const getVideogamesByName = require('../controllers/getVideogamesByName')
const createNewVideogame = require('../controllers/createNewVideogame')
const deleteVideogames = require('../controllers/deleteVideogames')
const router = express.Router()

router.get('/', async (req, res) => {
  const { name } = req.query
  try {
    if (name) {
      const videogamesByName = await getVideogamesByName(name)
      if (videogamesByName.length > 0) {
        return res.status(200).json(videogamesByName)
      } else {
        return res.status(404).send('Videogame not found')
      }
    } else {
      const allVideogames = await getAllVideogames()
      return res.status(200).json(allVideogames)
    }
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const response = await getVideogameById(id)
    res.status(200).json(response)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

router.post('/', async (req, res) => {
  const { name, description, image, genres, rating, platforms, released } = req.body
  try {
    const response = await createNewVideogame({ name, description, image, genres, rating, platforms, released })
    res.status(200).json(response)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  const {id} = req.params
  try {
    const response = await deleteVideogames(id)
    res.status(200).json(response)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

module.exports = router
