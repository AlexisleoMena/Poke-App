import React, { useMemo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { applyFilters, setFilters, setLoading } from '../../../../redux/actions'
import * as Icons from "../../../../helpers/Icons_types.js"
import styles from "./Filters.module.css";

const OptionFilter = ({ name, currentValue, value, cb }) => (
  <label>
    <input type="checkbox" value={value} onChange={(e) => { cb(e, name) }} checked={value === currentValue} />
    <span>{value.toUpperCase()}</span>
  </label>
)

const Filters = ({setOpenFilters, openFilters, elements, allElements: all}) => {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.filters);
  const allElements = useSelector((state) => state[all]);

  const types = useMemo(() => {
    return Array.from( new Set( allElements.map(({ types }) => types).flat() ) ).sort()
  }, [allElements]);

  function handleFilters(e, filterName) {
    dispatch(setLoading(true));
    filterName === "order" 
      ? dispatch(setFilters({ ...filters, order: e.target.value, reverse: false }))
      : dispatch(setFilters({ ...filters, [filterName]: e.target.value }));
    dispatch(applyFilters(all));
  }
  function handleReverse(value) {
    dispatch(setLoading(true));
    dispatch(setFilters({ ...filters, reverse: value }));
    dispatch(applyFilters(all));
  }

  useEffect(() => {
    const handleClick = (e) => {
      !document.getElementById('filtersContainer').contains(e.target) 
        && !document.getElementById('statusFilterButton').contains(e.target)
        && setOpenFilters(false);
    }
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [setOpenFilters]);


  
  return (
    <div id="filtersContainer" className={`${styles.container} ${openFilters && styles.open_container}`}>
      <div className={styles.options__filters} >
        
        <div className={styles.item}>
          <h3>ORDER</h3>
          <hr />
          <div>
            <OptionFilter name="order" value="alphabetical" currentValue={filters.order} cb={handleFilters} />
            <OptionFilter name="order" value="attack" currentValue={filters.order} cb={handleFilters} />
            <OptionFilter name="order" value="defense" currentValue={filters.order} cb={handleFilters} />
            <OptionFilter name="order" value="speed" currentValue={filters.order} cb={handleFilters} />
            <OptionFilter name="order" value="height" currentValue={filters.order} cb={handleFilters} />
            <OptionFilter name="order" value="weight" currentValue={filters.order} cb={handleFilters} />
          </div>
          <div className={styles.reverse__container}>
            {filters.order === "alphabetical"
              && <>
                <i
                  className={`fas fa-sort-alpha-down ${!filters.reverse && styles.active}`}
                  onClick={(e) => { handleReverse(false) }}
                ></i>
                <i
                  className={`fas fa-sort-alpha-down-alt ${filters.reverse && styles.active}`}
                  onClick={(e) => { handleReverse(true) }}
                ></i>
              </>
            }
            {(filters.order === "weight" || filters.order === "attack" || filters.order === "defense" 
              || filters.order === "speed" || filters.order === "height" || filters.order === "weight")
              && <>
                <i
                  className={`fas fa-sort-numeric-down ${!filters.reverse && styles.active}`}
                  onClick={(e) => { handleReverse(false) }}
                ></i>
                <i
                  className={`fas fa-sort-numeric-down-alt ${filters.reverse && styles.active}`}
                  onClick={(e) => { handleReverse(true) }}
                ></i>
              </>
            }
          </div>
        </div>

        <div className={styles.item}>
          <h3>TYPE</h3>
          <hr />
          <div>
            { 
              types?.map((a) => 
                <label key={a}>
                  <input type="checkbox" value={a} onChange={(e) => {handleFilters(e, "type") }} checked={a === filters.type} />
                  <span><img src={Icons[a]} alt="" height="18px" width="18px" />{a.toUpperCase()}</span>
                </label>
              )
            }
          </div>
        </div>

      </div>

    </div>
  )
}

export default Filters
