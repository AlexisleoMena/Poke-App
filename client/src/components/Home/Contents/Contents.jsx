import React from 'react'
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getAllPokemons, getAllFavorites, setLoading, setCurrentPage, deepCleanUp } from "../../../redux/actions";
import { useAuth0 } from "@auth0/auth0-react";

import Pagination from "../../common/Pagination/Pagination";
import SearchResult from "./SearchResults/SearchResults";
import Loader from "../../common/Loader/Loader";

import styles from "./Contents.module.css"
import StatusFilters from './StatusFilters/StatusFilters';
import Filters from './Filters/Filters';
import Front from '../../common/Card/Front/Front';
import { useCallback } from 'react';

const CardsContainer = ({array}) => (
  <div className={styles.cards__container}>
    { array?.map((element) =>
        <Front element={element} key={element.id}/>
    )}
  </div>
)

const Contents = ({elements, allElements}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();

  const { isAuthenticated ,user } = useAuth0();

  const { loading, currentPage, recentSearch } = useSelector((state) => state)
  const [openFilters, setOpenFilters] = useState(false);
  useEffect(() => {
    if(!elements.length) {
      dispatch(setLoading(true))
      dispatch(getAllPokemons())
    }
    if(isAuthenticated && user && Object.keys(user).length) {
      dispatch(getAllFavorites(user.email))
    }
  }, [dispatch, isAuthenticated, elements.length, user]);

  const cardsPerPage = 12;
  const lastIndex = currentPage * cardsPerPage;
  const firstIndex = lastIndex - cardsPerPage;
  let currentCards = elements.slice(firstIndex, lastIndex);
  const selectPageNumber = useCallback(pageNumber => dispatch(setCurrentPage(pageNumber)), [dispatch]);

  useEffect(() => {
    if(elements.length && !currentCards.length && cardsPerPage !== 1) {
      selectPageNumber(currentPage - 1)
    }
  }, [elements.length ,currentCards.length, currentPage, selectPageNumber] )



  function handleClickNewDeck() {
    dispatch(deepCleanUp())
    localStorage.setItem('allPokemons', JSON.stringify(null))
    dispatch(setLoading(true))
    dispatch(getAllPokemons())
    navigate("/");
  }


  return (
    <main className={styles.container}>
      { location.pathname !== '/favorites' 
          && 
          <button className={styles.btn__new_deck} onClick={() => handleClickNewDeck()}>
            <h3>New deck</h3>
          </button>
      }
      <div className={styles.main}>
        {loading 
          ? <Loader />
          : recentSearch
            ? <SearchResult />
            : <>
                <StatusFilters setOpenFilters={setOpenFilters} openFilters={openFilters} allElements={allElements}/>
                <div className={styles.contents}>
                  <Filters setOpenFilters={setOpenFilters} openFilters={openFilters} elements={elements} allElements={allElements}/>
                  <div className={`${styles.cards__container} ${openFilters && styles.open__filters}`}>
                    <CardsContainer array={currentCards} />
                  </div>
                </div>
                <Pagination cardsPerPage={cardsPerPage} totalCards={elements.length} selectPageNumber={selectPageNumber}/>
              </>
        }
      </div>

    </main>
  )
}

export default Contents