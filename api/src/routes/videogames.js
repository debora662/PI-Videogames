const express = require('express')
const getAllVideogames = require('../controllers/getVideogames')
const getVideogameById = require('../controllers/getVideogameById')
const getVideogamesByName = require('../controllers/getVideogamesByName')
const createNewVideogame = require('../controllers/createNewVideogame')
const deleteVideogameCreated = require('../controllers/deleteVideogameCreated')
const router = express.Router()

router.get('/', async (req, res) => {
  const { name } = req.query
  try {
    if (name) {
      const videogamesByName = await getVideogamesByName(name)
      if (videogamesByName.length) {
        return res.status(200).json(videogamesByName)
      } else {
        return res.status(404).send('No se encontraron videojuegos con ese nombre')
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
    res.status(200).send(response)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const response = await createNewVideogame(req.body)
    res.json(response)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params
  try {
    const response = await deleteVideogameCreated(id)
    res.status(200).json(response)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

module.exports = router
