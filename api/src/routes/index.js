const { Router } = require('express');
const router = Router();

const genres = require("./genres.js")
const videogames = require("./videogames.js")

router.use("/genres", genres) //la request que vaya a /genres
router.use("/videogames", videogames)

module.exports = router;