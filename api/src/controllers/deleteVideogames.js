const { Videogame } = require('../db')

const deleteVideogames = async (id) => {
    try {
        if (id) await Videogame.destroy({
            where: { id: id }
        })        
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = deleteVideogames