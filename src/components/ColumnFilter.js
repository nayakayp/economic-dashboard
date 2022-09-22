import React from 'react'
import PropTypes from 'prop-types'

const ColumnFilter = ({column}) => {
  const {filterValue, setFilter} = column
  return (
    <span>
      <input
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value)}
        style={{border: '1px solid red', width: '80%'}}
      />
    </span>
  )
}

ColumnFilter.propTypes = {
  column: PropTypes.object,
}

export default ColumnFilter
