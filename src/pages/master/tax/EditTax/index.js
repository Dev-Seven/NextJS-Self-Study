/* eslint-disable lines-around-comment */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Icon,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField
} from '@mui/material'
import { addQuizCategorySchema, addTaxSchema } from 'src/schemas'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import { CreateQuizCategory, GetQuizCategoryById, UpdateQuizCategory } from 'src/store/slices/QuizSlice'
import { toast } from 'react-hot-toast'
import FallbackSpinner from 'src/@core/components/spinner'
import Toast from 'src/pages/Common/Toast'
import { addServiceTax, getServiceTaxById, updateServiceTax } from 'src/store/slices/MasterSlice'

const AddTax = () => {
  // ** State
  const dispatch = useDispatch()
  const theme = useTheme()
  const router = useRouter()
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  const id = localStorage.getItem('id')
  // const params = router.query.AddTax
  let pathName = router.pathname.split('/')
  const params = pathName[pathName.length - 1]

  const initialValues = {
    lable: '',
    percentage: '',
    isActive: true
  }

  // ** useEffect to handle form data during edit
  useEffect(() => {
    if (id) {
      dispatch(getServiceTaxById(id)).then(res => {
        let updateData = res.payload.data
        formik.setFieldValue('lable', updateData.lable)
        formik.setFieldValue('percentage', updateData.percentage)
        formik.setFieldValue('isActive', updateData.isActive)
      })
    }
  }, [dispatch, id])

  // ** formik state to handle form submission
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: addTaxSchema,
    onSubmit: values => {
      const action = id ? updateServiceTax(Object.assign(values, { _id: id })) : addServiceTax(values)

      dispatch(action).then(res => {
        if (res.payload.status === 200) {
          if (id) {
            Toast({ response: res, update: true }) // toast the success message
          } else {
            Toast({ response: res }) // toast the success message
          }
          router.push('/master/tax')
        } else {
          Toast({ response: res, error: true }) // toast the error message
        }
      })
    }
  })

  return (
    <>
      {isLoading === true ? (
        <FallbackSpinner />
      ) : (
        <div>
          <Card>
            <CardHeader title={params == 'EditTax' ? 'Edit Tax' : params == 'ViewTax' ? 'View Tax' : 'Add Tax'} />
            <Divider />
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        name='lable'
                        label='Lable'
                        type='text'
                        placeholder='Lable'
                        aria-describedby='validation-basic-first-name'
                        value={formik.values.lable}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        InputProps={{ readOnly: params == 'ViewTax' ? true : false }}
                      />
                      {formik.errors.lable && formik.touched.lable ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.lable}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        name='percentage'
                        label='Percentage'
                        type='number'
                        placeholder='Percentage'
                        aria-describedby='validation-basic-first-name'
                        value={formik.values.percentage}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        InputProps={{ readOnly: params == 'ViewTax' ? true : false }}
                      />
                      {formik.errors.percentage && formik.touched.percentage ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.percentage}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <h4 style={{ margin: '0', padding: '0 10px' }}>Status :-</h4>
                      <RadioGroup
                        aria-label='Status'
                        name='isActive'
                        value={
                          formik.values.isActive == 'true'
                            ? (formik.values.isActive = true)
                            : formik.values.isActive == 'false'
                            ? (formik.values.isActive = false)
                            : null
                        }
                        row
                        onChange={e => {
                          formik.setFieldValue('isActive', e.target.value)
                        }}
                      >
                        <FormControlLabel
                          value={'true'}
                          checked={formik.values.isActive === true}
                          control={<Radio color='primary' />}
                          label='Active'
                          labelPlacement='end'
                          disabled={params == 'ViewTax'}
                        />
                        <FormControlLabel
                          value={'false'}
                          checked={formik.values.isActive === false}
                          control={<Radio color='primary' />}
                          label='InActive'
                          labelPlacement='end'
                          disabled={params == 'ViewTax'}
                        />
                      </RadioGroup>
                    </div>
                    {formik.errors.isActive && formik.touched.isActive ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        {formik.errors.isActive}
                      </FormHelperText>
                    ) : null}
                  </Grid>

                  <Grid item sm={12}>
                    <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                      {params == 'ViewTax' ? null : params == 'AddTax' ? (
                        <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                          Save
                        </Button>
                      ) : (
                        <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                          Update
                        </Button>
                      )}
                      <Link prefetch={false} href='/master/tax' style={{ textDecoration: 'none' }}>
                        <Button size='large' type='submit' variant='contained'>
                          Cancel
                        </Button>
                      </Link>
                    </div>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}

export default AddTax
