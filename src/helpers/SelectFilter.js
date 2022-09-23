import React from 'react'
import PropTypes from 'prop-types'

const SelectFilter = ({data, column: {setFilter}}) => {
  // const {filterValue, setFilter} = column
  let selectOption = []
  data.forEach(d => {
    if (selectOption.every(option => option !== d.Brand)) {
      selectOption.push(d.Brand)
    }
  })
  return (
    <select name="" id="" onChange={e => setFilter(e.target.value)}>
      {selectOption.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  )
}

SelectFilter.propTypes = {
  data: PropTypes.array,
  column: PropTypes.object,
}

export default SelectFilter
