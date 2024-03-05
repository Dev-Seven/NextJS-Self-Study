import React from 'react'

// import AppUsers from './AppUsers'

import dynamic from 'next/dynamic'

const AppUsers = dynamic(() => import('./AppUsers'))

const index = () => {
  return (
    <div>
      <AppUsers />
    </div>
  )
}

export default index
