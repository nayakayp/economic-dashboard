import React, {useMemo, useState} from 'react'
import ColumnFilter from '../components/ColumnFilter'
import Layout from '../components/Layout'

import Table from '../components/Table'
import Chart from '../components/Chart'
import PieChartComp from '../components/PieChart'

import MediaData from '../assets/Media.json'

const Media = () => {
  let groupTotalInvestments = {}
  let productGrouping = {}
  const [mainColumnActive, setMainColumnActive] = useState(null)
  const [pieDatasets, setPieDatasets] = useState([])
  const _groupBy = (objectArray, property) => {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property]
      const curGroup = acc[key] ?? []

      return {...acc, [key]: [...curGroup, obj]}
    }, {})
  }
  const mediaGrouping = _groupBy(MediaData, 'Media')

  for (const [key, value] of Object.entries(mediaGrouping)) {
    productGrouping[key] = _groupBy(value, 'Product')
  }

  for (const [key1, value1] of Object.entries(productGrouping)) {
    let obj = []
    for (const [key2, value2] of Object.entries(value1)) {
      const initialValue = 0
      const sum = value2.reduce(
        (previousValue, currentValue) =>
          previousValue + currentValue.Investment,
        initialValue,
      )
      obj.push({name: key2, TotalInvestments: sum})
      groupTotalInvestments[key1] = obj
    }
  }

  const handleChangeEvent = (mainColumn, optionColumn) => {
    setMainColumnActive(mainColumn)
    let activeData = []
    if (mainColumn !== 'none') {
      groupTotalInvestments[mainColumn].map(data => {
        optionColumn.map(column => {
          if (data['name'] === column) activeData.push(data)
        })
      })
      setPieDatasets(activeData)
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
    ],
    [],
  )
  return (
    <Layout title="Investment in Product by Media">
      <div className="grid grid-cols-2 items-start">
        <Chart
          chartTitle={
            mainColumnActive !== 'none' && (
              <>Investment of a {mainColumnActive} in Products by Date</>
            )
          }
          dataset={MediaData}
          yAxisKey="Investment"
          xAxisKey="Date"
          mainColumn="Media"
          optionColumn="Product"
          onChangeEvent={handleChangeEvent}
        />
        <div className="">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              {mainColumnActive !== 'none' && (
                <h1 className="text-xl font-semibold text-gray-900">
                  (Total Alltime {mainColumnActive} Investments in Products )
                </h1>
              )}
              <p className="mt-2 text-sm text-gray-700"></p>
            </div>
          </div>
          {pieDatasets.length > 0 && (
            <PieChartComp
              datasets={pieDatasets}
              dataKey="TotalInvestments"
              labelName="Total Investments"
            />
          )}
        </div>
      </div>
      <Table
        dataset={MediaData}
        columns={columns}
        tableTitle="Table of Media"
        tableSubTitle=""
      />
    </Layout>
  )
}

export default Media
