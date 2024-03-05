import { Grid } from '@mui/material'
import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { GetAllCategory } from 'src/store/slices/LearningSlice'

// import Table from './Table'

import dynamic from 'next/dynamic'

const Table = dynamic(() => import('./Table'))

const Index = () => {
  const dispatch = useDispatch()
  const store = useSelector(state => state.LearningSlice.allCategory)

  useEffect(() => {
    dispatch(GetAllCategory()).then(res => {
      if (res?.payload?.status === 200) {
        localStorage.removeItem('tree')
      }
    })
  }, [dispatch])

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Table store={store} />
      </Grid>
    </Grid>
  )
}

export default Index
