import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { cleanUpDetail, getDetails, setLoading, addFavorite, getAllFavorites, deleteFavorite } from "../../redux/actions";
import * as Icons from "../../helpers/Icons_types.js"

import styles from "./Details.module.css";
import { useLayoutEffect } from "react";
import Loader from "../common/Loader/Loader";
import { useCallback } from "react";

import { IoStarOutline, IoStar } from "react-icons/io5";

const FrontCard = ({img, name, types, handleAddFavorites, isFavorite, isAuthenticated}) => (
  <div className={styles.item__1}>
    <button className={styles.btn__favorite} onClick={() => handleAddFavorites()}>
      {isAuthenticated && (!isFavorite ? <IoStarOutline className={styles.icon_favorite_false} /> : <IoStar className={styles.icon_favorite_true} />) }
    </button>
    <img className={styles.img} src={img} alt="" />
    <h3 className={styles.name}>{name}</h3>
    <div className={styles.icons__type__container}>
      {types?.map((t) => (
        <div className={styles.icon__type}>
          <img src={Icons[t]} alt="" height="30px" width="30px" key={t} />
          {t}
        </div>
      ))}
    </div>
  </div>
)

const BackCard = ({details}) => (
  <div className={styles.item__2}>
    <div>
      <div className={styles.about}>
        <h2>About</h2>
        <div>
          <i className="fas fa-weight-hanging"></i>
          <span>{details.weight}</span>
          <span> Weight </span>
        </div>
        <div>
          <i className="fas fa-ruler-vertical"></i>
          <span>{details.height}</span>
          <span> Height </span>
        </div>
      </div>
    </div>
    <div className={styles.base_stats}>
      <h2>Base stats</h2>
      <div>
        <h4>HP</h4>
        <meter min="0" max="200" value={details.hp} low="40" high="150" optimun="200" />
        <p>{details.hp}</p>
      </div>
      <div>
        <h4>ATK</h4>
        <meter min="0" max="200" value={details.attack} low="40" high="150" optimun="200" />
        <p>{details.attack}</p>
      </div>
      <div>
        <h4>DEF</h4>
        <meter min="0" max="200" value={details.defense} low="40" high="150" optimun="200" />
        <p>{details.defense}</p>
      </div>
      <div>
        <h4>SPD</h4>
        <meter min="0" max="200" value={details.speed} low="40" high="150" optimun="200" />
        <p>{details.speed}</p>
      </div>
    </div>

  </div>
)

function Details() {

  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();
  const details = useSelector((state) => state.details);
  const loading = useSelector((state) => state.loading);

  const favorites = useSelector((state) => state.favorites);
  const auxIsFavorite = useCallback((id) => favorites.some((favorite) => favorite.id === Number(id)), [favorites])
  const [isFavorite, setIsFavorite] = useState(false);
  useEffect(() => {
    favorites.length && setIsFavorite(auxIsFavorite(id))
  }, [favorites.length, auxIsFavorite, id])

  const { isAuthenticated, user } = useAuth0();

  const [width, setWidth] = useState(window.innerWidth);
  const updateDimension = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", updateDimension)
    return () => {
      window.removeEventListener("resize", updateDimension)
    }
  }, [])

  useLayoutEffect(() => {
    dispatch(setLoading(true))
    window.scroll(0, 0);
  }, [dispatch])

  useEffect(() => {
    dispatch(getDetails(id));
    return () => dispatch(cleanUpDetail())
  }, [id, dispatch])

  async function handleAddFavorites() {
    try {
      if(isFavorite) {
        let { deleted } = await dispatch(deleteFavorite(id, user.email));
        setIsFavorite(!deleted);
        dispatch(getAllFavorites(user.email));
        return;
      }
      let { added } = await dispatch(addFavorite({...details, email: user.email }));
      setIsFavorite(added);
      dispatch(getAllFavorites(user.email))
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.container}>
      <button className={styles.btn__back} onClick={() => navigate(-1)}><i className="fas fa-arrow-left"></i></button>
      {
        loading
        ? <Loader />
        : width >= 576
          ?
          
            <div className={`${styles.details} ${details.types ? details.types[0] : ""}`} >
              <button className={styles.btn__favorite} onClick={() => handleAddFavorites()}>
                {isAuthenticated && (!isFavorite ? <IoStarOutline className={styles.icon_favorite_false} /> : <IoStar className={styles.icon_favorite_true} />) }
              </button>
              <FrontCard img={details.img} name={details.name} types={details.types} handleAddFavorites={handleAddFavorites} isFavorite={isFavorite} isAuthenticated={isAuthenticated}/>
              <BackCard details={details} />
            </div>
          : <div className={styles.x_small_container}>
              <div className={`${styles.details}  ${details.types ? details.types[0] : ""}`} >
                <FrontCard img={details.img} name={details.name} types={details.types} handleAddFavorites={handleAddFavorites}  isFavorite={isFavorite} isAuthenticated={isAuthenticated}/>
              </div>
              <div className={`${styles.details}  ${details.types ? details.types[0] : ""}`} >
                <BackCard details={details} />
              </div>
            </ div>
          
      }
    </div>
  );
}

export default Details;