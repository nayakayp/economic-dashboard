import React, {useMemo} from 'react'
import ColumnFilter from '../ColumnFilter'

import Chart from '../Chart'
import Table from '../Table'

import BrandData from '../../assets/Brand.json'

const Branding = () => {
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
        Header: 'Brand',
        accessor: 'Brand',
        Filter: ColumnFilter,
      },
      {
        Header: 'Metric',
        accessor: 'Metric',
        Filter: ColumnFilter,
      },
      {
        Header: 'Value',
        accessor: 'Value',
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
      <Chart
        dataset={BrandData}
        yAxisKey="Value"
        xAxisKey="Date"
        mainColumn="Product"
        optionColumn={['Media']}
      />
      <Table dataset={BrandData} columns={columns} />
    </div>
  )
}

export default Branding
