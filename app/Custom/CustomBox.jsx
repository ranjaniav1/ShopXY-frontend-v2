'use client'

import React from 'react'

const CustomBox = ({ children, className = '' }) => {
  return (
    <div className={`my-7 rounded-lg ${className}`}>
      {children}
    </div>
  )
}

export default CustomBox
