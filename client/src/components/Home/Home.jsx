import React from "react";
import { useSelector } from "react-redux";
import Contents from "./Contents/Contents";
import styles from "./Home.module.css"

const Home = () => {
  const elements = useSelector((state) => state.pokemons)
  return (
    <div className={styles.container}>
      <Contents elements={elements} allElements='allPokemons' />
    </div>
  );
}

export default Home;