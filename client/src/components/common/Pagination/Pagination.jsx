import React from 'react'
import { useSelector } from 'react-redux';
import styles from "./Pagination.module.css";

const Pagination = ({ cardsPerPage, totalCards, selectPageNumber }) => {

  const currentPage = useSelector((state) => state.currentPage);

  function handleNumberPage(totalPages, pageSelected) {
    createPagination(totalPages, pageSelected);
    selectPageNumber(pageSelected);
    setTimeout(() => {
      window.scroll({
        top: 0,
        behavior: "smooth"
      });
    }, 40)
  }

  const createPagination = (totalPages, page = currentPage) => {

    let liTags = [];
    
    if (page > 1 && totalPages > 2) {
      liTags.push(
        <li  className={styles.prev}  key="prev"  onClick={(e) => { handleNumberPage(totalPages, page - 1) }}>
          <span> <i className="fas fa-chevron-left"></i> {" Prev"} </span>
        </li>
      )
    }
    
    let beforePage = page === 1 ? 1 : page - 1; 
    beforePage = (page === totalPages  && totalPages>3) ? page - 2 : beforePage;
    beforePage = (page === totalPages -1  && totalPages>3) ? page - 1 : beforePage;

    let afterPage = page === totalPages ? totalPages : page + 1;
    afterPage = (page === 1  && totalPages > 3) ? page + 2 : afterPage
    afterPage = (page === 2  && totalPages > 3) ? page + 1 : afterPage
    

    for (let i = beforePage; i <= afterPage; i++) {
      liTags.push(
        <li 
          className={`${styles.numb} ${ page === i ? styles.active : ""}`}  
          key={i} 
          onClick={(e) => { handleNumberPage(totalPages, i) }}
        >
          <span>{i}</span>
        </li>
      )
    }

    if (page < totalPages && totalPages > 2) {
      liTags.push(
        <li className={styles.next} key="next" onClick={(e) => { handleNumberPage(totalPages, page + 1) }}>
          <span> {"Next "} <i className="fas fa-chevron-right"></i> </span>
        </li>
      )
    }
    return liTags;
  }

  let totalNumberPages = Math.ceil(totalCards / cardsPerPage);

  return (
    totalNumberPages<=1 
    ? <div></div>
    : <div className={styles.pagination_container}>
        <ul>
          {createPagination(totalNumberPages, currentPage)}
        </ul>
      </div>
  )
}

export default Pagination
