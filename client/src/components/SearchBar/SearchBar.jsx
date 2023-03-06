import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getVideogameName } from '../../redux/actions/actions'
import styles from './SearchBar.module.css'

export default function SearchBar () {
  const dispatch = useDispatch()
  const [name, setName] = useState('')

  const handleInputChange = (event) => {
    event.preventDefault()
    setName(event.target.value)// me guardo en el estado local name lo que el usuario escribió
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(getVideogameName(name))// hago dispatch de la action y le paso por argumento lo que tengo en el estado local
  }

  return (
    <div>
      <input className={styles.menu} type='text' placeholder='Search Videogame...' onChange={handleInputChange} />
      <button className={styles.btn} type='submit' onClick={handleSubmit}>Search</button>
    </div>
  )
}
