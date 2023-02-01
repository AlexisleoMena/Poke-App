import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { deepCleanUp, setLoading, createUser, searchByName } from '../../../redux/actions';
import styles from "./Header.module.css"

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let location = useLocation();

  const { loginWithRedirect,  isAuthenticated, logout, user } = useAuth0();

  useEffect(() => {
    user && dispatch(createUser(user.email))
  }, [user, dispatch]);

  const [showMenu, setShowMenu] = useState(false);
  const [showInputSearch, setShowInputSearch] = useState(false);
  const [name, setName] = useState("");

  function handleClick(endpoint) {
    setShowMenu(false);
    dispatch(deepCleanUp())
    navigate(endpoint);
    window.scroll(0, 0);
  }

  const handleBtnCancel = (e) => {
    setShowMenu(false);
    setShowInputSearch(false);
  }
  
  const [width, setWidth] = useState(window.innerWidth);
  const updateDimension = () => setWidth(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", updateDimension)
    return () => {
      window.removeEventListener("resize", updateDimension)
    }
  }, [])
  useEffect(() => {
    width>991 && handleBtnCancel()
  }, [width]);

  function handleChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchByName(name))
    dispatch(setLoading(true))
    setName("");
    setShowInputSearch(false);
    window.scroll(0, 0);
  }


  return (
    <div className={styles.container}>

        <div className={styles.menu__icon}>
          <span className={`fas fa-bars ${showMenu && styles.hide}`} onClick={(e) => {setShowMenu(true)}}></span>
        </div>

        <h1 className={styles.logo} onClick={(e) => {handleClick("/")}}>
          Poke App
        </h1>


      {  
        location.pathname === "/"
        ? <form className={`${showInputSearch && styles.active}`}>
            <input 
              type="search" 
              value={name} 
              className={styles.search__data} 
              placeholder="Search" 
              required 
              onChange={e => handleChange(e)}
            />
            <button 
              type="submit" 
              className={`fas fa-search ${styles.submit__btn}`} 
              onClick={e => { handleSubmit(e) }}
            ></button>
          </form>
        : null
      }
        
        <div className={`${styles.nav__container} ${showMenu && styles.active}`}>
          <li><span className={location.pathname === "/" ? styles.current_page : ""} onClick={(e) => {handleClick("/")}}> Home </span></li>
          <li><span className={location.pathname === "/favorites" ? styles.current_page : ""} onClick={(e) => { handleClick("/favorites") }}> Favorites </span></li>
          <li><span className={location.pathname === "/ranking" ? styles.current_page : ""} onClick={(e) => { handleClick("/ranking") }}> Ranking </span></li>
          {
            isAuthenticated
            ? <li><span  onClick={() => logout({ returnTo: window.location.origin })} className={styles.btn_log}>Logout</span></li>
            : <li><span onClick={() => loginWithRedirect()} className={styles.btn_log}>Login</span></li>
          }
          {/* <li><Link to="/"> Exit </Link></li> */}
        </div>

        <div className={`${styles.search__icon} ${!showInputSearch && !showMenu ? styles.show : ""}`}>
          <span 
            className="fas fa-search" 
            onClick={(e) => {setShowInputSearch(true)}} 
            style={{ visibility: location.pathname === "/" ? "visible" : "hidden" }}
          ></span>
        </div>

        <div 
          className={`${styles.cancel__icon} ${showInputSearch || showMenu ? styles.show : ""}`}
          style={{ color: showInputSearch || showMenu ? "#ff3d00" : '#fff' }}
        >
          <span className="fas fa-times" onClick={(e) => {handleBtnCancel(e)}}></span>
        </div>

       
    </div>
  )
}

export default Header;
