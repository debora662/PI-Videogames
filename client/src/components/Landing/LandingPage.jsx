import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { getGenres, getVideogames } from '../../redux/actions/actions'
import Loading from '../Loading/Loading'
import styles from './LandingPage.module.css'

export default function LandingPage () {
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    dispatch(getGenres())
    dispatch(getVideogames())
      .then(() => {
        setIsLoading(false)
        setLoaded(true)
      })
      .catch(() => {
        setIsLoading(false)
        window.alert('Sitio en mantenimiento...')
      })
  }, [dispatch])

  return (

    <div className={styles.contenedor}>

      <h1>Bienvenidos a mi aplicación</h1>

      {isLoading ? <Loading /> : null}
      {loaded
        ? (
          <Link to='/home'>
            <button>ACCESS</button>
          </Link>
          )
        : null}
    </div>
  )
}
