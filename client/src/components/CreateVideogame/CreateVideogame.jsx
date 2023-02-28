import { useSelector, useDispatch } from 'react-redux'
import { useState, useEffect } from 'react'
import { postVideogame, getPlatforms } from '../../redux/actions/actions'
import styles from './CreateVideogame.module.css'
import { validate } from './validate'
import { useNavigate } from 'react-router-dom'

export default function CreateVideogame () {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const allGenres = useSelector(state => state.genres)
  const platformsApi = useSelector(state => state.platforms)

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

  const handleSelectGenre = (event) => {
    const checkGenres = videogame.genres
    if (!checkGenres.includes(event.target.value)) {
      checkGenres.push(event.target.value)
    }
    setVideogame({
      ...videogame,
      genres: checkGenres
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
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    setErrors(
      validate({
        ...videogame,
        [event.target.name]: event.target.value
      })
    )
    if (Object.keys(errors).length === 0) {
      dispatch(postVideogame(videogame))
      alert('Videogame Created')

      setVideogame({
        name: '',
        image: '',
        description: '',
        released: '',
        rating: '',
        genres: [],
        platforms: []
      })
    } else {
      alert('Debe llenar todos los campos')
    }
    navigate.push('/home')
  }

  useEffect(() => {
    dispatch(getPlatforms())
  }, [dispatch])

  return (
    <div>
      <div className={styles.CreateVideogame}>
        <h1>Create your video game</h1>
        <form onSubmit={handleSubmit}>

          <div>
            <label>Name: </label>
            <input type='text' name='name' value={videogame.name} onChange={handleChange} />
            {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
          </div>

          <div>
            <label>Description: </label>
            <textarea type='text' name='description' value={videogame.description} onChange={handleChange} />
            {errors.description && <p style={{ color: 'red' }}>{errors.description}</p>}
          </div>

          <div>
            <label>Image: </label>
            <input type='text' name='image' value={videogame.image} onChange={handleChange} />
            {errors.image && <p style={{ color: 'red' }}>{errors.image}</p>}
          </div>

          <div>
            <label>Relesead: </label>
            <input type='date' name='released' value={videogame.released} onChange={handleChange} />
          </div>

          <div>
            <label>Rating: </label>
            <input type='number' name='rating' value={videogame.rating} step={0.01} onChange={handleChange} />
            {errors.rating && <p style={{ color: 'red' }}>{errors.rating}</p>}
          </div>

          <div>
            <label>Genres: </label>
            <select onChange={handleSelectGenre}>
              <option>Choose one o more</option>
              {allGenres?.map(genre => (
                <option key={genre.id} value={genre.name}>
                  {genre.name}
                </option>
              ))}
              {errors.genres && <p style={{ color: 'red' }}>{errors.genres}</p>}
            </select>
            <ul>
              {videogame.genres.map((gen) => (
                <li key={gen}>{gen + ','}</li>
              ))}
            </ul>
          </div>

          <div>
            <label>Platforms: </label>
            <select onChange={handleSelectPlatforms}>
              <option>Choose one o more</option>
              {platformsApi.map(plat => (
                <option key={plat.id}>
                  {plat}
                </option>
              ))}
            </select>
            {errors.platforms && <p style={{ color: 'red' }}>{errors.platforms}</p>}
            <ul>
              {videogame.platforms.map((plat) => (
                <li key={plat.id}>{plat + ','}</li>
              ))}
            </ul>
          </div>

          <button type='submit'>Create Videogame</button>

        </form>

      </div>
    </div>
  )
}
