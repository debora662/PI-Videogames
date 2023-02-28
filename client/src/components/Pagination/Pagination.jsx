import React from 'react'

export default function Pagination ({ videogamesPerPage, videogamesToShow, pagination }) {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(videogamesToShow / videogamesPerPage); i++) {
    pageNumbers.push(i)
  }// numero de paginas: divido juegos totales / juegos por mostrar (15), redondea para arriba el resultado

  return (
    <div>

      {pageNumbers.map(number => (
        <button key={number} href onClick={() => pagination(number)}>{number}</button>
      ))}

    </div>
  )
}
