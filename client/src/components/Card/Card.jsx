import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Card.module.css'

export default function Card ({ name, image, genres, id }) {
  const genre = genres?.map((gen) => gen)

  return (
    <div className={styles.box}>
      <Link to={`/detail/${id}`}>
        <img className={styles.imagen} src={image} alt='img not found' />
        <h3>{name}</h3>
        <h4>{genre.join('-')}</h4>
      </Link>
    </div>
  )
}
