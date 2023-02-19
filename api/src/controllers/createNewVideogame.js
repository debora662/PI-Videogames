const { Genre, Videogame } = require("../db")

const createNewVideogame = async ({ name, description, image, genres, rating, platforms, released }) => {
    try {

        const newGame = {
            name,
            description,
            image,
            rating,
            platforms,
            released
        }

        // creo el videojuego nuevo en la DB y guardo una referencia al mismo en la const
        const createdGame = await Videogame.create(newGame) 

        for (const genre of genres) {
            const newGameGenre = await Genre.findOne({ where: { name: genre } })
            createdGame.addGenre(newGameGenre) 
            // en cada iteración uso la referencia al juego creado y 
            // lo relaciono con el genero que encuentro
        }        
        return createdGame
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = createNewVideogame
