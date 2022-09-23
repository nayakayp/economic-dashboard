import React, {useMemo} from 'react'
import {useTable, useSortBy, useGlobalFilter, useFilters} from 'react-table'
import PropTypes from 'prop-types'

const Table = ({dataset, columns, tableTitle, tableSubTitle}) => {
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
    <div className="">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            {tableTitle && tableTitle}
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            {tableSubTitle && tableSubTitle}
          </p>
        </div>
      </div>
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table
          className="min-w-full divide-y divide-gray-300"
          {...getTableProps()}
        >
          <thead className="bg-gray-50">
            {headerGroups.map(headerGroup => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <th
                    scope="col"
                    className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {column.render('Header')}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? ' 🔽'
                          : ' 🔼'
                        : ''}
                    </span>
                    <div className="">
                      {column.canFilter ? column.render('Filter') : null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody
            className="divide-y divide-gray-200 bg-white"
            {...getTableBodyProps()}
          >
            {firstPageRows.map(row => {
              prepareRow(row)
              return (
                <tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return (
                      <td
                        key={cell.value}
                        {...cell.getCellProps()}
                        className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-6"
                      >
                        {cell.render('Cell')}
                      </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

Table.propTypes = {
  dataset: PropTypes.array,
  columns: PropTypes.array,
  tableTitle: PropTypes.string,
  tableSubTitle: PropTypes.string,
}
export default Table
