/* eslint-disable react-hooks/exhaustive-deps */
import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { GetAllPayment } from 'src/store/slices/AdminSlice'
import { getAllQuestionBank } from 'src/store/slices/QuizSlice'

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
