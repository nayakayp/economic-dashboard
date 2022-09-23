import React from 'react'
import PropTypes from 'prop-types'

const ColumnFilter = ({column}) => {
  const {filterValue, setFilter} = column
  return (
    <span>
      <input
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value)}
        className="w-full mt-4 bg-white rounded-4 border border-slate-600 rounded"
      />
    </span>
  )
}

ColumnFilter.propTypes = {
  column: PropTypes.object,
}

export default ColumnFilter
