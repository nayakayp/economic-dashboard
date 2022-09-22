import React, {useMemo, useState, useEffect} from 'react'
import Brand from '../../assets/Brand.json'
import {useTable, useSortBy, useGlobalFilter, useFilters} from 'react-table'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

import GlobalFilter from '../GlobalFilter'
import ColumnFilter from '../ColumnFilter'
import SelectFilter from '../SelectFilter'

const Branding = () => {
  const [brandData, setBrandData] = useState([{}])
  const [metricOption, setMetricOption] = useState([])
  const [brandToMetricData, setBrandToMetricData] = useState([])
  let brandProp = [...new Set(Brand.map(brand => brand.Brand))]
  let metricProp = [...new Set(Brand.map(brand => brand.Metric))]

  useEffect(() => {
    setupNewData()
  }, [brandData, metricOption])

  const newDatas = brandProp.map(brand => {
    return Brand.filter(obj => obj.Brand === brand)
  })

  const data = useMemo(() => newDatas[0], [])

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
        Filter: SelectFilter,
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

  const tableInstance = useTable(
    {columns, data},
    useFilters,
    useGlobalFilter,
    useSortBy,
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance

  const firstPageRows = rows.slice(0, 200)
  const {globalFilter} = state

  const handleSelectBrand = e => {
    const value = e.target.value
    const data = newDatas.filter(data => data[0].Brand === value)
    setBrandData(data.flat())
  }

  const handleMetricOption = e => {
    const value = e.target.value
    if (e.target.checked) {
      setMetricOption([...metricOption, value])
    } else {
      const filtered = metricOption.filter(option => option !== value)
      setMetricOption(filtered)
    }
  }

  const setupNewData = () => {
    let brandToMetrics = []
    metricOption.map(metric => {
      const filtered = brandData.filter(data => {
        return data.Metric === metric
      })
      brandToMetrics.push(filtered)
    })
    setBrandToMetricData(brandToMetrics)
  }

  return (
    <div className="flex flex-col items-start">
      {/* <div className="">
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      // {...column.getHeaderProps()}
                    >
                      {column.render('Header')}
                      <span>
                          {column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}
                      </span>
                      <div className="">
                        {column.canFilter? column.render('Filter') : null }
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
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => {
                      return (
                        <td
                          {...cell.getCellProps()}
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
        </div> */}
      <select name="" id="" onChange={e => handleSelectBrand(e)}>
        {brandProp.map(brand => (
          <option value={brand}>{brand}</option>
        ))}
      </select>
      <div className="flex flex-col">
        {metricProp.map(metric => (
          <label htmlFor={metric}>
            <input
              onChange={e => handleMetricOption(e)}
              name="metrics"
              id={metric}
              type="checkbox"
              value={metric}
            />
            {metric}
          </label>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {brandToMetricData.length > 0 &&
          brandToMetricData.map(data => (
            <LineChart width={600} height={400} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" interval="preserveEnd" />
              <YAxis interval="preserveEnd" />
              <Legend />
              {/* {
                        brandToMetricData.length > 0 && brandToMetricData.map((data)=>(
                            <Line type="monotone" dataKey={"Value"} name={data[0].Metric + " value"} data={data} stroke="#8884d8" activeDot={{ r: 8 }} />
                        ))
                    } */}
              <Line
                type="monotone"
                dataKey="Value"
                name={data[0].Metric}
                stroke="#8884d8"
                activeDot={{r: 8}}
              />
              <Tooltip />
            </LineChart>
          ))}
      </div>
      {/* <div className="">
            {brandProp.map((obj,i)=>(
                <>
                    {brandProp[i]}
                    <LineChart width={600} height={200} data={newDatas[i].slice(0,100)}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Date" interval="preserveEnd" />
                        <YAxis interval="preserveEnd" />
                        <Legend />
                        <Line type="monotone" dataKey="Value" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="Metric" stroke="#82ca9d" />
                        <Tooltip />
                    </LineChart>
                </>
            ))}
        </div> */}
    </div>
  )
}

export default Branding
