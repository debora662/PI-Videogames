const { Router } = require('express');
const router = Router();
const genres = require("./genres.js")

router.use("/genres", genres) //la request que vaya a /genres

module.exports = router;