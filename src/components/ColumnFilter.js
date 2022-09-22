import React from 'react'

const ColumnFilter = ({column}) => {
  const {filterValue, setFilter} = column
  return (
    <span>
      Search:{' '}
      <input
        value={filterValue || ''}
        onChange={e => setFilter(e.target.value)}
        style={{border: '1px solid red', width: '80%'}}
      />
    </span>
  )
}

export default ColumnFilter
