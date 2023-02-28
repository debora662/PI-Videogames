const express = require('express')
const getPlatforms = require('../controllers/getPlatforms')

const router = express.Router()

router.get('/', (req, res) => {
  const response = getPlatforms()
  res.status(200).json(response)
})

module.exports = router
