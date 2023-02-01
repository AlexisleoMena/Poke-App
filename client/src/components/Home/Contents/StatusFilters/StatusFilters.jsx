import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { applyFilters, setFilters, setLoading } from '../../../../redux/actions'
import styles from "./StatusFilters.module.css"

const FilterActive = ({ name, value, cb }) => (
  <div className={styles.filter__active} onClick={(e) => { cb(name) }}>
    "<span>{value}</span>"
    <i className="fas fa-times"></i>
  </div>
)

const StatusFilters = ({setOpenFilters, openFilters, allElements}) => {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.filters);

  function handleResetFilter(name) {
    dispatch(setLoading(true));
    name === "order"
      ? dispatch(setFilters({ ...filters, order: "", reverse: false }))
      : dispatch(setFilters({ ...filters, [name]: "" }));
    dispatch(applyFilters(allElements));
  }

  function haveActiveFilters(filters) {
    return filters.order.length > 0 || filters.ubication.length > 0 || filters.type.length > 0
  }

  return (
    <div className={styles.container}>
        <div className={styles.filters__actives}>
          {filters.order.length > 0 && <FilterActive name="order" value={filters.order} cb={handleResetFilter} />}
          {filters.ubication.length > 0 && <FilterActive name="ubication" value={filters.ubication} cb={handleResetFilter} />}
          {filters.type.length > 0 && <FilterActive name="type" value={filters.type} cb={handleResetFilter} />}
        </div>
        <div 
          id="statusFilterButton" 
          className={`${styles.btn} ${haveActiveFilters(filters) ? styles.have_actives_filters : ""} `} 
          onClick={(e) => { setOpenFilters(!openFilters) }}
        >
          <i className={openFilters ? "fas fa-chevron-up" : "fas fa-chevron-down"}></i>
          {openFilters ? <h3>HIDE FILTERS</h3> : <h3>SHOW FILTERS</h3>}
        </div>
    </div>
  )
}

export default StatusFilters