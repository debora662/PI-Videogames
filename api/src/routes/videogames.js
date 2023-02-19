const express = require("express");
const getAllVideogames = require("../controllers/getVideogames") //controlador que trae tanto los games de la api como la db
const getVideogameById = require("../controllers/getVideogameById")
const getVideogamesByName = require('../controllers/getVideogamesByName')
const createNewVideogame = require('../controllers/createNewVideogame')
const router = express.Router();

router.get("/", async (req, res) => {
    const { name } = req.query
    try {
        if (name) { // si hay query, busco por nombre
            const videogamesByName = await getVideogamesByName(name) // llamo al controller que busca por nombre
            if (videogamesByName.length) { // si tengo resultados
                return res.status(200).json(videogamesByName)
            } else { // si no tengo resultados
                return res.status(404).send("No se encontraron videojuegos con ese nombre")
            }
        } else {//caso no hay query, mando todos
            const allVideogames = await getAllVideogames() //me traigo 100 juegos de la api y todos los de la db
            return res.status(200).json(allVideogames)
        }
    } catch (error) {
        res.status(400).send({ error: error.message })
    }

})


router.get("/:id", async (req, res) => {
    const { id } = req.params;
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
        res.send(response)
    } catch (error) {
        res.status(400).send({ error: error.message })
    }
})

module.exports = router;


