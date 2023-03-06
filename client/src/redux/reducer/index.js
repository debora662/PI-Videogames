import {
  GET_VIDEOGAMES,
  GET_GENRES,
  GET_DETAIL,
  GET_VIDEOGAME_NAME,
  GET_ORDER_BY_NAME,
  FILTERED_GENRES,
  GET_ORDER_BY_ORIGIN,
  GET_PLATFORMS
} from '../actions/types'

const initialState = {
  videogamesToShow: [],
  allVideogames: [],
  genres: [],
  detail: [],
  platforms: []
}

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogamesToShow: payload,
        allVideogames: payload 
      }
    case GET_VIDEOGAME_NAME:
      return {
        ...state,
        videogamesToShow: payload
      }
    case GET_PLATFORMS:
      return {
        ...state,
        platforms: payload
      }

    case GET_GENRES:
      return {
        ...state,
        genres: payload
      }
    case FILTERED_GENRES:
      const allVideogames = state.allVideogames
      const genresFiltered = payload === 'All'
        ? allVideogames
        : allVideogames.filter((game) => game.genres.includes(payload))
      return {
        ...state,
        videogamesToShow: [...genresFiltered]
      }
    case GET_ORDER_BY_ORIGIN:
      const allOrigins = state.allVideogames
      const originFiltered = payload === 'Created'
        ? allOrigins.filter((game) => game.id.length > 20)
        : allOrigins.filter((game) => !game.id.length)
      return {
        ...state,
        videogamesToShow: payload === 'All' ? allOrigins : originFiltered
      }
    case GET_ORDER_BY_NAME:

      let orderGames = []

      if (payload === 'AZ') {
        orderGames = state.videogamesToShow.sort((a, b) => {
          if (a.name > b.name) { return 1 }
          if (a.name < b.name) { return -1 }
          return 0
        })
      }

      if (payload === 'ZA') {
        orderGames = state.videogamesToShow.sort((a, b) => {
          if (a.name > b.name) { return -1 }
          if (a.name < b.name) { return 1 }
          return 0
        })
      }

      if (payload === 'RatingLow') {
        orderGames = state.videogamesToShow.sort((a, b) => {
          if (a.rating > b.rating) { return 1 }
          if (a.rating < b.rating) { return -1 }
          return 0
        })
      }

      if (payload === 'RatingHigh') {
        orderGames = state.videogamesToShow.sort((a, b) => {
          if (a.rating > b.rating) { return -1 }
          if (a.rating < b.rating) { return 1 }
          return 0
        })
      }
      return {
        ...state,
        videogamesToShow: [...orderGames]
      }

    case GET_DETAIL:
      return {
        ...state,
        detail: payload
      }
    default:
      return state
  }
}

export default reducer
