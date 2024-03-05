import { Button, Grid } from '@mui/material'
import React from 'react'

// import Table from './Table'

import dynamic from 'next/dynamic'

const Table = dynamic(() => import('./Table'))

const index = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Table />
      </Grid>
    </Grid>
  )
}

export default index
