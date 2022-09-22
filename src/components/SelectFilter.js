import React from 'react'

const SelectFilter = ({data, column}) => {
  const {filterValue, setFilter} = column
  let selectOption = ['test']
  data.forEach(d => {
    if (selectOption.every(option => option !== d.Brand)) {
      selectOption.push(d.Brand)
    }
  })
  return (
    <select name="" id="" onChange={e => setFilter(e.target.value)}>
      {selectOption.map(option => (
        <option value={option}>{option}</option>
      ))}
    </select>
  )
}

export default SelectFilter
