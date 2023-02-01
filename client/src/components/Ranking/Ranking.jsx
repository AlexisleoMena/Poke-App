import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFavoritesRanking, setLoading } from '../../redux/actions'
import { IoStar } from "react-icons/io5";

import styles from "./Ranking.module.css"
import Loader from '../common/Loader/Loader';
const Card = ({element, number}) => (
  <div className={`${styles.card_container} ${element.principal_type ? element.principal_type : element.types[0] ? element.types[0] : ""}`} >
    <div className={styles.stars_container}>
      <IoStar />
      <h4>{element.starts}</h4>
    </div>
    <div className={styles.card_body}>
      <img className={styles.img} src={element.img} alt="" />
      <h3 className={styles.name}>{element.name}</h3>
    </div>
    <h2 className={styles.number_icon}>#{number}</h2>
  </div>
)

const Ranking = () => {

  const dispatch = useDispatch()
  let elements = useSelector((state) => state.favoritesRanking)
  let loading = useSelector((state) => state.loading)

  useEffect(() => {
    dispatch(getFavoritesRanking())
    dispatch(setLoading(true))
  }, [dispatch])

  return (
    <div className={styles.container}>
      {
        loading 
        ? <Loader />
        : elements?.map((e, i) => (<Card element={e} number={i+1} key={e.id}/>  ))
      }
    </div>
  )
}

export default Ranking