import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deepCleanUp, getAllFavorites } from '../../redux/actions'
import Contents from '../Home/Contents/Contents'
import { useAuth0 } from "@auth0/auth0-react";

import styles from "./Favorites.module.css"

const Favorites = () => {
  let dispatch = useDispatch()
  let elements = useSelector((state) => state.favorites)
  const { isAuthenticated, user } = useAuth0();

  useEffect(() => {
    dispatch(deepCleanUp());
    if(user && Object.keys(user).length) {
      dispatch(getAllFavorites(user.email))
    }
    return () => window.scroll(0, 0);
  }, [dispatch, user]);
  return (
    <div className={styles.container}>
      { !isAuthenticated 
          ? <h2>To add favorite cards, you must first log in.</h2>
          : !elements.length 
            ? <h2>You have not added any cards as favorites.</h2>
            : <Contents elements={elements} allElements='allFavorites'/>
      }
    </div>
  )
}

export default Favorites
