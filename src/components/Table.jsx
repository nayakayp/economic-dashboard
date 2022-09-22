import React, {useMemo} from 'react'
import {useTable, useSortBy, useGlobalFilter, useFilters} from 'react-table'
import PropTypes from 'prop-types'

const Table = ({dataset, columns}) => {
  const data = useMemo(() => dataset, [])
  const tableInstance = useTable(
    {columns, data},
    useFilters,
    useGlobalFilter,
    useSortBy,
  )
  const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} =
    tableInstance
  const firstPageRows = rows.slice(0, 10)

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                key={column.id}
                {...column.getHeaderProps(column.getSortByToggleProps())}
                // {...column.getHeaderProps()}
              >
                {column.render('Header')}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                </span>
                <div className="">
                  {column.canFilter ? column.render('Filter') : null}
                </div>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {firstPageRows.map(row => {
          prepareRow(row)
          return (
            <tr key={row.id} {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td key={cell.value} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

Table.propTypes = {
  dataset: PropTypes.array,
  columns: PropTypes.array,
}
export default Table
