/* eslint-disable lines-around-comment */
// IND NO              DATE(DD-MM-YYYY)                  TASKS                              DEVELOPER NAME
// ==============================================================================================================//
// 1001,                 20-03-2023                     Call Table                                DHRUV

// 1001 START
import { Grid } from '@mui/material'
import * as React from 'react'
// import Table from './Table'

import dynamic from 'next/dynamic'

const Table = dynamic(() => import('./Table'))

const Index = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Table />
      </Grid>
    </Grid>
  )
}

export default Index

// 1001  END
