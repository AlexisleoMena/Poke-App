import axios from 'axios'

export const GET_ALL = "GET_ALL";
export const GET_BY_NAME = "GET_BY_NAME";
export const CLEAN_UP_SEARCH_BY_NAME = "CLEAN_UP_SEARCH_BY_NAME";
export const GET_DETAILS = "GET_DETAILS";
export const CLEAN_UP_DETAILS = "CLEAN_UP_DETAILS";
export const ADD_POKEMON = "ADD_POKEMON";
export const SET_FILTERS = "SET_FILTERS";
export const APPLY_FILTERS = "APPLY_FILTERS";
export const CLEAN_UP_FILTERS = "CLEAN_UP_FILTERS";
export const DEEP_CLEAN_UP = "DEEP_CLEAN_UP";
export const SET_LOADING = "SET_LOADING";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const GET_ALL_FAVORITES = "GET_ALL_FAVORITES";
export const DELETE_FAVORITE = "DELETE_FAVORITE";
export const CREATE_USER = "CREATE_USER";
export const GET_FAVORITES_RANKING = "GET_FAVORITES_RANKING";

export function getAllPokemons() {
  return async function (dispatch) {
    try {

      let items = JSON.parse(localStorage.getItem('allPokemons'));
      if (items) {
        return dispatch({ type: GET_ALL, payload: items });
      }
      const { data } = await axios("/pokemons");
      localStorage.setItem('allPokemons', JSON.stringify(data))
      return dispatch({ type: GET_ALL, payload: data });
      
    } catch (error) {
      console.log(error);
    }
  }
};
export function getAllFavorites(email) {
  return async function (dispatch) {
    try {
      const { data } = await axios("/favorite/"+email);
      return dispatch({ type: GET_ALL_FAVORITES, payload: data });
    } catch (error) {
      console.log(error);
    }
  }
};

export function getFavoritesRanking() {
  return async function (dispatch) {
    try {
      const { data } = await axios("/favorite/ranking");
      return dispatch({ type: GET_FAVORITES_RANKING, payload: data });
    } catch (error) {
      console.log(error);
    }
  }
};

export function searchByName( name ) {
  return async function (dispatch) {
    try {
      const { data } = await axios(`/pokemons?name=${name}`);
      return dispatch({ type: GET_BY_NAME, payload: data });
    } catch (error) {
      return dispatch({ type: GET_BY_NAME, payload: [] });
    }
  }
};
export function cleanUpSearchByName() {
  return {
    type: CLEAN_UP_SEARCH_BY_NAME
  }
}
export function getDetails( id ) {
  return async function (dispatch) {
    try {
      const  { data }  = await axios(`/pokemons/${id}`);
      return dispatch({ type: GET_DETAILS,  payload: data });
    } catch (error) {
      console.log(error);
    }
  }
};
export function cleanUpDetail() {
  return {
    type: CLEAN_UP_DETAILS
  }
}
export function addFavorite( data ) {
  return function (dispatch) {
    return new Promise( function(resolve, reject) {
      axios.post("/favorite", data)
      .then( (res) => {
        dispatch({ type: ADD_FAVORITE, payload: true});
        resolve(res.data);
      })
      .catch( (error) => {
        dispatch({ type: ADD_FAVORITE, payload: false});
        reject(error.response.data);
      })
    })
  }
}

export function deleteFavorite( id, email ) {
  return function (dispatch) {
    return new Promise( function(resolve, reject) {
      axios.delete(`/favorite/${id}/${email}`)
      .then( (res) => {
        dispatch({ type: DELETE_FAVORITE, payload: true});
        resolve(res.data);
      })
      .catch( (error) => {
        dispatch({ type: DELETE_FAVORITE, payload: false});
        reject(error.response.data);
      })
    })
  }
}

export function setFilters( payload ) { 
  return {
    type: SET_FILTERS,
    payload
  }
}
export function applyFilters(payload) {
  return {
    type: APPLY_FILTERS,
    payload
  }
}
export function cleanUpFilters() { 
  return {
    type: CLEAN_UP_FILTERS
  }
}
export function setLoading( payload ) {
  return {
    type: SET_LOADING,
    payload,
  };
};
export function setCurrentPage( payload ) {
  return {
    type: SET_CURRENT_PAGE,
    payload 
  };
};
export function deepCleanUp() {
  return {
    type: DEEP_CLEAN_UP
  }
}

export function createUser(email) {
  return async function (dispatch) {
    try {
      const  { data }  = await axios.post(`/user/${email}`);
      return dispatch({ type: CREATE_USER,  payload: data });
    } catch (error) {
      console.log(error);
    }
  }
}