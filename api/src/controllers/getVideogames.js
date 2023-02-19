require('dotenv').config();
const axios = require("axios");
const { API_KEY } = process.env;
const { Genre, Videogame } = require("../db")

const getApiVideogames = async () => { //controller para traerme la información de la api
    try {

        let dataGames = [] //array para guardar los 20 juegos por pagina (total 5 paginas = 100 juegos)

        for (let i = 1; i < 6; i++) {
            let apiData = await axios(`https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`);

            dataGames.push(apiData); //pusheo las promesas pendientes al array

        }
        //Promise.all resuelve todas las promesas pendientes juntas, luego mapeo para quedarme con lo que realmente me interesa de la info  
        dataGames = (await Promise.all(dataGames)).map(res => res.data.results.map(game => {
            return ({
                id: game.id,
                name: game.name,
                released: game.released,
                image: game.background_image,
                rating: game.rating,
                platforms: game.platforms?.map(el => el.platform.name),
                genres: game.genres?.map(el => el.name)
            })
        }))

        let allVideogames = []; //en este array vacio concateno el array de array (dataGame) para quedarme con un solo array de objetos
        dataGames.map(game => { allVideogames = allVideogames.concat(game) })

        return allVideogames;

    } catch (error) {
        throw new Error("Genero no encontrado")
    }
}

const getDBVideogames = async () => {  //fn para traer la info de la db
    return await Videogame.findAll({  //trae todo de videogame y el atributo (name) del modelo Genre que quiero que incluya esta llamada
        include: {
            model: Genre,
            attributes: ['name'],
            through: { //comprueba de traer genre y name (mediante = through) atributos
                attributes: [],
            }
        }
    });
}

const getAllVideogames = async () => {  //está fn junta y trae la info tanto de la api como de la db
    const apiVideogames = await getApiVideogames()
    const dbVideogames = await getDBVideogames()
    return dbVideogames.concat(apiVideogames)
}



module.exports = getAllVideogames
