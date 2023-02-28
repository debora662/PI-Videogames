import { useSelector, useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import styles from './Nav.module.css'
import SearchBar from '../SearchBar/SearchBar'
import { filteredGenres, orderByName, filterByOrigin } from '../../redux/actions/actions'

export default function Nav () {
  const location = useLocation().pathname
  const dispatch = useDispatch()
  const allGenres = useSelector(state => state.genres)
  console.log(location)

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

  return (
    <div className={styles.containerNav}>

      <Link to='/home'>
        <button className={styles.btn}>Home</button>
      </Link>

      {location !== '/newVideogame'
        ? (
          <Link to='/newVideogame'>
            <button className={styles.btn}>Create Videogame</button>
          </Link>
          )
        : null}

      {location === '/home'
        ? (
          <>
            <SearchBar />
            <div>
              <select className={styles.menu} onChange={handleFilteredGenres}>
                <option value='All'>All</option>
                {allGenres.map(genre => (
                  <option key={genre.id} value={genre.name}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <select className={styles.menu} onChange={handleByOrigin}>
                <option>Origin</option>
                <option value='All'>All</option>
                <option value='Created'>Created</option>
                <option value='Api'>Existent</option>
              </select>
            </div>
            <div>
              <select onChange={handleOrder}>
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
