import { ADD_FAVORITE, DELETE_FAVORITE, GET_FAVORITES_RANKING, GET_ALL_FAVORITES, APPLY_FILTERS, CLEAN_UP_DETAILS, CLEAN_UP_FILTERS, CLEAN_UP_SEARCH_BY_NAME, DEEP_CLEAN_UP, GET_ALL, GET_BY_NAME, GET_DETAILS, SET_CURRENT_PAGE, SET_FILTERS, SET_LOADING, CREATE_USER } from "../actions";

const initialState = {
  pokemons: [],
  allPokemons: [],
  favoritesRanking: [],
  pokemonsSearched: [],
  recentSearch: false,
  details: {},
  filters: { order: "", type: "", ubication: "", reverse: false },
  emptyAfterFiltering: false,
  loading: false,
  currentPage: 1,
  allFavorites: [],
  favorites: [],
};

function applyFilters (filters, state) {
  let { order, type, ubication, reverse } = filters;
  let copy = [...state];
  if(order.length) {
    switch (order) {
      case "alphabetical":
        copy.sort( (a,b) => a.name.localeCompare(b.name));
        break;
      case "attack":
        copy.sort( (a,b) => a.attack - b.attack);
        break;
      case "defense":
        copy.sort( (a,b) => a.defense - b.defense);
        break;
      case "speed":
        copy.sort( (a,b) => a.speed - b.speed);
        break;
      case "height":
        copy.sort( (a,b) => a.height - b.height);
        break;
      case "weight":
        copy.sort( (a,b) => a.weight - b.weight);
        break;
      default:
    }
    reverse && copy.reverse()
  }
  if(ubication.length) {
    copy = ubication === "API" 
    ? copy.filter( ({id}) => Number.isInteger(id) )
    : copy.filter( ({id}) => !Number.isInteger(id) )
  }
  if(type.length) {
    copy = copy.filter( ({types}) => types.includes(type) )
  }
  return copy;
}


export default function reducer( state=initialState, action ) {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL: 
      return {
        ...state,
        allPokemons: [...payload],
        pokemons: payload,
        loading: false,
      };
    case GET_ALL_FAVORITES: 
      return {
        ...state,
        favorites: payload,
        allFavorites: [...payload]
      }
    case GET_FAVORITES_RANKING:
      return {
        ...state,
        favoritesRanking: payload,
        loading: false
      }
    case GET_BY_NAME:
      return {
        ...state,
        pokemonsSearched: payload,
        recentSearch: true,
        loading: false,
      };
    case CLEAN_UP_SEARCH_BY_NAME:
      return {
        ...state,
        pokemonsSearched: initialState.pokemonsSearched,
        recentSearch: initialState.recentSearch
      }
    case GET_DETAILS: 
      return {
        ...state,
        details: payload,
        loading: false,
      };
    case CLEAN_UP_DETAILS:
      return {
        ...state,
        details: {},
      }
    case ADD_FAVORITE: 
      return {
        ...state,
      }
    case DELETE_FAVORITE: 
    return {
      ...state,
    }
    case SET_FILTERS: 
      return {
        ...state,
        filters: payload
      }
    case APPLY_FILTERS:
      let filtered = applyFilters(state.filters, state[payload]);
      let elements = payload === 'allFavorites' ? 'favorites' : 'pokemons'
      return {
        ...state,
        [elements]: filtered,
        loading: false,
        currentPage: 1,
        emptyAfterFiltering: !filtered.length
      }
    case CLEAN_UP_FILTERS: 
      return {
        ...state,
        pokemons: [...state.allPokemons],
        emptyAfterFiltering: false,
        currentPage: 1,
        filters: initialState.filters
      }
    case SET_LOADING: 
      return {
        ...state,
        loading: payload,
      };
    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      };
    case CREATE_USER:
      return {
        ...state
      }
    case DEEP_CLEAN_UP: 
      return {
        ...initialState, 
        pokemons: [...state.allPokemons],
        allPokemons: state.allPokemons,
        favorites: [...state.allFavorites],
        allFavorites: state.allFavorites
      }
    default:
      return state;
  }
}