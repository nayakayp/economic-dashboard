/* This example requires Tailwind CSS v2.0+ */
import React from 'react'
import PropTypes from 'prop-types'

Layout.propTypes = {
  title: PropTypes.any,
  children: PropTypes.string,
}

export default function Layout({children, title}) {
  return (
    <div className=" lg:p-10">
      <div className="lg:flex lg:items-center lg:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 underline text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            {title}
          </h2>
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </div>
  )
}
