import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cleanUpSearchByName } from '../../../../redux/actions';
import Loader from '../../../common/Loader/Loader';
import NoResults from "../../../../assets/img/NoResults.webp"
import styles from "./SearchResults.module.css"
import Front from '../../../common/Card/Front/Front';
import Back from '../../../common/Card/Back/Back';
const SearchResults = () => {
  const dispatch = useDispatch()
  let pokemonsSearched = useSelector((state) => state.pokemonsSearched);
  let loading = useSelector((state) => state.loading);
  
  function handleClick(){
    dispatch(cleanUpSearchByName());
    window.scroll({
      top: 0,
      behavior: "smooth"
    });
  }
  return (
    <div className={styles.container}>
      <span className="fas fa-times" onClick={() => {handleClick()}}></span>
      {
        loading 
        ? <Loader />
        : pokemonsSearched.length
          ? <div className={styles.cards__container}>
                  <Front element={pokemonsSearched[0]} />
                  <Back element={pokemonsSearched[0]} />
              
            </div>
          : <>
              <h2>No results.</h2>
              <img src={NoResults} alt="" />
            </>
      }
      <button className={styles.btn} onClick={() => { handleClick()}}><h3>Go to home</h3></button>
    </div>
  )
}

export default SearchResults