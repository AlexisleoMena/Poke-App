import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useAuth0 } from "@auth0/auth0-react";
import { addFavorite, deleteFavorite, getAllFavorites } from '../../../../redux/actions';
import * as Icons from "../../../../helpers/Icons_types"
import styles from "./Front.module.css"
import { Link } from 'react-router-dom';
import { IoStar, IoStarOutline } from 'react-icons/io5';

const Front = ({element}) => {
  const { isAuthenticated, user } = useAuth0();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const auxIsFavorite = useCallback((id) => favorites.some((favorite) => favorite.id === Number(id)), [favorites])
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    favorites.length && setIsFavorite(auxIsFavorite(element.id))
  }, [favorites.length, auxIsFavorite, element.id])

  async function handleAddFavorites() {
    try {
      if(isFavorite) {
        let { deleted } = await dispatch(deleteFavorite(element.id, user.email));
        setIsFavorite(!deleted);
        dispatch(getAllFavorites(user.email));
        return;
      }
      let { added } = await dispatch(addFavorite({...element, email: user.email }));
      setIsFavorite(added);
      dispatch(getAllFavorites(user.email))
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className={`${styles.container} ${element.principal_type ? element.principal_type : element.types[0] ? element.types[0] : ""}`}>
    <button className={styles.btn__favorite} onClick={() => handleAddFavorites()}>
      {isAuthenticated && (!isFavorite ? <IoStarOutline className={styles.icon_favorite_false} /> : <IoStar className={styles.icon_favorite_true} />) }
    </button>
    <Link to={"/details/"+element.id} key={element.id} >
      <img className={styles.img} src={element.img} alt="" />
    </Link>
    <h3 className={styles.name}>{element.name}</h3>
    <div className={styles.icons__type__container}>
      {element.types?.map((t, i) => (
        <div className={styles.icon__type} key={i}>
          <img src={Icons[t]} alt="" height="30em" width="30em" key={t} />
          {t}
        </div>
      ))}
    </div>

  </div>
  )
}

export default Front