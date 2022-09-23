import React, {useMemo} from 'react'
import PropTypes from 'prop-types'
import Moment from 'moment'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Brush,
} from 'recharts'

const SimpleChart = ({dataset}) => {
  let chartDataset = []
  const datas = useMemo(() => dataset, [])
  const initialDatasSortAsc = datas.sort(
    (a, b) =>
      Moment(a.Date).format('YYYYMMDD') - Moment(b.Date).format('YYYYMMDD'),
  )
  const _groupBy = (objectArray, property) => {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property]
      const curGroup = acc[key] ?? []

      return {...acc, [key]: [...curGroup, obj]}
    }, {})
  }
  const productGrouping = _groupBy(initialDatasSortAsc, 'Product')

  // eslint-disable-next-line no-unused-vars
  for (const [key, value] of Object.entries(productGrouping)) {
    chartDataset.push(value)
  }

  return (
    <div className="scroll max-h-96 overflow-y-scroll">
      <div className="scroll grid grid-cols-1 gap-4">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-xl font-semibold text-gray-900">
              Total Product Units Sold by Date
            </h1>
            <p className="mt-2 text-sm text-gray-700"></p>
          </div>
        </div>
        {chartDataset.length > 0 &&
          chartDataset.map(data => (
            <AreaChart
              key={data[0]['UnitsSold']}
              width={400}
              height={300}
              data={data}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="Date" interval="preserveEnd" />
              <YAxis interval="preserveEnd" />
              <Legend />
              <Area
                type="monotone"
                dataKey="UnitsSold"
                name={data[0]['Product']}
                stroke="#413abe"
                fill="#4f46e5"
                activeDot={{r: 8}}
              />
              <Brush height={20} />
              <Tooltip />
            </AreaChart>
          ))}
      </div>
    </div>
  )
}

SimpleChart.propTypes = {
  dataset: PropTypes.array,
}

export default SimpleChart
