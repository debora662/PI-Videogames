const { Videogame } = require('../db')

const deleteVideogameCreated = async (id) => {
  const videogameFinded = await Videogame.findByPk(id)

  if (!videogameFinded) throw new Error('Video game not found')

  else videogameFinded.destroy()
}

module.exports = deleteVideogameCreated
