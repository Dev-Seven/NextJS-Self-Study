/* eslint-disable lines-around-comment */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'
import { useFormik } from 'formik'
import { subjectPriceSchema } from 'src/schemas'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import {
  AddSubjectPricee,
  getAllSubject,
  GetPaidSubject,
  GetSubjectPriceById,
  UpdateSubjectPrice
} from 'src/store/slices/LearningSlice'
import { toast } from 'react-hot-toast'
import { useTheme } from '@mui/material/styles'
import { useSelector } from 'react-redux'
import FallbackSpinner from 'src/@core/components/spinner'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { EditorWrapper } from 'src/@core/styles/libs/react-draft-wysiwyg'
import DatePicker from 'react-datepicker'
import PickersComponent from 'src/views/pages/datepicker/PickersComponent'
import moment from 'moment'
import Toast from 'src/pages/Common/Toast'

// 1002 START

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

const AddSubjectPrice = ({ popperPlacement }) => {
  // dishpatxh
  const [selectedDate, setSelectedDate] = useState(null)
  const dispatch = useDispatch()
  const theme = useTheme()
  const router = useRouter()
  const [dateClear, setDateClear] = useState(new Date())
  const isLoading = useSelector(state => state.LayoutSlice.isLoading)
  const AllSubject = useSelector(state => state.LearningSlice.GetPaidSubject)
  const id = localStorage.getItem('id')
  const params = router.query.AddSubjectPrice

  useEffect(() => {
    dispatch(GetPaidSubject())
  }, [dispatch])

  const initialValues = {
    Price: '',
    SubjectId: '',
    StartDate: ''
  }

  // ** useEffect to handle form data during edit
  useEffect(() => {
    dispatch(GetSubjectPriceById(id)).then(res => {
      if (id) {
        let updateData = res?.payload?.data
        formik.setFieldValue('Price', updateData?.Price)
        formik.setFieldValue('SubjectId', updateData?.SubjectId)
        formik.setFieldValue('SubjectName', updateData?.SubjectName)
        formik.setFieldValue('StartDate', moment(updateData.StartDate).local().toDate())
        setSelectedDate(moment(updateData?.StartDate).local().toDate())
      }
    })
  }, [dispatch])

  // ** formik to handle form
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: subjectPriceSchema,
    onSubmit: values => {
      const action = id ? UpdateSubjectPrice(Object.assign(values, { _id: id })) : AddSubjectPricee(values)

      dispatch(action).then(res => {
        if (res.payload.status === 200) {
          if (id) {
            Toast({ response: res, update: true }) // toast the success message
          } else {
            Toast({ response: res }) // toast the success message
          }
          router.push('/Learning/subjectPrice')
        } else {
          Toast({ response: res, error: true }) // toast the error message
        }
      })
      // if (id) {
      //   dispatch(UpdateSubjectPrice(Object.assign(values, { _id: id }))).then(res => {
      //     if (res?.payload?.status === 200) {
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
      //       router.push('/Learning/SubjectPrice')
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
      //   dispatch(AddSubjectPricee(values)).then(res => {
      //     if (res?.payload?.status === 200) {
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
      //       router.push('/Learning/SubjectPrice')
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

  const handleDatePicker = date => {
    setSelectedDate(date)
    setDateClear(date)
    const convertedDate = moment.parseZone(date).format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    formik.setFieldValue('StartDate', convertedDate)
  }

  return (
    <>
      {params == 'ViewSubjectPrice' ? (
        isLoading === true ? (
          <FallbackSpinner />
        ) : (
          <div>
            <Card>
              <CardHeader title='View Subject Price' />
              <Divider />
              <CardContent>
                <form onSubmit={formik.handleSubmit}>
                  <Grid container spacing={5}>
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='validation-basic-select' htmlFor='validation-basic-select'>
                          Subject
                        </InputLabel>
                        <Select
                          readOnly
                          label='Subject'
                          name='SubjectId'
                          labelId='validation-basic-select'
                          aria-describedby='validation-basic-select'
                          value={formik.values.SubjectId}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        >
                          {AllSubject?.map(item => (
                            <MenuItem key={item} value={`${item._id}`}>
                              {item.SubjectName}
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

                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          name='Price'
                          label='Price'
                          type='number'
                          InputProps={{
                            readOnly: true,
                            disableUnderline: true,
                            startAdornment: <InputAdornment position='start'>₹</InputAdornment>
                          }}
                          value={formik.values.Price}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                        />
                      </FormControl>
                      {formik.errors.Price && formik.touched.Price ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.Price}</FormHelperText>
                      ) : null}
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <DatePickerWrapper>
                        <EditorWrapper>
                          <DatePicker
                            readOnly
                            id='picker-clear'
                            name='StartDate'
                            dateFormat='d/MM/yyyy'
                            selected={formik.values.StartDate}
                            popperPlacement={popperPlacement}
                            customInput={<PickersComponent label='Effective Date' />}
                            onBlur={formik.handleBlur}
                            type='date'
                            onChange={date => {
                              setDateClear(date)
                              formik.setFieldValue('StartDate', date)
                            }}
                          />
                          {formik.errors.StartDate && formik.touched.StartDate ? (
                            <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.StartDate}</FormHelperText>
                          ) : null}
                        </EditorWrapper>
                      </DatePickerWrapper>
                    </Grid>

                    <Grid item sm={12}>
                      <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                        <Link prefetch={false} href='/Learning/subjectPrice' style={{ textDecoration: 'none' }}>
                          <Button size='large' variant='contained' style={{ marginRight: '10px' }}>
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
            <CardHeader title={id ? 'Edit Subject Price' : 'Add Subject Price'} />
            <Divider />
            <CardContent>
              <form onSubmit={formik.handleSubmit} autoComplete='off'>
                <Grid container spacing={5}>
                  {params == 'EditSubjectPrice' ? (
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <TextField
                          placeholder='Subject'
                          label='Subject'
                          name='SubjectName'
                          type='text'
                          value={formik.values.SubjectName}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          InputProps={{ readOnly: true }}
                        />
                      </FormControl>
                    </Grid>
                  ) : (
                    <Grid item xs={12} sm={6}>
                      <FormControl fullWidth>
                        <InputLabel id='validation-basic-select' htmlFor='validation-basic-select'>
                          Subject
                        </InputLabel>
                        <Select
                          label='Subject'
                          name='SubjectId'
                          placeholder='Subject'
                          labelId='validation-basic-select'
                          aria-describedby='validation-basic-select'
                          value={formik.values.SubjectId}
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          MenuProps={MenuProps}
                          readOnly={params == 'EditSubjectPrice' ? true : false}
                        >
                          {AllSubject?.map(item => (
                            <MenuItem key={item} value={`${item._id}`}>
                              {item.SubjectName}
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
                  )}

                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                      <TextField
                        name='Price'
                        label='Price'
                        placeholder='Price'
                        type='number'
                        InputProps={{
                          startAdornment: <InputAdornment position='start'>₹</InputAdornment>
                        }}
                        value={formik.values.Price}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.Price && formik.touched.Price ? (
                        <FormHelperText sx={{ color: 'error.main' }}>{formik.errors.Price}</FormHelperText>
                      ) : null}
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <DatePickerWrapper>
                      <EditorWrapper>
                        <DatePicker
                          showYearDropdown
                          showMonthDropdown
                          id='picker-clear'
                          placeholderText='Effective Date'
                          name='StartDate'
                          dateFormat='d/MM/yyyy'
                          selected={selectedDate}
                          popperPlacement={popperPlacement}
                          customInput={<PickersComponent label='Effective Date' />}
                          onBlur={formik.handleBlur}
                          type='date'
                          onChange={handleDatePicker}
                        />
                        {formik.errors.StartDate && formik.touched.StartDate ? (
                          <FormHelperText sx={{ color: 'error.main' }} style={{ marginLeft: '14px' }}>
                            {formik.errors.StartDate}
                          </FormHelperText>
                        ) : null}
                      </EditorWrapper>
                    </DatePickerWrapper>
                  </Grid>

                  <Grid item sm={12}>
                    <div style={{ display: 'flex', alignItems: 'end', justifyContent: 'flex-end' }}>
                      {params == 'ViewSubjectPrice' ? null : !id ? (
                        <Button
                          size='large'
                          onClick={formik.handleSubmit}
                          variant='contained'
                          style={{ marginRight: '10px' }}
                        >
                          Save
                        </Button>
                      ) : (
                        <Button size='large' type='submit' variant='contained' style={{ marginRight: '10px' }}>
                          Update
                        </Button>
                      )}
                      <Link prefetch={false} href='/Learning/subjectPrice' style={{ textDecoration: 'none' }}>
                        <Button size='large' variant='contained'>
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

export default AddSubjectPrice
