import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDetail, clearDetail, deleteVideogame, getVideogames } from '../../redux/actions/actions'
import styles from './Detail.module.css'
import Loading from '../Loading/Loading'

export default function Detail() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()
  const detailVideogame = useSelector(state => state.detail)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    dispatch(getDetail(id))
      .then(() => setIsLoading(false))
    return () => {
      dispatch(clearDetail())
    }
  }, [id, dispatch])


  const handlerDelete = (id) => {
    dispatch(deleteVideogame(id))
      .then(() => {
        dispatch(getVideogames())
        window.alert('Videogame deleted successfully')
        navigate('/home')
      })

  }

  return (
    <div>

      {isLoading
        ? (<Loading />)
        : (
          <div id={styles.containerDetail}>
            <div id={styles.back}>
              <div>
                <h1 id={styles.title}>Title: {detailVideogame?.name} </h1>
              </div>

              <div>
                <img src={detailVideogame?.image} alt='not found' id={styles.imgDiv} />
              </div>

              <div id={styles.group}>
                <h3>Id: {detailVideogame?.id}</h3>
                <h3>Released: {detailVideogame?.released} </h3>
                <h3>Rating:  {detailVideogame?.rating} </h3>
                <h3>Genres: {detailVideogame?.genres?.join('-')} </h3>
                <h4>Platforms: {detailVideogame?.platforms?.join('-')}</h4>
              </div>

              <div id={styles.description}>
                <h4> Description: {detailVideogame?.description} </h4>
              </div>
            </div>

            {typeof detailVideogame.id === 'string' && detailVideogame.id.includes('-') &&
              <button className={styles.bntdelete} onClick={() => handlerDelete(id)}>Delete</button>
            }

          </div>
        )}

    </div>
  )
}







