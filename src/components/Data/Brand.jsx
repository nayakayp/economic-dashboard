import React, {useMemo, useState} from 'react'
import ColumnFilter from '../ColumnFilter'

import Chart from '../Chart'
import PieChartComp from '../PieChart'
import Table from '../Table'

import BrandData from '../../assets/Brand.json'

const Branding = () => {
  let groupTotalValues = {}
  let metricGrouping = {}
  const [pieDatasets, setPieDatasets] = useState([])
  const _groupBy = (objectArray, property) => {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property]
      const curGroup = acc[key] ?? []

      return {...acc, [key]: [...curGroup, obj]}
    }, {})
  }
  const brandGrouping = _groupBy(BrandData, 'Brand')

  for (const [key, value] of Object.entries(brandGrouping)) {
    metricGrouping[key] = _groupBy(value, 'Metric')
  }

  for (const [key1, value1] of Object.entries(metricGrouping)) {
    let obj = []
    for (const [key2, value2] of Object.entries(value1)) {
      const initialValue = 0
      const sum = value2.reduce(
        (previousValue, currentValue) => previousValue + currentValue.Value,
        initialValue,
      )
      obj.push({name: key2, TotalValues: sum})
      groupTotalValues[key1] = obj
    }
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
    ],
    [],
  )

  const handleChangeEvent = (mainColumn, optionColumn) => {
    let activeData = []
    if (mainColumn !== 'none') {
      groupTotalValues[mainColumn].map(data => {
        optionColumn.map(column => {
          if (data['name'] === column) activeData.push(data)
        })
      })
      setPieDatasets(activeData)
    }
  }

  return (
    <div className="">
      <div className="grid grid-cols-2 items-start">
        <Chart
          dataset={BrandData}
          yAxisKey="Value"
          xAxisKey="Date"
          mainColumn="Brand"
          optionColumn="Metric"
          onChangeEvent={handleChangeEvent}
        />
        <div className="">
          {pieDatasets.length > 0 && (
            <PieChartComp
              datasets={pieDatasets}
              dataKey="TotalValues"
              labelName="Total Values"
            />
          )}
        </div>
      </div>
      <Table dataset={BrandData} columns={columns} />
    </div>
  )
}

export default Branding
