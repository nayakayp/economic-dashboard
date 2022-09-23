import React, {useMemo} from 'react'
import ColumnFilter from '../ColumnFilter'

import Table from '../Table'
import SimpleChart from '../SimpleChart'
import PieChart from '../PieChart'

import SalesData from '../../assets/Sales.json'

const Sales = () => {
  let groupTotalSales = []
  const _groupBy = (objectArray, property) => {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property]
      const curGroup = acc[key] ?? []

      return {...acc, [key]: [...curGroup, obj]}
    }, {})
  }

  const preProcessingSalesData = SalesData.map(sale => {
    const totalSales = Math.round(sale.PricePerUnit * sale.UnitsSold)
    return {...sale, TotalSales: totalSales}
  })
  const groups = _groupBy(preProcessingSalesData, 'Product')

  for (const [key, value] of Object.entries(groups)) {
    const initialValue = 0
    const sum = value.reduce(
      (previousValue, currentValue) => previousValue + currentValue.TotalSales,
      initialValue,
    )
    // groupTotalSales[key] = sum
    groupTotalSales.push({name: key, TotalSales: sum})
  }

  const columns = useMemo(
    () => [
      {
        Header: 'Country',
        accessor: 'Country',
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
        Header: 'UnitsSold',
        accessor: 'UnitsSold',
        Filter: ColumnFilter,
      },
      {
        Header: 'PricePerUnit',
        accessor: 'PricePerUnit',
        Filter: ColumnFilter,
      },
      {
        Header: 'TotalSales',
        accessor: 'TotalSales',
        Filter: ColumnFilter,
      },
    ],
    [],
  )

  return (
    <div className="">
      <div className="grid grid-cols-2 items-start mt-8">
        <SimpleChart dataset={preProcessingSalesData} />
        <div className="pl-4">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                Total Sales
              </h1>
              <p className="mt-2 text-sm text-gray-700">
                A table of placeholder stock market data that does not make any
                sense.
              </p>
            </div>
          </div>
          <div className="">
            <PieChart
              datasets={groupTotalSales}
              dataKey="TotalSales"
              labelName="Total Sales"
            />
          </div>
        </div>
      </div>
      <Table dataset={preProcessingSalesData} columns={columns} />
    </div>
  )
}

export default Sales
