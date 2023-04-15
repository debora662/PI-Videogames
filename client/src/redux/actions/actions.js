import { GET_VIDEOGAMES, GET_GENRES, GET_DETAIL, GET_VIDEOGAME_NAME, GET_ORDER_BY_NAME, FILTERED_GENRES, GET_ORDER_BY_ORIGIN, GET_PLATFORMS, DELETE_VIDEOGAME } from './types'
import axios from 'axios'


export function getVideogames () {
  return async (dispatch) => {
    try {
      const response = await axios('/videogames')

      return dispatch({
        type: GET_VIDEOGAMES,
        payload: response.data
      })
    } catch (error) {
      throw Error(error)
    }
  }
}

export function getVideogameName (name) {
  return async (dispatch) => {
    try {
      const response = await axios(`/videogames?name=${name}`)

      return dispatch({
        type: GET_VIDEOGAME_NAME,
        payload: response.data
      })
    } catch (error) {
      throw Error(error)
    }
  }
}

export function orderByName (order) {
  return {
    type: GET_ORDER_BY_NAME,
    payload: order
  }
}

export function getDetail (id) {
  return async (dispatch) => {
    try {
      const response = await axios(`/videogames/${id}`)

      return dispatch({
        type: GET_DETAIL,
        payload: response.data
      })
    } catch (error) {
      throw Error(error)
    }
  }
}

export function clearDetail () {
  return async (dispatch) => {
    try {
      return dispatch({
        type: GET_DETAIL,
        payload: []
      })
    } catch (error) {
      throw Error(error)
    }
  }
}

export function getGenres () {
  return async (dispatch) => {
    try {
      const response = await axios('/genres')

      return dispatch({
        type: GET_GENRES,
        payload: response.data
      })
    } catch (error) {
      throw Error(error)
    }
  }
}

export function getPlatforms () {
  return async (dispatch) => {
    try {
      const response = await axios('/platforms')

      return dispatch({
        type: GET_PLATFORMS,
        payload: response.data
      })
    } catch (error) {
      throw Error(error)
    }
  }
}

export function filteredGenres (genre) {
  return {
    type: FILTERED_GENRES,
    payload: genre
  }
}

export function filterByOrigin (id) {
  return {
    type: GET_ORDER_BY_ORIGIN,
    payload: id
  }
}

export function postVideogame (obj) {
  return async function (dispatch) {
    try {
      const response = await axios.post('/videogames', obj)
      return response.data
    } catch (error) {
      throw Error(error)
    }
  }
}

export function deleteVideogame (id) {
  return async (dispatch) => {
    try {
      const response = await axios.delete(`/videogames/${id}`)
      return response.data
    } catch (error) {
      throw Error(error)
    }
  }
}