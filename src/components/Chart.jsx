import React, {useState, useEffect, useMemo, Fragment} from 'react'
import {Dialog, Transition} from '@headlessui/react'
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

const Chart = ({
  dataset,
  yAxisKey,
  xAxisKey,
  mainColumn,
  optionColumn,
  onChangeEvent,
  chartTitle,
}) => {
  const datas = useMemo(() => dataset, [])
  const initialDatasSortAsc = datas.sort(
    (a, b) =>
      Moment(a.Date).format('YYYYMMDD') - Moment(b.Date).format('YYYYMMDD'),
  )
  const [open, setOpen] = useState(false)
  const [brandData, setBrandData] = useState([{}])
  const [metricOption, setMetricOption] = useState([])
  const [brandOption, setBrandOption] = useState('none')
  const [brandToMetricData, setBrandToMetricData] = useState([])
  const brandProp = [
    ...new Set(initialDatasSortAsc.map(data => data[mainColumn])),
  ]
  const metricProp = [
    ...new Set(initialDatasSortAsc.map(data => data[optionColumn])),
  ]
  const newDatas = brandProp.map(brand => {
    return dataset.filter(obj => obj[mainColumn] === brand)
  })

  const _handleSelectBrand = e => {
    const value = e.target.value
    const data = newDatas.filter(data => data[0][mainColumn] === value)
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
        return data[optionColumn] === metric
      })
      brandToMetrics.push(filtered)
    })
    setBrandToMetricData(brandToMetrics)
  }

  useEffect(() => {
    _setupNewData()
    onChangeEvent(brandOption, metricOption)
  }, [metricOption, brandOption])

  return (
    <div className="flex flex-col">
      <div className="flex items-center space-x-4 mb-4">
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          ></label>
          <select
            name=""
            id=""
            value={brandOption}
            onChange={e => _handleSelectBrand(e)}
            className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          >
            <option value="none">Please select...</option>
            {brandProp.map(brand => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>

        {brandOption !== 'none' && (
          <button
            onClick={() => setOpen(true)}
            className="inline-flex items-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Select Option
          </button>
        )}

        {/* <div className="grid grid-cols-2">
          {brandOption !== 'none' &&
            metricProp.map(metric => (
              <label
                key={metric}
                htmlFor={metric}
                className="font-normal text-indigo-600 "
              >
                <input
                  onChange={e => _handleMetricOption(e)}
                  name={metric}
                  id={metric}
                  type="checkbox"
                  value={metric}
                  className="h-4 w-4 rounded pl-2 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                {metric}
              </label>
            ))}
        </div> */}
      </div>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">{chartTitle}</h1>
          <p className="mt-2 text-sm text-gray-700"></p>
        </div>
      </div>
      <div className="scroll flex h-96 overflow-y-scroll">
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
                  name={data[0][optionColumn]}
                  stroke="#413abe"
                  fill="#4f46e5"
                  activeDot={{r: 8}}
                />
                <Brush />
                <Tooltip />
              </AreaChart>
            ))}
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                  <div>
                    <div className="mt-3 sm:mt-5 mb-3">
                      <Dialog.Title
                        as="h3"
                        className="text-lg text-center font-medium leading-6 text-gray-900"
                      >
                        What Information You Want To Plot?
                      </Dialog.Title>
                      <div className="">
                        <div className="grid grid-cols-2 mt-2">
                          {brandOption !== 'none' &&
                            metricProp.map(metric => (
                              <label
                                key={metric}
                                htmlFor={metric}
                                className="font-normal text-indigo-600 "
                              >
                                <input
                                  onChange={e => _handleMetricOption(e)}
                                  name={metric}
                                  id={metric}
                                  type="checkbox"
                                  value={metric}
                                  className="h-4 w-4 rounded pl-2 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                {metric}
                              </label>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:text-sm"
                      onClick={() => setOpen(false)}
                    >
                      Go back to dashboard
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
}

Chart.propTypes = {
  dataset: PropTypes.array,
  yAxisKey: PropTypes.string,
  xAxisKey: PropTypes.string,
  mainColumn: PropTypes.string,
  optionColumn: PropTypes.string,
  onChangeEvent: PropTypes.func,
  chartTitle: PropTypes.string,
}

Chart.defaultProps = {
  onChangeEvent: () => {},
}

export default Chart
