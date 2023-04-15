import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from 'react'
import styles from './Home.module.css'
import Card from '../Card/Card'
import Loading from '../Loading/Loading'
import { getGenres, getVideogames } from '../../redux/actions/actions'
import Pagination from '../Pagination/Pagination'



export default function Home() {
  const videogamesToShow = useSelector(state => state.videogamesToShow)
  const genres = useSelector(state => state.genres)
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const videogamesPerPage = 15
  const indexOfLastVideogame = currentPage * videogamesPerPage
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage
  const currentVideogames = videogamesToShow.slice(indexOfFirstVideogame, indexOfLastVideogame)

  const pagination = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    if (genres.length === 0) dispatch(getGenres())
    if (videogamesToShow.length === 0) {
      setIsLoading(true)
      dispatch(getVideogames())
        .then(() => setIsLoading(false)
        )
    }
  }, [dispatch, videogamesToShow.length, genres.length])

  return (
    <div id={styles.background}>
          
      <div>
        <Pagination
          videogamesPerPage={videogamesPerPage}
          videogamesToShow={videogamesToShow.length}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pagination={pagination}
        />
      </div>

      {isLoading
        ? (
          <Loading />
        )
        : (
          <div id={styles.cards}>
            {currentVideogames.map((game) => {
              return (
                <Card
                  key={game.id}
                  name={game.name}
                  image={game.image}
                  genres={game.genres}
                  id={game.id}
                />
              )
            })}
          </div>
        )}
    </div>
  )
}
