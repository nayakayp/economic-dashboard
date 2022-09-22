import React, {useMemo} from 'react'
import ColumnFilter from '../ColumnFilter'

import Table from '../Table'

import MediaData from '../../assets/Media.json'

const Media = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'Country',
        Filter: ColumnFilter,
      },
      {
        Header: 'Region',
        accessor: 'Region',
        Filter: ColumnFilter,
      },
      {
        Header: 'Date',
        accessor: 'Date',
        Filter: ColumnFilter,
      },
      {
        Header: 'Product',
        accessor: 'Product',
        Filter: ColumnFilter,
      },
      {
        Header: 'Media',
        accessor: 'Media',
        Filter: ColumnFilter,
      },
      {
        Header: 'Investment',
        accessor: 'Investment',
        Filter: ColumnFilter,
      },
      {
        Header: 'Grouping',
        accessor: 'Grouping',
        Filter: ColumnFilter,
      },
    ],
    [],
  )
  return (
    <div className="grid grid-cols-3 items-start">
      <Table dataset={MediaData} columns={columns} />
    </div>
  )
}

export default Media
