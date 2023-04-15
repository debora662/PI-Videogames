
const regexRating = /^(?:[1-5](?:\.\d+)?|5(?:\.0+)?)$/
const imgRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g

export function validate (videogame) {
  const errors = {}

  if (videogame.name === '') {
    errors.name = 'Write a name, please'
  }

  if (!videogame.description) {
    errors.description = 'Write a description, please'
  }

  if (videogame.description.length < 30) {
    errors.description = '30 characters minimum please'
  }

  if (!imgRegex.test(videogame.image)) {
    errors.image = 'Please insert a valid image URL'    
  }

  if (!regexRating.test(videogame.rating)) {
    errors.rating = 'Choose a number between 1 and 5 '
  }

  if (videogame.released.length === 0) {
    errors.released = 'Choose a date'
  }

  if (videogame.genres.length === 0) {
    errors.genres = 'Select a genre, please'
  }

  if (videogame.platforms.length === 0) {
    errors.platforms = 'Select a platform, please'
  }

  return errors
}
