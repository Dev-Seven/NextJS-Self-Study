/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { GetAllCoupon } from 'src/store/slices/LearningSlice'

// import Table from './Table'
import dynamic from 'next/dynamic'

const Table = dynamic(() => import('./Table'))

const Index = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.LearningSlice.allOffers)

  useEffect(() => {
    dispatch(GetAllCoupon())
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
