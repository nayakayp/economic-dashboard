import React, {useState, useEffect, useMemo} from 'react'
import Moment from 'moment'
import PropTypes from 'prop-types'
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

import Brand from '../assets/Brand.json'

const Chart = ({dataset, yAxisKey, xAxisKey}) => {
  const datas = useMemo(() => dataset, [])
  const initialDatasSortAsc = datas.sort(
    (a, b) =>
      Moment(a.Date).format('YYYYMMDD') - Moment(b.Date).format('YYYYMMDD'),
  )
  const [brandData, setBrandData] = useState([{}])
  const [metricOption, setMetricOption] = useState([])
  const [brandOption, setBrandOption] = useState('none')
  const [brandToMetricData, setBrandToMetricData] = useState([])
  const brandProp = [...new Set(initialDatasSortAsc.map(data => data['Brand']))]
  const metricProp = [
    ...new Set(initialDatasSortAsc.map(data => data['Metric'])),
  ]
  const newDatas = brandProp.map(brand => {
    return Brand.filter(obj => obj.Brand === brand)
  })

  const _handleSelectBrand = e => {
    const value = e.target.value
    const data = newDatas.filter(data => data[0].Brand === value)
    setBrandOption(value)
    setBrandData(data.flat())
  }

  const _handleMetricOption = e => {
    const value = e.target.value
    if (e.target.checked) {
      setMetricOption([...metricOption, value])
    } else {
      const filtered = metricOption.filter(option => option !== value)
      setMetricOption(filtered)
    }
  }

  const _setupNewData = () => {
    let brandToMetrics = []
    metricOption.map(metric => {
      const filtered = brandData.filter(data => {
        return data.Metric === metric
      })
      brandToMetrics.push(filtered)
    })
    setBrandToMetricData(brandToMetrics)
  }

  useEffect(() => {
    _setupNewData()
  }, [metricOption, brandOption])

  return (
    <div className="flex flex-col">
      <div className="">
        <select
          name=""
          id=""
          value={brandOption}
          onChange={e => _handleSelectBrand(e)}
        >
          <option value="none">Please select...</option>
          {brandProp.map(brand => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        <div className="grid grid-cols-2">
          {brandOption !== 'none' &&
            metricProp.map(metric => (
              <label key={metric} htmlFor={metric}>
                <input
                  onChange={e => _handleMetricOption(e)}
                  name="metrics"
                  id={metric}
                  type="checkbox"
                  value={metric}
                />
                {metric}
              </label>
            ))}
        </div>
      </div>
      <div className="flex max-h-96 overflow-y-scroll">
        <div className="grid grid-cols-1 gap-4">
          {brandToMetricData.length > 0 &&
            brandToMetricData.map(data => (
              <AreaChart key={data} width={400} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey={xAxisKey} interval="preserveEnd" />
                <YAxis interval="preserveEnd" />
                <Legend />
                <Area
                  type="monotone"
                  dataKey={yAxisKey}
                  name={data[0].Metric}
                  fill="#8884d8"
                  activeDot={{r: 8}}
                />
                <Brush />
                <Tooltip />
              </AreaChart>
            ))}
        </div>
      </div>
    </div>
  )
}

Chart.propTypes = {
  dataset: PropTypes.array,
  yAxisKey: PropTypes.string,
  xAxisKey: PropTypes.string,
  mainColumn: PropTypes.string,
  optionColumns: PropTypes.array,
}

export default Chart
