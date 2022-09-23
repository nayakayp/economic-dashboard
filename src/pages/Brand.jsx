import React, {useMemo, useState} from 'react'
import ColumnFilter from '../components/ColumnFilter'
import Layout from '../components/Layout'

import Chart from '../components/Chart'
import PieChartComp from '../components/PieChart'
import Table from '../components/Table'

import BrandData from '../assets/Brand.json'

const Branding = () => {
  let groupTotalValues = {}
  let metricGrouping = {}
  const [mainColumnActive, setMainColumnActive] = useState(null)
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
    setMainColumnActive(mainColumn)
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
    <Layout title="Value of Brand by Metric">
      <div className="grid grid-cols-2 items-start mb-8">
        <Chart
          chartTitle={
            mainColumnActive !== 'none' && (
              <>Value of a {mainColumnActive} by Date With Metrics</>
            )
          }
          dataset={BrandData}
          yAxisKey="Value"
          xAxisKey="Date"
          mainColumn="Brand"
          optionColumn="Metric"
          onChangeEvent={handleChangeEvent}
        />
        <div className="">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              {mainColumnActive !== 'none' && (
                <h1 className="text-xl font-semibold text-gray-900">
                  (Total Alltime {mainColumnActive} Values by Metrics )
                </h1>
              )}
              <p className="mt-2 text-sm text-gray-700"></p>
            </div>
          </div>
          {pieDatasets.length > 0 && (
            <PieChartComp
              datasets={pieDatasets}
              dataKey="TotalValues"
              labelName="Total Values"
            />
          )}
        </div>
      </div>
      <Table
        tableTitle="Table of Brand"
        dataset={BrandData}
        columns={columns}
      />
    </Layout>
  )
}

export default Branding
