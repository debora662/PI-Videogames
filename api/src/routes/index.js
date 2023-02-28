const { Router } = require('express')
const router = Router()

const genres = require('./genres.js')
const videogames = require('./videogames.js')
const platforms = require('./platforms.js')

router.use('/genres', genres)
router.use('/videogames', videogames)
router.use('/platforms', platforms)

module.exports = router
