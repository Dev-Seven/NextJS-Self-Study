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
import { useFormik } from 'formik'
import { supportSubjectSchema } from 'src/schemas'
import { useDispatch } from 'react-redux'
import { useTheme } from '@mui/material/styles'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { CreateSupportSubject, GetSupportSubjectById, UpdateSupportSubject } from 'src/store/slices/AdminSlice'
import FallbackSpinner from 'src/@core/components/spinner'
import Toast from 'src/pages/Common/Toast'

const AddSupportSubject = () => {
  const dispatch = useDispatch()
  const theme = useTheme()
  const router = useRouter()
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)

  // const { id, view } = router.query
  const params = router.query.AddSupportSubject
  const id = localStorage.getItem('id')

  const initialValues = {
    SupportSubject: '',
    Status: true
  }

  useEffect(() => {
    dispatch(GetSupportSubjectById(id)).then(res => {
      if (id) {
        let updateData = res.payload.data
        formik.setFieldValue('SupportSubject', updateData.SupportSubject)
        formik.setFieldValue('Status', updateData.Status)
      }
    })
  }, [dispatch, id])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: supportSubjectSchema,
    onSubmit: values => {
      const action = id ? UpdateSupportSubject(Object.assign(values, { _id: id })) : CreateSupportSubject(values)

      dispatch(action).then(res => {
        if (res.payload.status === 200) {
          if (id) {
            Toast({ response: res, update: true }) // toast the success message
          } else {
            Toast({ response: res }) // toast the success message
          }
          router.push('/Support/SupportSubject')
        } else {
          Toast({ response: res, error: true }) // toast the error message
        }
      })
      // if (id) {
      //   dispatch(UpdateSupportSubject(Object.assign(values, { _id: id }))).then(res => {
      //     if (res.payload?.status === 200) {
      //       toast.success(res?.payload?.message, {
      //         style: {
      //           padding: '16px',
      //           color: theme.palette.primary.main,
      //           border: `1px solid ${theme.palette.primary.main}`
      //         },
      //         iconTheme: {
      //           primary: theme.palette.primary.main,
      //           secondary: theme.palette.primary.contrastText
      //         }
      //       })
      //       router.push('/Support/SupportSubject')
      //     } else {
      //       toast.error(res?.payload?.message, {
      //         style: {
      //           padding: '16px',
      //           color: theme.palette.primary.main,
      //           border: `1px solid ${theme.palette.primary.main}`
      //         },
      //         iconTheme: {
      //           primary: theme.palette.primary.main,
      //           secondary: theme.palette.primary.contrastText
      //         }
      //       })
      //     }
      //   })
      // } else {
      //   dispatch(CreateSupportSubject(values)).then(res => {
      //     if (res.payload.status === 200) {
      //       toast.success(res?.payload?.message, {
      //         style: {
      //           padding: '16px',
      //           color: theme.palette.primary.main,
      //           border: `1px solid ${theme.palette.primary.main}`
      //         },
      //         iconTheme: {
      //           primary: theme.palette.primary.main,
      //           secondary: theme.palette.primary.contrastText
      //         }
      //       })
      //       router.push('/Support/SupportSubject')
      //     } else {
      //       toast.error(res?.payload?.message, {
      //         style: {
      //           padding: '16px',
      //           color: theme.palette.primary.main,
      //           border: `1px solid ${theme.palette.primary.main}`
      //         },
      //         iconTheme: {
      //           primary: theme.palette.primary.main,
      //           secondary: theme.palette.primary.contrastText
      //         }
      //       })
      //     }
      //   })
      // }
    }
  })

  return (
    <>
      {params == 'ViewSupportSubject' ? (
        isLoading === true ? (
          <FallbackSpinner />
        ) : (
          <div>
            <Card>
              <CardHeader title='View Support Subject' />
              <Divider />
              <CardContent>
                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          name='SupportSubject'
                          label='Support Subject'
                          type='text'
                          // placeholder='Dhruv'
                          InputProps={{ readOnly: true, disableUnderline: true }}
                          aria-describedby='validation-basic-first-name'
                          value={formik.values.SupportSubject}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                        {formik.errors.SupportSubject && formik.touched.SupportSubject ? (
                          <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                            {formik.errors.SupportSubject}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <div className='status-container' style={{ display: 'flex', alignItems: 'center' }}>
                        <h4 style={{ margin: '0', padding: '0 10px' }}>Status :-</h4>
                        <RadioGroup
                          aria-label='Status'
                          name='Status'
                          value={
                            formik.values.Status == 'true'
                              ? (formik.values.Status = true)
                              : formik.values.Status == 'false'
                              ? (formik.values.Status = false)
                              : null
                          }
                          row
                          onChange={e => {
                            formik.setFieldValue('Status', e.target.value)
                          }}
                        >
                          <FormControlLabel
                            disabled
                            InputProps={{ readOnly: true, disableUnderline: true }}
                            value={'true'}
                            checked={formik.values.Status === true}
                            control={<Radio color='primary' />}
                            label='Active'
                            labelPlacement='end'
                          />
                          <FormControlLabel
                            disabled
                            value={'false'}
                            checked={formik.values.Status === false}
                            control={<Radio color='primary' />}
                            label='InActive'
                            labelPlacement='end'
                          />
                        </RadioGroup>
                      </div>
                      {formik.errors.Status && formik.touched.Status ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.Status}
                        </FormHelperText>
                      ) : null}
                    </Grid>

                    <Grid item sm={12}>
                      <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                        <Link prefetch={false} href='/Support/SupportSubject' style={{ textDecoration: 'none' }}>
                          <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
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
        )
      ) : isLoading === true ? (
        <FallbackSpinner />
      ) : (
        <div>
          <Card>
            <CardHeader title={id ? 'Edit Support Subject' : 'Add Support Subject'} />
            <Divider />
            <CardContent>
              <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={5}>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        name='SupportSubject'
                        label='Support Subject'
                        type='text'
                        placeholder='Support Subject'
                        aria-describedby='validation-basic-first-name'
                        value={formik.values.SupportSubject}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.SupportSubject && formik.touched.SupportSubject ? (
                        <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                          {formik.errors.SupportSubject}
                        </FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <div className='status-container' style={{ display: 'flex', alignItems: 'center' }}>
                      <h4 style={{ margin: '0', padding: '0 10px' }}>Status :-</h4>
                      <RadioGroup
                        aria-label='Status'
                        name='Status'
                        value={
                          formik.values.Status == 'true'
                            ? (formik.values.Status = true)
                            : formik.values.Status == 'false'
                            ? (formik.values.Status = false)
                            : null
                        }
                        row
                        onChange={e => {
                          formik.setFieldValue('Status', e.target.value)
                        }}
                      >
                        <FormControlLabel
                          value={'true'}
                          checked={formik.values.Status === true}
                          control={<Radio color='primary' />}
                          label='Active'
                          labelPlacement='end'
                        />
                        <FormControlLabel
                          value={'false'}
                          checked={formik.values.Status === false}
                          control={<Radio color='primary' />}
                          label='InActive'
                          labelPlacement='end'
                        />
                      </RadioGroup>
                    </div>
                    {formik.errors.Status && formik.touched.Status ? (
                      <FormHelperText sx={{ color: 'error.main' }} id='validation-basic-first-name'>
                        {formik.errors.Status}
                      </FormHelperText>
                    ) : null}
                  </Grid>

                  <Grid item sm={12}>
                    <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                      {!id ? (
                        <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                          Save
                        </Button>
                      ) : (
                        <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                          Update
                        </Button>
                      )}
                      <Link prefetch={false} href='/Support/SupportSubject' style={{ textDecoration: 'none' }}>
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

export default AddSupportSubject
