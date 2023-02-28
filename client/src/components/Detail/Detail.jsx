import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDetail, clearDetail } from '../../redux/actions/actions'

export default function Detail () {
  const dispatch = useDispatch()
  const { id } = useParams()
  const detailVideogame = useSelector(state => state.detail)

  useEffect(() => { // Component Did Mount
    dispatch(getDetail(id))
    return () => { // Componente Will Unmount
      dispatch(clearDetail())
    }
  }, [id, dispatch])

  return (
    <div>
      <h1>Title: {detailVideogame.name} </h1>
      <img src={detailVideogame.image} alt='not found' width='400px' height='250px' />
      <h3>Id: {detailVideogame.id}</h3>
      <h3>Released: {detailVideogame.released} </h3>
      <h3>Rating:  {detailVideogame.rating} </h3>
      <h3>Genres: {detailVideogame?.genres?.join('-')} </h3>
      <h4>Platforms: {detailVideogame?.platforms?.join('-')}</h4>
      <h4> Description: {detailVideogame.description} </h4>
      <div>
        <Link to='/home'>
          <button>Back</button>
        </Link>
      </div>
    </div>
  )
}
