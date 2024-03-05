/* eslint-disable react-hooks/exhaustive-deps */
// ** MUI Imports
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { useFormik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { SelectSubject } from 'src/schemas'
import { getAllSubject, getAllSubjectdropdown } from 'src/store/slices/LearningSlice'

const TableHeader = props => {
  // ** Props
  const { handleFilter, toggle, value } = props

  const dispatch = useDispatch()
  const router = useRouter()

  useEffect(() => {
    dispatch(getAllSubjectdropdown())
  }, [dispatch])

  const AllSubject = useSelector(state => state.LearningSlice.getAllSubjectdropdown)

  const initialValues = {
    SubjectId: ''
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: SelectSubject,
    onSubmit: values => {
      localStorage.setItem('subjectID', values.SubjectId)
      router.replace({
        pathname: '/Learning/Category/AddCategory'
      })
    }
  })

  // menu props to handle select height
  const ITEM_HEIGHT = 48
  const ITEM_PADDING_TOP = 8

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    }
  }

  return (
    <Box sx={{ p: 5, pb: 3, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Box
        sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', width: '100%', justifyContent: 'flex-end' }}
      >
        <TextField
          size='small'
          value={value}
          sx={{ mr: 6, mb: 2 }}
          placeholder='Search Category'
          onChange={e => handleFilter(e.target.value)}
        />

        <Grid item xs={12} sm={6} sx={{ mr: 6, mb: 2 }} style={{ maxWidth: '28%' }}>
          <FormControl fullWidth size='small'>
            <InputLabel id='validation-basic-select' htmlFor='validation-basic-select'>
              Subject
            </InputLabel>
            <Select
              value={formik.values.SubjectId}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              label='Subject'
              name='SubjectId'
              labelId='validation-basic-select'
              aria-describedby='validation-basic-select'
              MenuProps={MenuProps}
            >
              {AllSubject?.map(item => (
                <MenuItem key={item} value={`${item._id}`}>
                  {item?.SubjectName}
                </MenuItem>
              ))}
            </Select>
            {formik.errors.SubjectId && formik.touched.SubjectId ? (
              <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                {formik.errors.SubjectId}
              </FormHelperText>
            ) : null}
          </FormControl>
        </Grid>

        {/* <Link href='/Learning/Category/AddCategory' style={{ textDecoration: 'none' }}> */}
        <Button
          sx={{ mb: 2 }}
          onClick={() => {
            formik.handleSubmit()
            localStorage.removeItem('id')
            localStorage.removeItem('subjectID')
          }}
          variant='contained'
        >
          Add Category
        </Button>
        {/* </Link> */}
      </Box>
    </Box>
  )
}

export default TableHeader
