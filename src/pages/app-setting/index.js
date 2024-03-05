/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { json } from 'caniuse-lite/data/features'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { GetAllAppBanner } from 'src/store/slices/AdminSlice'

import dynamic from 'next/dynamic'

const Table = dynamic(() => import('./Table'))

const Index = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state?.AdminSlice?.GetAllAppBanner)

  useEffect(() => {
    dispatch(GetAllAppBanner())
  }, [])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Table store={store} />
      </Grid>
    </Grid>
  )
}

export default Index
