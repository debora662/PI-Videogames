import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { postVideogame, getPlatforms, getGenres } from '../../redux/actions/actions'
import { validate } from './validate'
import { useNavigate } from 'react-router-dom'
import styles from './CreateVideogame.module.css'

export default function CreateVideogame () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const allGenres = useSelector(state => state.genres)
  const platformsApi = useSelector(state => state.platforms)
  const genres = useSelector(state => state.genres)
  const [errors, setErrors] = useState({})

  const [videogame, setVideogame] = useState({
    name: '',
    description: '',
    image: '',
    platforms: [],
    rating: '',
    genres: [],
    released: ''
  })

  useEffect(() => {
    if (genres.length === 0) dispatch(getGenres())
  }, [dispatch, genres.length])

  const handleChange = (event) => {
    setVideogame({
      ...videogame,
      [event.target.name]: event.target.value
    })
    setErrors(validate({
      ...videogame,
      [event.target.name]: event.target.value
    }))
  }

  useEffect(() => {
    dispatch(getPlatforms())
  }, [dispatch])

  const handleSelectGenre = (event) => {
    const checkGenres = videogame.genres
    if (!checkGenres.includes(event.target.value)) {
      checkGenres.push(event.target.value)
    }
    setVideogame({
      ...videogame,
      genres: checkGenres
    })
    setErrors(validate({
      ...videogame,
      [event.target.name]: event.target.value
    }))
  }

  const handleDeleteGenres = (event) => {
    setVideogame({
      ...videogame,
      genres: videogame.genres.filter(gen => gen !== event)
    })
  }

  const handleSelectPlatforms = (event) => {
    const checkPlatforms = videogame.platforms
    if (!checkPlatforms.includes(event.target.value)) {
      checkPlatforms.push(event.target.value)
    }
    setVideogame({
      ...videogame,
      platforms: checkPlatforms
    })
    setErrors(validate({
      ...videogame,
      [event.target.name]: event.target.value
    }))
  }

  const handleDeletePlatform = (event) => {
    setVideogame({
      ...videogame,
      platforms: videogame.platforms.filter(plat => plat !== event)
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(postVideogame(videogame))
      .then(response => {
        window.alert(response)
      })
      .catch(error => window.alert(error.message))
    navigate('/home')
  }

  return (
    <div id={styles.container}>
      <h1>Create your video game</h1>

      <form onSubmit={handleSubmit}>
        <div id={styles.containerBoxes}>
          <label>Name: </label>
          <input id={styles.inputs} type='text' name='name' value={videogame.name} onChange={handleChange} />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}

          <label>Description: </label>
          <textarea id={styles.description} type='text' name='description' value={videogame.description} onChange={handleChange} />
          {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}

          <label>Image: </label>
          <input id={styles.inputs} type='text' name='image' value={videogame.image} onChange={handleChange} />
          {errors.image && <p style={{ color: 'red' }}>{errors.image}</p>}

          <label>Relesead: </label>
          <input id={styles.dates} type='date' name='released' value={videogame.released} onChange={handleChange} />
          {errors.released && <p style={{ color: 'red' }}>{errors.released}</p>}

          <label>Rating: </label>
          <input id={styles.inputs1} type='number' name='rating' value={videogame.rating} step={0.01} onChange={handleChange} />
          {errors.rating && <p style={{ color: 'red' }}>{errors.rating}</p>}

          <label htmlFor='genres'>Genres: </label>
          <select className={styles.genre} id='genres' onChange={handleSelectGenre}>
            <option>Choose one o more</option>
            {allGenres?.map(genre => (
              <option key={genre.id} value={genre.name}>
                {genre.name}
              </option>
            ))}
          </select>
          {errors.genres && <p style={{ color: 'red' }}>{errors.genres}</p>}

          <ul>
            {videogame.genres.map(gen =>
              <div key={gen} id={styles.Container}>
                <button className={styles.btn0} onClick={() => handleDeleteGenres(gen)}>X</button>
                <li>{gen}</li>
              </div>
            )}
          </ul>

          <label htmlFor='platforms'>Platforms: </label>
          <select className={styles.platform} id='platforms' onChange={handleSelectPlatforms}>
            <option>Choose one o more</option>
            {platformsApi.map(plat => (
              <option key={plat}>
                {plat}
              </option>
            ))}
          </select>
          {errors.platforms && <p style={{ color: 'red' }}>{errors.platforms}</p>}

          <ul>
            {videogame.platforms.map(plat =>
              <div key={plat} id={styles.Container1}>
                <button onClick={() => handleDeletePlatform(plat)}>X</button>
                <li>{plat}</li>
              </div>
            )}
          </ul>

        </div>

        <button className={styles.btn} type='submit' disabled={(Object.keys(errors).length > 0) || videogame.name === ''}>Create Videogame</button>

      </form>

    </div>
  )
}
