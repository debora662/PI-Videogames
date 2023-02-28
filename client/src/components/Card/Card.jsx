import React from 'react'
import { Link } from 'react-router-dom'

export default function Card ({ name, image, genres, id }) {
  const genre = genres?.map((gen) => gen)

  return (
    <div>
      <Link to={`/detail/${id}`}>
        <img src={image} alt='img not found' width='200px' height='250px' />
      </Link>
      <h3>{name}</h3>
      <h4>{genre.join('-')}</h4>
    </div>
  )
}
