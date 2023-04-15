import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import styles from './Nav.module.css'
import SearchBar from '../SearchBar/SearchBar'
import Loading from '../Loading/Loading'
import { filteredGenres, orderByName, filterByOrigin, getVideogames } from '../../redux/actions/actions'


export default function Nav() {
  const location = useLocation().pathname
  const dispatch = useDispatch()
  const allGenres = useSelector(state => state.genres)
  const [isLoading, setIsLoading] = useState(false)
      
  const handleReload = (event) => {
    event.preventDefault()
    setIsLoading(true)
    dispatch(getVideogames())
      .then(() => setIsLoading(false))
  }

  const handleFilteredGenres = (event) => {
    event.preventDefault()
    dispatch(filteredGenres(event.target.value))       
  }

  const handleOrder = (event) => {
    event.preventDefault()
    dispatch(orderByName(event.target.value))    
  }

  const handleByOrigin = (event) => {
    event.preventDefault()
    dispatch(filterByOrigin(event.target.value))    
  }



  if (location === '/') return null

  return (

    <div className={styles.containerNav}>


      {location !== '/newVideogame'
        ? (
          <Link to='/newVideogame'>
            <button id={styles.btn}>Create Videogame</button>
          </Link>
        )
        : null}

      {location !== '/home'
        ? (
          <Link to='/home'>
            <button id={styles.btn2}>Home</button>
          </Link>
        )
        : null}

      {location === '/home'
        ? (
          <>
            <div>
              {isLoading ? (
                <Loading />
              ) : (
                <button id={styles.btn2} onClick={handleReload}>Reload</button>
              )}
            </div>

            <SearchBar />

            <div>
              <select className={styles.btns} onChange={handleFilteredGenres}>
                <option value='All'>All</option>
                {allGenres.map(genre => (
                  <option key={genre.id} value={genre.name}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <select className={styles.btns} onChange={handleByOrigin}>
                <option>Origin</option>
                <option value='All'>All</option>
                <option value='Created'>Created</option>
                <option value='Api'>Existent</option>
              </select>
            </div>

            <div>
              <select onChange={handleOrder} className={styles.btns}>
                <option>Order by...</option>
                <option value='AZ'>A-Z</option>
                <option value='ZA'>Z-A</option>
                <option value='RatingLow'>Rating Low</option>
                <option value='RatingHigh'>Rating High</option>
              </select>
            </div>
          </>
        )
        : null}

    </div>
  )
}
