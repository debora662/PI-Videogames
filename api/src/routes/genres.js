const express = require('express')
const getGenders = require('../controllers/getGenders')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const response = await getGenders()
    res.status(200).json(response)
  } catch (error) {
    res.status(400).send({ error: error.message })
  }
})

module.exports = router
