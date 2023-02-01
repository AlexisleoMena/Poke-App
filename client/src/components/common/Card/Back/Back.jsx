import React from 'react'
import styles from "./Back.module.css"
const Back = ({element}) => {
  return (
    <div className={`${styles.container} ${element.principal_type ? element.principal_type : element.types[0] ? element.types[0] : ""}`}>
       <div>
      <div className={styles.about}>
        <h2>About</h2>
        <div>
          <i className="fas fa-weight-hanging"></i>
          <span>{element.weight}</span>
          <span> Weight </span>
        </div>
        <div>
          <i className="fas fa-ruler-vertical"></i>
          <span>{element.height}</span>
          <span> Height </span>
        </div>
      </div>
    </div>
    <div className={styles.base_stats}>
      <h2>Base stats</h2>
      <div>
        <h4>HP</h4>
        <meter min="0" max="200" value={element.hp} low="40" high="150" optimun="200" />
        <p>{element.hp}</p>
      </div>
      <div>
        <h4>ATK</h4>
        <meter min="0" max="200" value={element.attack} low="40" high="150" optimun="200" />
        <p>{element.attack}</p>
      </div>
      <div>
        <h4>DEF</h4>
        <meter min="0" max="200" value={element.defense} low="40" high="150" optimun="200" />
        <p>{element.defense}</p>
      </div>
      <div>
        <h4>SPD</h4>
        <meter min="0" max="200" value={element.speed} low="40" high="150" optimun="200" />
        <p>{element.speed}</p>
      </div>
    </div>
    </div>
  )
}

export default Back
