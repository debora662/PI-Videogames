import styles from './Pagination.module.css'

export default function Pagination ({ videogamesPerPage, videogamesToShow, pagination, setCurrentPage, currentPage }) {
   
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(videogamesToShow / videogamesPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div>
      {pageNumbers.map(number => (
        <button className={`${styles.botons} ${currentPage === number ? styles.active : ''}`} key={number} onClick={() => {
          setCurrentPage(number)
          pagination(number)
        }}>{number}</button>
      ))}

    </div>
  )
}
